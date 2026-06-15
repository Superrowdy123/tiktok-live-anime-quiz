"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface GameData {
  status: string;
  currentQuestion: {
    id: number;
    type: string;
    difficulty: string;
    question: string;
    options: string[];
    answer: string;
    timeLimit: number;
  } | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  timeRemaining: number;
  leaderboard: {
    rank: number;
    username: string;
    displayName: string;
    points: number;
    streak: number;
    team: string | null;
    title: string;
  }[];
  correctAnswer: string | null;
  winner: string | null;
  winnerDisplayName: string | null;
  bossRound: boolean;
  questionsAsked: number;
  totalPlayers: number;
  stats: {
    totalPlayers: number;
    questionsAnswered: number;
    totalAnswers: number;
    correctAnswers: number;
    fastestAnswer: number | null;
    fastestPlayer: string | null;
    mostActivePlayer: string | null;
    sessionDuration: number;
  };
  sessionId: number | null;
  currentRound: number;
  totalRounds: number;
}

type TabType = "control" | "leaderboard" | "stats" | "tiktok" | "simulate";

export default function AdminPage() {
  const [game, setGame] = useState<GameData | null>(null);
  const [tab, setTab] = useState<TabType>("control");
  const [tiktokUsername, setTiktokUsername] = useState("");
  const [tiktokConnected, setTiktokConnected] = useState(false);
  const [selectedRound, setSelectedRound] = useState(1);
  const [simUsername, setSimUsername] = useState("test_player");
  const [simMessage, setSimMessage] = useState("");
  const [events, setEvents] = useState<{ type: string; data: string; time: string }[]>([]);
  const [addPointsUser, setAddPointsUser] = useState("");
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [autoAdvanceDelay, setAutoAdvanceDelay] = useState(3);
  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [addPointsAmount, setAddPointsAmount] = useState(10);
  const pollRef = useRef<ReturnType<typeof setInterval>>(null);

  const fetchGame = useCallback(async () => {
    try {
      const res = await fetch("/api/game");
      if (res.ok) {
        const data = await res.json();
        setGame(data);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    fetchGame();
    pollRef.current = setInterval(fetchGame, 500);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [fetchGame]);

  // Auto-advance logic
  useEffect(() => {
    if (autoAdvance && game?.status === "revealing") {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = setTimeout(() => {
        gameAction("next_question");
      }, autoAdvanceDelay * 1000);
    }
    return () => {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    };
  }, [game?.status, autoAdvance, autoAdvanceDelay]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      if (e.code === "Space" || e.code === "ArrowRight") {
        e.preventDefault();
        if (game?.status === "active" || game?.status === "revealing") {
          gameAction("next_question");
        }
      } else if (e.code === "KeyP") {
        e.preventDefault();
        if (game?.status === "question") {
          gameAction("pause");
        } else if (game?.status === "paused") {
          gameAction("resume");
        }
      } else if (e.code === "KeyS") {
        e.preventDefault();
        if (game?.status === "question") {
          gameAction("skip");
        }
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [game?.status]);

  const gameAction = async (action: string, extra: Record<string, unknown> = {}) => {
    try {
      const res = await fetch("/api/game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...extra }),
      });
      const data = await res.json();
      addEvent(action, JSON.stringify(data));
      await fetchGame();
    } catch {
      /* ignore */
    }
  };

  // Send answer — accepts direct message parameter to avoid React state timing issues
  const sendAnswer = async (username: string, message: string) => {
    if (!username || !message) return;
    try {
      const res = await fetch("/api/game/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.toLowerCase().replace(/\s/g, "_"),
          displayName: username,
          message: message,
        }),
      });
      const data = await res.json();
      addEvent("answer", `${username}: "${message}" → ${data.correct ? "✅ CORRECT" : "❌ Wrong"} | ${data.reason || ""}`);
      await fetchGame();
    } catch {
      /* ignore */
    }
  };

  const [tiktokError, setTiktokError] = useState<string | null>(null);
  const [tiktokLoading, setTiktokLoading] = useState(false);

  const connectTikTok = async () => {
    if (!tiktokUsername.trim()) {
      setTiktokError("Please enter a TikTok username");
      return;
    }
    
    setTiktokLoading(true);
    setTiktokError(null);
    
    try {
      const res = await fetch("/api/tiktok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "connect", username: tiktokUsername.trim() }),
      });
      const data = await res.json();
      
      if (data.success) {
        setTiktokConnected(true);
        addEvent("tiktok", `✅ Connected to @${tiktokUsername}`);
      } else {
        setTiktokError(data.error || "Failed to connect");
        addEvent("tiktok", `❌ Error: ${data.error}`);
      }
    } catch (err) {
      setTiktokError("Network error - please try again");
      addEvent("tiktok", "❌ Network error");
    } finally {
      setTiktokLoading(false);
    }
  };

  const disconnectTikTok = async () => {
    try {
      await fetch("/api/tiktok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "disconnect" }),
      });
      setTiktokConnected(false);
      setTiktokError(null);
      addEvent("tiktok", "Disconnected");
    } catch {
      /* ignore */
    }
  };

  const addEvent = (type: string, data: string) => {
    setEvents((prev) => [
      { type, data, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 49),
    ]);
  };

  const exportResults = async (format: string) => {
    const res = await fetch(`/api/game/export?format=${format}`);
    if (format === "csv") {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `anime-wiz-round-${game?.currentRound || 1}-results.csv`;
      a.click();
    } else {
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `anime-wiz-round-${game?.currentRound || 1}-results.json`;
      a.click();
    }
  };

  const formatDuration = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    return `${h}h ${m % 60}m ${s % 60}s`;
  };

  const diffBadge = (d: string) => {
    const colors: Record<string, string> = {
      easy: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
      medium: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
      hard: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    };
    return colors[d] || "bg-gray-500/20 text-gray-300 border-gray-500/40";
  };

  return (
    <div className="anime-bg min-h-screen">
      <div className="anime-bg" />

      {/* Header */}
      <header className="glass-card neon-border-pink mx-4 mt-4 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎮</span>
          <div>
            <h1
              className="text-2xl font-bold neon-text"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              ANIME WIZ LIVE ARENA
            </h1>
            <p className="text-sm text-purple-300 opacity-70">Admin Control Panel</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                game?.status === "question"
                  ? "bg-green-400 animate-pulse"
                  : game?.status === "active" || game?.status === "revealing"
                  ? "bg-yellow-400"
                  : "bg-gray-500"
              }`}
            />
            <span className="text-gray-300 uppercase" style={{ fontFamily: "Orbitron" }}>
              {game?.status || "offline"}
            </span>
          </div>
          {game?.currentRound ? (
            <div className="text-yellow-300 font-bold">
              Round {game.currentRound}/{game.totalRounds || 100}
            </div>
          ) : null}
          <div className="text-purple-300">
            👥 {game?.totalPlayers || 0} players
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="flex gap-2 mx-4 mt-4 overflow-x-auto">
        {(
          [
            ["control", "🎮 Control"],
            ["leaderboard", "🏆 Leaderboard"],
            ["stats", "📊 Stats"],
            ["tiktok", "📱 TikTok"],
            ["simulate", "🧪 Simulate"],
          ] as [TabType, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`btn-neon text-xs whitespace-nowrap ${
              tab === key ? "btn-neon-purple" : "bg-slate-800/50 text-gray-400"
            }`}
          >
            {label}
          </button>
        ))}
        <a
          href="/overlay"
          target="_blank"
          className="btn-neon btn-neon-pink text-xs ml-auto whitespace-nowrap"
        >
          🖥️ Open Overlay
        </a>
      </nav>

      {/* Content */}
      <main className="mx-4 mt-4 pb-8">
        {/* ─── Control Tab ─── */}
        {tab === "control" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Game Controls */}
            <div className="glass-card neon-border p-5 lg:col-span-2 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2
                  className="text-lg font-bold text-purple-300"
                  style={{ fontFamily: "Orbitron" }}
                >
                  GAME CONTROLS
                </h2>
                <div className="text-xs text-gray-500">
                  ⌨️ <span className="text-gray-400">Space</span>=Next <span className="text-gray-400">P</span>=Pause <span className="text-gray-400">S</span>=Skip
                </div>
              </div>

              {game?.status === "waiting" && (
                <div className="space-y-4">
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h3 className="text-sm font-bold text-cyan-300 mb-3">📋 ROUND SELECTION</h3>
                    <p className="text-xs text-gray-400 mb-3">
                      100 rounds available. Each round has 30 questions:<br/>
                      10 Easy (10 pts) → 10 Medium (20 pts) → 10 Hard (30 pts)<br/>
                      Viewers answer by typing <span className="text-pink-400 font-bold">A, B, C, or D</span> in chat.
                    </p>
                    <div className="flex gap-3 items-center">
                      <label className="text-sm text-gray-400">Round:</label>
                      <input
                        type="number"
                        value={selectedRound}
                        onChange={(e) => setSelectedRound(Math.max(1, Math.min(100, Number(e.target.value))))}
                        min={1}
                        max={100}
                        className="w-24"
                      />
                      <span className="text-xs text-gray-500">/ 100</span>
                    </div>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {[1, 10, 25, 50, 75, 100].map((r) => (
                        <button
                          key={r}
                          onClick={() => setSelectedRound(r)}
                          className={`px-3 py-1 rounded text-xs ${
                            selectedRound === r
                              ? "bg-purple-600 text-white"
                              : "bg-slate-700 text-gray-400 hover:bg-slate-600"
                          }`}
                        >
                          Round {r}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => gameAction("start", { round: selectedRound })}
                    className="btn-neon btn-neon-green w-full text-lg py-3"
                  >
                    🚀 START ROUND {selectedRound}
                  </button>
                </div>
              )}

              {(game?.status === "active" || game?.status === "revealing") && (
                <div className="space-y-3">
                  <div className="bg-slate-800/40 rounded-lg p-3 mb-3">
                    <p className="text-sm text-gray-300">
                      <span className="text-yellow-300 font-bold">Round {game.currentRound}</span>
                      {" • "}
                      <span className="text-cyan-300">{(game.totalQuestions || 30) - (game.questionsAsked || 0)} questions left</span>
                      {" • "}
                      Answer with <span className="text-pink-400 font-bold">A, B, C, or D</span>
                    </p>
                  </div>
                  <button
                    onClick={() => gameAction("next_question")}
                    className="btn-neon btn-neon-blue w-full text-lg py-3"
                  >
                    ➡️ NEXT QUESTION <span className="text-xs opacity-70">(Space)</span>
                  </button>
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => gameAction("pause")} className="btn-neon btn-neon-gold">⏸️ Pause <span className="text-xs">(P)</span></button>
                    <button onClick={() => gameAction("skip")} className="btn-neon bg-slate-700 text-gray-300">⏭️ Skip <span className="text-xs">(S)</span></button>
                    <button onClick={() => gameAction("end")} className="btn-neon btn-neon-red">🏁 End</button>
                  </div>
                  
                  {/* Auto-advance toggle */}
                  <div className="flex items-center justify-between bg-slate-800/30 rounded-lg p-3 mt-2">
                    <div className="flex items-center gap-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={autoAdvance}
                          onChange={(e) => setAutoAdvance(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                      <span className="text-sm text-gray-300">Auto-advance</span>
                    </div>
                    {autoAdvance && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Delay:</span>
                        <select
                          value={autoAdvanceDelay}
                          onChange={(e) => setAutoAdvanceDelay(Number(e.target.value))}
                          className="bg-slate-700 text-white text-xs px-2 py-1 rounded"
                        >
                          <option value={2}>2s</option>
                          <option value={3}>3s</option>
                          <option value={5}>5s</option>
                          <option value={7}>7s</option>
                          <option value={10}>10s</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {game?.status === "question" && (
                <div className="space-y-3">
                  <div className="bg-slate-800/40 rounded-lg p-3 mb-3">
                    <p className="text-sm text-gray-300">
                      <span className="text-yellow-300 font-bold">Round {game.currentRound}</span>
                      {" • "}
                      Question {game.questionsAsked}/{game.totalQuestions}
                      {" • "}
                      <span className={`font-bold ${
                        game.currentQuestion?.difficulty === "easy" ? "text-cyan-400" :
                        game.currentQuestion?.difficulty === "medium" ? "text-yellow-400" : "text-orange-400"
                      }`}>
                        {game.currentQuestion?.difficulty?.toUpperCase()}
                      </span>
                      {" • "}
                      <span className="text-gray-400">{game.timeRemaining}s left</span>
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => gameAction("pause")} className="btn-neon btn-neon-gold">⏸️ Pause</button>
                    <button onClick={() => gameAction("skip")} className="btn-neon bg-slate-700 text-gray-300">⏭️ Skip</button>
                    <button onClick={() => gameAction("end")} className="btn-neon btn-neon-red">🏁 End Round</button>
                  </div>
                </div>
              )}

              {game?.status === "paused" && (
                <button onClick={() => gameAction("resume")} className="btn-neon btn-neon-green w-full text-lg py-3">
                  ▶️ RESUME GAME
                </button>
              )}

              {game?.status === "completed" && (
                <div className="space-y-3">
                  <div className="text-center text-2xl font-bold text-yellow-300 neon-text-gold mb-4">
                    🏆 ROUND {game.currentRound} COMPLETE! 🏆
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => exportResults("json")} className="btn-neon btn-neon-blue">📥 Export JSON</button>
                    <button onClick={() => exportResults("csv")} className="btn-neon btn-neon-green">📥 Export CSV</button>
                  </div>
                  <button onClick={() => gameAction("reset")} className="btn-neon btn-neon-purple w-full">🔄 New Round</button>
                </div>
              )}

              {/* Mod Tools */}
              {game && game.status !== "waiting" && (
                <div className="mt-6 pt-4 border-t border-purple-500/20">
                  <h3 className="text-sm font-bold text-gray-400 mb-2">MOD TOOLS</h3>
                  <div className="flex gap-2 mb-2">
                    <input type="text" placeholder="Username" value={addPointsUser} onChange={(e) => setAddPointsUser(e.target.value)} className="flex-1 text-sm" />
                    <input type="number" value={addPointsAmount} onChange={(e) => setAddPointsAmount(Number(e.target.value))} className="w-20 text-sm" />
                    <button onClick={() => { gameAction("add_points", { username: addPointsUser, points: addPointsAmount }); setAddPointsUser(""); }} className="btn-neon btn-neon-gold text-xs">+Pts</button>
                    <button onClick={() => { gameAction("ban", { username: addPointsUser }); setAddPointsUser(""); }} className="btn-neon btn-neon-red text-xs">Ban</button>
                  </div>
                </div>
              )}
            </div>

            {/* Current Question */}
            <div className="glass-card neon-border p-5 animate-fade-in">
              <h2 className="text-lg font-bold text-purple-300 mb-4" style={{ fontFamily: "Orbitron" }}>
                CURRENT QUESTION
              </h2>
              {game?.currentQuestion ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`q-type-badge border ${diffBadge(game.currentQuestion.difficulty)}`}>
                      {game.currentQuestion.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">Q{game.questionsAsked}/{game.totalQuestions}</span>
                  </div>

                  <p className="text-white text-base font-medium">{game.currentQuestion.question}</p>

                  {game.currentQuestion.options.length > 0 && (
                    <div className="space-y-1">
                      {game.currentQuestion.options.map((opt, i) => {
                        const letter = String.fromCharCode(65 + i);
                        const isCorrect = game.correctAnswer === letter;
                        return (
                          <div
                            key={i}
                            className={`text-sm px-3 py-2 rounded transition-all ${
                              isCorrect
                                ? "bg-green-500/20 border border-green-500/50 text-green-300 font-bold"
                                : game.correctAnswer
                                ? "bg-slate-800/30 text-gray-500"
                                : "bg-slate-800/50 text-gray-300"
                            }`}
                          >
                            {opt}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Timer */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Time</span>
                      <span className={`font-bold ${game.timeRemaining <= 3 ? "text-red-400" : game.timeRemaining <= 5 ? "text-yellow-400" : "text-cyan-400"}`}>
                        {game.timeRemaining}s
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div
                        className={`timer-bar ${game.timeRemaining <= 3 ? "critical" : game.timeRemaining <= 5 ? "warning" : ""}`}
                        style={{ width: `${(game.timeRemaining / game.currentQuestion.timeLimit) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Answer Reveal */}
                  {game.correctAnswer && (
                    <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 font-bold text-sm">✅ Correct: {game.correctAnswer}</p>
                      {game.winnerDisplayName && (
                        <p className="text-yellow-300 text-sm mt-1">🏆 {game.winnerDisplayName}</p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-8">
                  {game?.status === "waiting" ? "Start a round to see questions" : "Click 'Next Question' to begin"}
                </div>
              )}
            </div>

            {/* Event Log */}
            <div className="glass-card neon-border p-5 lg:col-span-3 animate-fade-in">
              <h2 className="text-lg font-bold text-purple-300 mb-3" style={{ fontFamily: "Orbitron" }}>EVENT LOG</h2>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {events.length === 0 ? (
                  <p className="text-gray-600 text-sm">No events yet — start a round!</p>
                ) : (
                  events.map((e, i) => (
                    <div key={i} className="text-xs flex gap-2 py-1 border-b border-slate-800/50">
                      <span className="text-gray-600 w-16 shrink-0">{e.time}</span>
                      <span className="text-purple-400 w-20 shrink-0 uppercase font-bold">{e.type}</span>
                      <span className="text-gray-300">{e.data}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ─── Leaderboard Tab ─── */}
        {tab === "leaderboard" && (
          <div className="glass-card neon-border-gold p-5 animate-fade-in">
            <h2 className="text-xl font-bold text-yellow-300 neon-text-gold mb-4" style={{ fontFamily: "Orbitron" }}>
              🏆 LIVE LEADERBOARD {game?.currentRound ? `(Round ${game.currentRound})` : ""}
            </h2>
            {game?.leaderboard && game.leaderboard.length > 0 ? (
              <div className="space-y-2">
                {game.leaderboard.map((p) => (
                  <div key={p.username} className="lb-entry flex items-center gap-3 bg-slate-800/40 p-3 rounded-xl">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${p.rank === 1 ? "rank-1" : p.rank === 2 ? "rank-2" : p.rank === 3 ? "rank-3" : "bg-slate-700 text-gray-400"}`}>
                      {p.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white truncate">{p.displayName}</span>
                        <span className="text-xs text-purple-400">{p.title}</span>
                      </div>
                      <div className="text-xs text-gray-500">@{p.username} {p.team && <span className="ml-2 text-cyan-400">{p.team}</span>}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-yellow-300 text-lg">{p.points}</div>
                      {p.streak > 0 && <div className="text-xs text-orange-400">🔥 {p.streak}</div>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No players yet. Start a round!</p>
            )}
          </div>
        )}

        {/* ─── Stats Tab ─── */}
        {tab === "stats" && game && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
            {[
              { label: "Current Round", value: `${game.currentRound || "-"}/${game.totalRounds || 100}`, icon: "🎯", color: "text-yellow-400" },
              { label: "Total Players", value: game.stats.totalPlayers, icon: "👥", color: "text-cyan-400" },
              { label: "Questions Asked", value: `${game.stats.questionsAnswered}/30`, icon: "❓", color: "text-purple-400" },
              { label: "Total Answers", value: game.stats.totalAnswers, icon: "💬", color: "text-pink-400" },
              { label: "Correct Answers", value: game.stats.correctAnswers, icon: "✅", color: "text-green-400" },
              { label: "Accuracy", value: game.stats.totalAnswers > 0 ? `${Math.round((game.stats.correctAnswers / game.stats.totalAnswers) * 100)}%` : "N/A", icon: "🎯", color: "text-yellow-400" },
              { label: "Fastest Answer", value: game.stats.fastestAnswer ? `${game.stats.fastestAnswer.toFixed(1)}s` : "N/A", icon: "⚡", color: "text-orange-400" },
              { label: "Duration", value: formatDuration(game.stats.sessionDuration), icon: "⏱️", color: "text-gray-300" },
            ].map((stat, i) => (
              <div key={i} className="glass-card neon-border p-4">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-xs text-gray-500 uppercase">{stat.label}</div>
                <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* ─── TikTok Tab ─── */}
        {tab === "tiktok" && (
          <div className="glass-card neon-border-pink p-5 max-w-xl animate-fade-in">
            <h2 className="text-lg font-bold text-pink-300 mb-4" style={{ fontFamily: "Orbitron" }}>📱 TIKTOK LIVE CONNECTION</h2>
            
            {!tiktokConnected ? (
              <div className="space-y-4">
                {/* Instructions */}
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h3 className="text-sm font-bold text-cyan-300 mb-2">📋 How it works:</h3>
                  <ol className="text-xs text-gray-400 space-y-1 list-decimal list-inside">
                    <li>Start your TikTok Live stream first</li>
                    <li>Enter your TikTok username below</li>
                    <li>Click Connect — chat messages will automatically be detected</li>
                    <li>When viewers type <span className="text-pink-400 font-bold">A, B, C, or D</span> in chat, they answer!</li>
                  </ol>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-1">TikTok Username (who is streaming)</label>
                  <input 
                    type="text" 
                    placeholder="your_tiktok_username" 
                    value={tiktokUsername} 
                    onChange={(e) => setTiktokUsername(e.target.value.replace("@", ""))} 
                    className="w-full" 
                  />
                  <p className="text-xs text-gray-500 mt-1">Don't include the @ symbol</p>
                </div>
                
                <button 
                  onClick={connectTikTok} 
                  disabled={tiktokLoading}
                  className={`btn-neon btn-neon-pink w-full text-lg py-3 ${tiktokLoading ? "opacity-50 cursor-wait" : ""}`}
                >
                  {tiktokLoading ? "🔄 Connecting..." : "🔗 Connect to TikTok Live"}
                </button>
                
                {/* Error message */}
                {tiktokError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                    ❌ {tiktokError}
                  </div>
                )}
                
                <div className="text-xs text-gray-500 bg-slate-800/30 rounded p-3">
                  <p className="font-bold text-yellow-400 mb-1">⚠️ Requirements:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>The TikTok account must be <span className="text-green-400">currently live</span></li>
                    <li>If you get an error, make sure the stream is active</li>
                    <li>Use the <span className="text-cyan-400">Simulate tab</span> for testing without TikTok</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Connected Status */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-4 h-4 rounded-full bg-green-400 animate-pulse" />
                    <div>
                      <p className="text-green-300 font-bold text-lg">Connected to TikTok Live!</p>
                      <p className="text-sm text-gray-400">@{tiktokUsername}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">
                    Chat messages are being monitored. When viewers type <span className="text-pink-400 font-bold">A, B, C, or D</span>, 
                    their answers will be automatically processed!
                  </p>
                </div>

                {/* Live Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                    <div className="text-2xl">💬</div>
                    <div className="text-xs text-gray-500">Messages</div>
                    <div className="text-lg font-bold text-cyan-400">Live</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                    <div className="text-2xl">✅</div>
                    <div className="text-xs text-gray-500">Answers</div>
                    <div className="text-lg font-bold text-green-400">Detecting</div>
                  </div>
                </div>

                <button onClick={disconnectTikTok} className="btn-neon btn-neon-red w-full">
                  Disconnect from TikTok
                </button>
              </div>
            )}
          </div>
        )}

        {/* ─── Simulate Tab ─── */}
        {tab === "simulate" && (
          <div className="glass-card neon-border-blue p-5 max-w-lg animate-fade-in">
            <h2 className="text-lg font-bold text-cyan-300 mb-4" style={{ fontFamily: "Orbitron" }}>🧪 SIMULATE CHAT</h2>

            {/* Show current game status */}
            <div className="bg-slate-800/50 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${game?.status === "question" ? "bg-green-400 animate-pulse" : "bg-gray-500"}`} />
                <span className="text-sm text-gray-300">
                  Status: <span className="font-bold text-white">{game?.status || "offline"}</span>
                </span>
              </div>
              {game?.status === "question" && game.currentQuestion && (
                <div className="text-xs text-gray-400">
                  <p className="font-bold text-white mb-1">{game.currentQuestion.question}</p>
                  {game.currentQuestion.options.map((opt, i) => (
                    <p key={i} className="text-gray-300">{opt}</p>
                  ))}
                  <p className="text-cyan-400 mt-1">Correct answer: {game.currentQuestion.answer}</p>
                </div>
              )}
              {game?.status !== "question" && (
                <p className="text-xs text-yellow-400">
                  {game?.status === "waiting" ? "⚠️ Start a round first, then click Next Question" :
                   game?.status === "active" || game?.status === "revealing" ? "⚠️ Click 'Next Question' in the Control tab" :
                   game?.status === "paused" ? "⚠️ Game is paused" :
                   game?.status === "completed" ? "⚠️ Round is complete" : "⚠️ Unknown state"}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400 block mb-1">Username</label>
                <input
                  type="text"
                  placeholder="test_player"
                  value={simUsername}
                  onChange={(e) => setSimUsername(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Quick A/B/C/D buttons — these directly call sendAnswer */}
              <div>
                <label className="text-sm text-gray-400 block mb-2">Click to answer:</label>
                <div className="grid grid-cols-4 gap-3">
                  {["A", "B", "C", "D"].map((letter) => (
                    <button
                      key={letter}
                      onClick={() => sendAnswer(simUsername, letter)}
                      disabled={!simUsername || game?.status !== "question"}
                      className={`btn-neon text-2xl py-4 font-black ${
                        !simUsername || game?.status !== "question"
                          ? "bg-slate-700 text-gray-600 cursor-not-allowed"
                          : letter === "A" ? "btn-neon-blue"
                          : letter === "B" ? "btn-neon-pink"
                          : letter === "C" ? "btn-neon-gold"
                          : "btn-neon-green"
                      }`}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Manual text input */}
              <div className="pt-3 border-t border-slate-700">
                <label className="text-sm text-gray-400 block mb-1">Or type manually:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="A, B, C, or D"
                    value={simMessage}
                    onChange={(e) => setSimMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendAnswer(simUsername, simMessage);
                        setSimMessage("");
                      }
                    }}
                    className="flex-1"
                  />
                  <button
                    onClick={() => {
                      sendAnswer(simUsername, simMessage);
                      setSimMessage("");
                    }}
                    className="btn-neon btn-neon-blue"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
