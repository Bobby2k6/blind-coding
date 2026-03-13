// src/pages/Admin.tsx

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface LeaderboardEntry {
  name: string;
  rollNumber: string;
  college: string;
  points: number;
  totalTime: number;
  questionTimes: Record<number, number>;
  codes: string[];
  languages: string[];
}

const Admin = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase.from("participants").select("*");

    if (error) {
      console.error("Error fetching leaderboard:", error);
      return;
    }

    const formatted = data.map((row: any) => ({
      name: row.name,
      rollNumber: row.roll,
      college: row.college,
      points: row.points,
      totalTime: row.total_time,

      questionTimes: {
        0: row.q1,
        1: row.q2,
        2: row.q3,
        3: row.q4,
        4: row.q5,
      },

      codes: [row.q1_code, row.q2_code, row.q3_code, row.q4_code, row.q5_code],

      languages: [
        row.q1_lang,
        row.q2_lang,
        row.q3_lang,
        row.q4_lang,
        row.q5_lang,
      ],
    }));

    // Sort by points desc, then time asc
    formatted.sort((a: LeaderboardEntry, b: LeaderboardEntry) => {
      if (b.points !== a.points) return b.points - a.points;
      return a.totalTime - b.totalTime;
    });

    setEntries(formatted);
  };

  useEffect(() => {
    fetchLeaderboard();

    // auto refresh every 5 seconds
    const interval = setInterval(fetchLeaderboard, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="min-h-screen p-6 scanline">
      <div className="max-w-5xl mx-auto animate-fade-in">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🏆</div>
          <h1 className="text-2xl font-bold terminal-glow text-primary font-mono">
            {"{ Leaderboard }"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Admin View • Rankings by Points & Time
          </p>
        </div>

        {entries.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center card-glow">
            <p className="text-muted-foreground font-mono text-sm">
              {">"} No submissions yet. Waiting for participants...
              <span className="w-2 h-4 bg-primary animate-blink inline-block ml-1" />
            </p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg overflow-hidden card-glow">
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-mono">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left px-4 py-3 text-primary">#</th>
                    <th className="text-left px-4 py-3 text-primary">Name</th>
                    <th className="text-left px-4 py-3 text-primary">
                      Phone No
                    </th>
                    <th className="text-left px-4 py-3 text-primary">
                      College
                    </th>
                    <th className="text-center px-4 py-3 text-primary">
                      Points
                    </th>
                    <th className="text-center px-4 py-3 text-primary">
                      Total Time
                    </th>
                    <th className="text-center px-4 py-3 text-primary">
                      Q1-Q5 Score
                    </th>
                    <th className="text-center px-4 py-3 text-primary">Code</th>
                  </tr>
                </thead>

                <tbody>
                  {entries.map((entry, i) => (
                    <tr
                      key={i}
                      className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        {i === 0
                          ? "🥇"
                          : i === 1
                            ? "🥈"
                            : i === 2
                              ? "🥉"
                              : i + 1}
                      </td>

                      <td className="px-4 py-3 text-foreground">
                        {entry.name}
                      </td>

                      <td className="px-4 py-3 text-muted-foreground">
                        {entry.rollNumber}
                      </td>

                      <td className="px-4 py-3 text-muted-foreground">
                        {entry.college}
                      </td>

                      <td className="px-4 py-3 text-center">
                        <span
                          className={
                            entry.points >= 20
                              ? "text-primary"
                              : entry.points >= 10
                                ? "text-amber"
                                : "text-destructive"
                          }
                        >
                          {entry.points}/25
                        </span>
                      </td>

                      <td className="px-4 py-3 text-center text-cyan">
                        {formatTime(entry.totalTime)}
                      </td>

                      <td className="px-4 py-3 text-center text-muted-foreground text-xs">
                        {[0, 1, 2, 3, 4].map((q) => (
                          <span key={q}>
                            {entry.questionTimes[q] ?? "-"}
                            {q < 4 ? " | " : ""}
                          </span>
                        ))}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {[0, 1, 2, 3, 4].map((q) => (
                          <button
                            key={q}
                            onClick={() => {
                              const code = entry.codes[q] || "";
                              const blob = new Blob([code], {
                                type: "text/plain",
                              });
                              const url = URL.createObjectURL(blob);

                              const a = document.createElement("a");
                              a.href = url;
                              a.download = `${entry.rollNumber}_Q${q + 1}.${entry.languages[q] || "txt"}`;
                              a.click();
                            }}
                            className="text-xs bg-primary text-white px-2 py-1 rounded mx-1"
                          >
                            Q{q + 1}
                          </button>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
