import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionPanel from "@/components/QuestionPanel";
import CodeEditor from "@/components/CodeEditor";

const demoQuestion = {
  id: 0,
  title: "Welcome to Blind Coding",
  description: `
Print the message:

Welcome to Blind Coding Contest!

Then read a number N.

If N is greater than 5 print:
You are ready for the contest!

Else print:
Practice more and try again!

Note:
This is just a demo question to help you understand blind coding.
Spacing and indentation matters especially for Python.
`,
  testCases: [
    {
      input: "10",
      output:
        "Welcome to Blind Coding Contest!\nYou are ready for the contest!",
      hidden: false,
    },
    {
      input: "3",
      output: "Welcome to Blind Coding Contest!\nPractice more and try again!",
      hidden: false,
    },
    {
      input: "6",
      output:
        "Welcome to Blind Coding Contest!\nYou are ready for the contest!",
      hidden: true,
    },
    {
      input: "2",
      output: "Welcome to Blind Coding Contest!\nPractice more and try again!",
      hidden: true,
    },
    {
      input: "7",
      output:
        "Welcome to Blind Coding Contest!\nYou are ready for the contest!",
      hidden: true,
    },
  ],
};

const DemoContest = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* TOP BAR */}
      <div className="border-b px-4 py-2 flex justify-between">
        <div>{"{ Demo Coding }"}</div>
        <div>⏱ Demo Mode</div>
      </div>

      {/* QUESTION TAB */}
      <div className="flex gap-2 p-2">
        <button className="px-3 py-1 rounded font-mono bg-blue-500 text-white">
          Demo Q1
        </button>
      </div>

      {/* MAIN */}
      <div className="flex flex-1">
        <div className="w-1/2 border-r p-4">
          <QuestionPanel question={demoQuestion as any} language={language} />
        </div>

        <div className="w-1/2 flex flex-col">
          <CodeEditor
            code={code}
            language={language}
            onCodeChange={setCode}
            onLanguageChange={setLanguage}
            isBlurred={!submitted}
            isSubmitted={submitted}
            isRunning={false}
            onSubmit={handleSubmit}
          />

          {submitted && (
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={() => navigate("/contest")}
                className="bg-primary text-white px-6 py-2 rounded font-mono"
              >
                Start Contest →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoContest;
