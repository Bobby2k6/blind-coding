import { useState } from "react";

interface Props {
  code: string;
  language: string;
  onCodeChange: (code: string) => void;
  onLanguageChange: (lang: string) => void;
  isBlurred: boolean;
  isSubmitted: boolean;
  isRunning: boolean;
  onSubmit: () => void;
}

const languages = ["python", "c", "cpp", "java"];

const languageLabels: Record<string, string> = {
  python: "Python 🐍",
  c: "C",
  cpp: "C++",
  java: "Java ☕",
};

const CodeEditor = ({
  code,
  language,
  onCodeChange,
  onLanguageChange,
  isBlurred,
  isSubmitted,
  isRunning,
  onSubmit,
}: Props) => {
  return (
    <div className="flex flex-col h-full">
      {/* Editor toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <div className="w-3 h-3 rounded-full bg-amber" />
          <div className="w-3 h-3 rounded-full bg-primary" />

          <span className="ml-3 text-xs font-mono text-muted-foreground">
            editor.{language === "cpp" ? "cpp" : language}
          </span>
        </div>

        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          disabled={isSubmitted}
          className="bg-secondary border border-border rounded px-2 py-1 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {languages.map((l) => (
            <option key={l} value={l}>
              {languageLabels[l]}
            </option>
          ))}
        </select>
      </div>

      {/* Code area */}
      <div className="flex-1 relative">
        {isBlurred && (
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-4xl mb-2">🙈</div>
              <p className="text-xs font-mono text-muted-foreground">
                Blind mode active — you can't see your code!
              </p>
            </div>
          </div>
        )}

        <textarea
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          disabled={isSubmitted}
          spellCheck={false}
          className={`w-full h-full min-h-[300px] bg-secondary/30 p-4 font-mono text-sm text-foreground resize-none focus:outline-none ${
            isBlurred ? "blur-code" : ""
          } ${isSubmitted ? "opacity-80" : ""}`}
          style={
            isBlurred
              ? {
                  color: "transparent",
                  textShadow: "0 0 8px hsl(142 72% 42% / 0.5)",
                  caretColor: "hsl(142 72% 42%)",
                }
              : {}
          }
        />
      </div>

      {/* Submit bar */}
      <div className="px-4 py-3 bg-card border-t border-border flex items-center justify-between">
        <div className="text-xs font-mono text-muted-foreground">
          {isSubmitted ? (
            <span className="text-primary">✓ Submitted — code revealed</span>
          ) : (
            <span>👨‍💻 Type blind, submit brave</span>
          )}
        </div>

        <button
          onClick={onSubmit}
          disabled={isSubmitted || !code.trim() || isRunning}
          className={`font-mono font-semibold py-2 px-6 rounded-md text-sm transition-opacity ${
            isSubmitted
              ? "bg-secondary text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }`}
        >
          {isSubmitted ? "Submitted ✓" : isRunning ? "Running..." : "Submit →"}
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
