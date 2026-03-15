// src/pages/Registration.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { colleges } from "@/data/colleges";

const Registration = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [college, setCollege] = useState("");
  const [customCollege, setCustomCollege] = useState("");
  const [error, setError] = useState("");

  const [showInstructions, setShowInstructions] = useState(true);

  const handleStart = () => {
    localStorage.removeItem("codes");
    localStorage.removeItem("languages");
    localStorage.removeItem("questionResults");
    localStorage.removeItem("selectedPool");

    const finalCollege = college === "other" ? customCollege.trim() : college;

    if (!name.trim() || !rollNumber.trim() || !finalCollege) {
      setError("Please fill in all fields");
      return;
    }

    const participant = {
      name: name.trim(),
      rollNumber: rollNumber.trim(),
      college: finalCollege,
      startTime: Date.now(),
    };

    localStorage.setItem("participant", JSON.stringify(participant));

    navigate("/pool-selection");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 scanline">
      {/* INFO BUTTON */}
      <button
        onClick={() => setShowInstructions(true)}
        className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center 
        rounded-full border border-primary text-primary font-mono text-lg 
        hover:bg-primary hover:text-primary-foreground transition"
      >
        i
      </button>

      {/* MAIN CONTENT */}
      <div
        className={`w-full max-w-md animate-fade-in ${
          showInstructions ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🧑‍💻</div>
          <h1 className="text-3xl font-bold terminal-glow text-primary font-mono">
            {"{ Blind Coding }"}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            💻 Code without seeing ⌨️ Trust your instincts
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-lg border border-border p-6 card-glow space-y-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono border-b border-border pb-3 mb-2">
            <span className="text-primary">$</span> participant --register
            <span className="w-2 h-4 bg-primary animate-blink inline-block" />
          </div>

          {error && (
            <p className="text-destructive text-sm font-mono">{`> Error: ${error}`}</p>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-mono text-muted-foreground">
              name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-secondary border border-border rounded-md px-3 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary font-mono text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-mono text-muted-foreground">
              mobile_number:
            </label>
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="Enter mobile number"
              className="w-full bg-secondary border border-border rounded-md px-3 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary font-mono text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-mono text-muted-foreground">
              college:
            </label>
            <select
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full bg-secondary border border-border rounded-md px-3 py-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono text-sm"
            >
              <option value="">-- Select College --</option>
              {colleges.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
              <option value="other">Other (Enter manually)</option>
            </select>
          </div>

          {college === "other" && (
            <div className="space-y-1.5 animate-fade-in">
              <label className="text-sm font-mono text-muted-foreground">
                custom_college:
              </label>
              <input
                type="text"
                value={customCollege}
                onChange={(e) => setCustomCollege(e.target.value)}
                placeholder="Enter your college name"
                className="w-full bg-secondary border border-border rounded-md px-3 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary font-mono text-sm"
              />
            </div>
          )}

          <button
            onClick={handleStart}
            className="w-full mt-4 bg-primary text-primary-foreground font-mono font-semibold py-3 rounded-md hover:opacity-90 transition-opacity text-sm"
          >
            {">"} Start Contest 💻
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4 font-mono">
          ⌨️ Type blind. Code brave. {"{ }"}
        </p>
      </div>

      {/* INSTRUCTIONS MODAL */}
      {showInstructions && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-lg w-full mx-4 card-glow font-mono relative">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowInstructions(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-primary text-lg"
            >
              ✕
            </button>

            <h2 className="text-xl text-primary font-bold mb-4">
              Contest Instructions
            </h2>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>• This is a blind coding contest.</li>
              <li>• You cannot see your code while typing.</li>
              <li>• Copy paste is disabled.</li>
              <li>• Each question contains hidden test cases.</li>
              <li>• Once submitted, code cannot be modified.</li>
              <li>• Score is based on passed test cases.</li>
              <li>• Leaderboard ranks by score then time.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
