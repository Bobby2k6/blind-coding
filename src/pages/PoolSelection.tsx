// C:\Users\lenovo\OneDrive\Bobby\Projects\blind-code-blitz-main\src\pages\PoolSelection.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pools } from "@/data/questions";

const PoolSelection = () => {
  const navigate = useNavigate();
  const [poolNumber, setPoolNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const num = parseInt(poolNumber);
    const pool = pools.find((p) => p.poolNumber === num);
    if (!pool) {
      setError(`Pool ${poolNumber || "?"} not found. Available: 1-${pools.length}`);
      return;
    }
    localStorage.setItem("selectedPool", String(num));
    localStorage.setItem("questionResults", JSON.stringify({}));
    localStorage.setItem("questionTimes", JSON.stringify({}));
    navigate("/demo");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 scanline">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎲</div>
          <h1 className="text-2xl font-bold terminal-glow text-primary font-mono">
            Pick Your Pool
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Draw a paper from the bowl and enter your pool number
          </p>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 card-glow space-y-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono border-b border-border pb-3">
            <span className="text-primary">$</span> select --pool
            <span className="w-2 h-4 bg-primary animate-blink inline-block" />
          </div>

          {error && (
            <p className="text-destructive text-sm font-mono">{`> ${error}`}</p>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-mono text-muted-foreground">pool_number:</label>
            <input
              type="number"
              min={1}
              max={pools.length}
              value={poolNumber}
              onChange={(e) => setPoolNumber(e.target.value)}
              placeholder={`Enter 1-${pools.length}`}
              className="w-full bg-secondary border border-border rounded-md px-3 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary font-mono text-sm text-center text-2xl"
            />
          </div>

          <div className="flex gap-2 justify-center">
            {pools.map((p) => (
              <button
                key={p.poolNumber}
                onClick={() => setPoolNumber(String(p.poolNumber))}
                className={`w-10 h-10 rounded-md border font-mono text-sm font-semibold transition-colors ${
                  poolNumber === String(p.poolNumber)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {p.poolNumber}
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-2 bg-primary text-primary-foreground font-mono font-semibold py-3 rounded-md hover:opacity-90 transition-opacity text-sm"
          >
            {">"} Load Questions
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoolSelection;
