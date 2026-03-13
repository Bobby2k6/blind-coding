import type { Question } from "@/data/questions";

interface Props {
  question: Question;
  result?: {
    passed: number;
    total: number;
    status: string;
    output?: string;
    outputs?: {
      input: string;
      expected: string;
      actual: string;
      passed: boolean;
      hidden: boolean;
    }[];
  };
}

const QuestionPanel = ({ question, result }: Props) => {
  const visibleTests = question.testCases.filter((tc) => !tc.hidden);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Title */}
      <div>
        <h2 className="text-lg font-bold font-mono text-foreground">
          <span className="text-primary">Q{question.id}</span> –{" "}
          {question.title}
        </h2>
      </div>

      {/* Description */}
      <div className="bg-secondary/50 rounded-md p-4 border border-border">
        <p className="text-sm text-foreground leading-relaxed">
          {question.description}
        </p>
      </div>

      {/* Constraints */}
      {question.constraints && (
        <div className="text-xs font-mono text-muted-foreground">
          <span className="text-primary">constraints:</span>{" "}
          {question.constraints}
        </div>
      )}

      {/* Visible test cases ONLY before submission */}
      {!result && (
        <div className="space-y-3">
          <h3 className="text-sm font-mono font-semibold text-primary">
            Test Cases (visible):
          </h3>

          {visibleTests.map((tc, i) => (
            <div
              key={i}
              className="bg-secondary rounded-md p-3 border border-border font-mono text-xs space-y-1"
            >
              <div>
                <span className="text-muted-foreground">Input: </span>
                <span className="text-foreground whitespace-pre-wrap">
                  {tc.input}
                </span>
              </div>

              <div>
                <span className="text-muted-foreground">Output: </span>
                <span className="text-primary">{tc.output}</span>
              </div>
            </div>
          ))}

          <p className="text-xs text-muted-foreground font-mono">
            + {question.testCases.length - visibleTests.length} hidden test
            cases 🔒
          </p>
        </div>
      )}

      {/* Result Summary */}
      {result && (
        <div
          className={`rounded-md p-4 border font-mono text-sm ${
            result.status === "Accepted"
              ? "bg-primary/10 border-primary/30 text-primary"
              : result.status === "Runtime Error" ||
                  result.status === "Compilation Error"
                ? "bg-destructive/10 border-destructive/30 text-destructive"
                : "bg-amber/10 border-amber/30 text-amber"
          }`}
        >
          <div className="font-bold">{result.status}</div>

          <div className="text-xs mt-1">
            Test Cases Passed: {result.passed} / {result.total}
          </div>

          <div className="text-xs mt-1">Points: {result.passed}</div>

          {result?.output && result.status !== "Accepted" && (
            <pre className="mt-2 text-xs bg-black text-red-400 p-2 rounded overflow-x-auto">
              {result.output}
            </pre>
          )}
        </div>
      )}

      {/* Detailed test case results AFTER submission */}
      {result?.outputs && (
        <div className="space-y-3">
          <h3 className="text-sm font-mono font-semibold text-primary">
            Test Case Results
          </h3>

          {result.outputs.map((tc, i) => (
            <div
              key={i}
              className={`rounded-md p-3 border font-mono text-xs space-y-1 ${
                tc.passed
                  ? "bg-green-500/10 border-green-500"
                  : "bg-red-500/10 border-red-500"
              }`}
            >
              <div>
                <span className="text-muted-foreground">Input: </span>
                <span className="whitespace-pre-wrap">{tc.input}</span>
              </div>

              <div>
                <span className="text-muted-foreground">Expected: </span>
                <span className="text-primary whitespace-pre-wrap">
                  {tc.expected}
                </span>
              </div>

              <div>
                <span className="text-muted-foreground">Actual: </span>
                <span className="whitespace-pre-wrap">{tc.actual}</span>
              </div>

              <div className="font-semibold">
                {tc.passed ? "✓ Passed" : "✗ Failed"}
              </div>

              {/* {tc.hidden && (
                <div className="text-yellow-400 text-xs">Hidden Test Case</div>
              )} */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionPanel;
