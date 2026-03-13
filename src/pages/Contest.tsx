import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { supabase } from "@/lib/supabase";
import { pools } from "@/data/questions";
import QuestionPanel from "@/components/QuestionPanel";
import CodeEditor from "@/components/CodeEditor";



interface QuestionResult {
  passed: number;
  total: number;
  code: string;
  status: string;
  outputs: {
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
    hidden: boolean;
  }[];
}

const API_URL =
  "https://ce.judge0.com/submissions?base64_encoded=false&wait=true";

const languageMap: Record<string, number> = {
  python: 71,
  c: 50,
  cpp: 54,
  java: 62,
};

const normalize = (str: string) =>
  str.replace(/\r/g, "").replace(/\s+$/g, "").trim();

const Contest = () => {
  const navigate = useNavigate();

  const [pool, setPool] = useState<(typeof pools)[0] | null>(null);
  const [currentQ, setCurrentQ] = useState(0);

  const [codes, setCodes] = useState<Record<number, string>>({});
  const [languages, setLanguages] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Record<number, QuestionResult>>({});

  const [elapsedTime, setElapsedTime] = useState(0);
  const [contestFinished, setContestFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);


  const participant = JSON.parse(localStorage.getItem("participant") || "{}");

  const startTime = participant.startTime || Date.now();

  useEffect(() => {
    const poolNum = parseInt(localStorage.getItem("selectedPool") || "0");
    const found = pools.find((p) => p.poolNumber === poolNum);

    if (!found) {
      navigate("/");
      return;
    }

    setPool(found);

    const savedCodes = localStorage.getItem("codes");
    const savedLangs = localStorage.getItem("languages");
    const savedResults = localStorage.getItem("questionResults");

    if (savedCodes) setCodes(JSON.parse(savedCodes));
    if (savedLangs) setLanguages(JSON.parse(savedLangs));
    if (savedResults) setResults(JSON.parse(savedResults));
  }, [navigate]);

  useEffect(() => {
    if (contestFinished) return;

    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, contestFinished]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const runCode = async (code: string, language: string, input: string) => {
    const language_id = languageMap[language];

    try {
      const response = await axios.post(
        API_URL,
        {
          source_code: code,
          language_id: language_id,
          stdin: input,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = response.data;

      return {
        stdout: data.stdout ?? "",
        stderr: data.stderr ?? "",
        compile_output: data.compile_output ?? "",
        status: data.status?.description ?? "",
      };
    } catch (err) {
      console.error(err);

      return {
        stdout: "",
        stderr: "Execution failed",
        compile_output: "",
        status: "Error",
      };
    }
  };

  const handleSubmit = async () => {
    if (!pool) return;
    if (results[currentQ]) return;
    if (isRunning) return;

    setIsRunning(true);

    const question = pool.questions[currentQ];
    const code = codes[currentQ] || "";
    const language = languages[currentQ] || "python";

    let passed = 0;
    let lastOutput = "";
    let status = "Wrong Answer";
    let outputs: any[] = [];

    for (const test of question.testCases) {
      const result = await runCode(code, language, test.input);

      if (result.compile_output) {
        status = "Compilation Error";

        outputs.push({
          input: test.input,
          expected: test.output,
          actual: result.compile_output,
          passed: false,
          hidden: test.hidden,
        });

        break;
      }

      if (result.stderr) {
        status = "Runtime Error";

        outputs.push({
          input: test.input,
          expected: test.output,
          actual: result.stderr,
          passed: false,
          hidden: test.hidden,
        });

        break;
      }

      const output = normalize(result.stdout);
      const expected = normalize(test.output);

      const ok = output === expected;

      if (ok) passed++;

      outputs.push({
        input: test.input,
        expected: test.output,
        actual: output,
        passed: ok,
        hidden: test.hidden,
      });
    }

    if (passed === question.testCases.length) status = "Accepted";

    const resultData = {
      passed,
      total: question.testCases.length,
      code,
      status,
      outputs,
    };

    const newResults = { ...results, [currentQ]: resultData };
    setResults(newResults);
    localStorage.setItem("questionResults", JSON.stringify(newResults));

    setIsRunning(false);

    if (Object.keys(newResults).length === 5) {
      finishContest(newResults);
    }
  };

  const finishContest = async (allResults: Record<number, QuestionResult>) => {
    const totalPoints = Object.values(allResults).reduce(
      (sum: number, r: QuestionResult) => sum + r.passed,
      0,
    );

    const totalTime = Math.floor((Date.now() - startTime) / 1000);

    setFinalScore(totalPoints);
    setContestFinished(true);

    const { data, error } = await supabase.from("participants").insert({
      roll: participant.rollNumber,
      name: participant.name,
      college: participant.college,
      points: totalPoints,
      total_time: totalTime,
      q1: allResults[0]?.passed || 0,
      q2: allResults[1]?.passed || 0,
      q3: allResults[2]?.passed || 0,
      q4: allResults[3]?.passed || 0,
      q5: allResults[4]?.passed || 0,
    });

    console.log("Supabase insert result:", data);
    console.error("Supabase insert error:", error);
  };

  if (!pool) return null;

  if (contestFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center font-mono space-y-6">
          <h1 className="text-3xl text-primary">
            {"{ Blind Coding Complete }"}
          </h1>

          <p>Score: {finalScore} / 25</p>
          <p>Time: {formatTime(elapsedTime)}</p>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="bg-primary text-white px-6 py-2 rounded"
          >
            Exit →
          </button>
        </div>
      </div>
    );
  }

  const question = pool.questions[currentQ];
  const isSubmitted = results[currentQ] !== undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b px-4 py-2 flex justify-between">
        <div>
          {"{ Blind Coding }"} | Pool {pool.poolNumber}
        </div>
        <div>⏱ {formatTime(elapsedTime)}</div>
      </div>

      <div className="flex gap-2 p-2">
        {pool.questions.map((q, i) => {
          let color = "bg-gray-300"; // not visited

          if (i === currentQ) {
            color = "bg-blue-500 text-white"; // current
          }

          if (results[i]) {
            if (results[i].status === "Accepted") {
              color = "bg-green-500 text-white"; // correct
            } else {
              color = "bg-red-500 text-white"; // wrong
            }
          }

          return (
            <button
              key={i}
              onClick={() => setCurrentQ(i)}
              className={`px-3 py-1 rounded font-mono ${color}`}
            >
              Q{i + 1}
            </button>
          );
        })}
      </div>

      <div className="flex flex-1">
        <div className="w-1/2 border-r p-4">
          <QuestionPanel question={question} result={results[currentQ]} />
        </div>

        <div className="w-1/2">
          <CodeEditor
            code={codes[currentQ] || ""}
            language={languages[currentQ] || "python"}
            onCodeChange={(c) => {
              const updated = { ...codes, [currentQ]: c };
              setCodes(updated);
              localStorage.setItem("codes", JSON.stringify(updated));
            }}
            onLanguageChange={(l) => {
              const updated = { ...languages, [currentQ]: l };
              setLanguages(updated);
              localStorage.setItem("languages", JSON.stringify(updated));
            }}
            isBlurred={!isSubmitted}
            isSubmitted={isSubmitted}
            isRunning={isRunning}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Contest;
