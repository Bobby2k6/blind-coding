// C:\Users\lenovo\OneDrive\Bobby\Projects\blind-code-blitz-main\src\pages\Registration.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colleges } from "@/data/colleges";

const Registration = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [college, setCollege] = useState("");
  const [customCollege, setCustomCollege] = useState("");
  const [error, setError] = useState("");

  const handleStart = () => {
    // clear previous contest data
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
    <div className="min-h-screen flex items-center justify-center p-4 scanline">
      <div className="w-full max-w-md animate-fade-in">
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
            <label className="text-sm font-mono text-muted-foreground">name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-secondary border border-border rounded-md px-3 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary font-mono text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-mono text-muted-foreground">mobile_number:</label>
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="Enter roll number"
              className="w-full bg-secondary border border-border rounded-md px-3 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary font-mono text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-mono text-muted-foreground">college:</label>
            <select
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full bg-secondary border border-border rounded-md px-3 py-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono text-sm"
            >
              <option value="">-- Select College --</option>
              {colleges.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
              <option value="other">Other (Enter manually)</option>
            </select>
          </div>

          {college === "other" && (
            <div className="space-y-1.5 animate-fade-in">
              <label className="text-sm font-mono text-muted-foreground">custom_college:</label>
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
    </div>
  );
};

export default Registration;
