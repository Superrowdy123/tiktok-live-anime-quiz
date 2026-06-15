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
  currentRound: number;
  totalRounds: number;
  answerDistribution: { A: number; B: number; C: number; D: number };
  correctAnswerers: { username: string; displayName: string; time: number }[];
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
}

interface MascotMsg {
  text: string;
  id: number;
}

export default function OverlayPage() {
  const [game, setGame] = useState<GameData | null>(null);
  const [prevGame, setPrevGame] = useState<GameData | null>(null);
  const [mascotMessages, setMascotMessages] = useState<MascotMsg[]>([]);
  const [confetti, setConfetti] = useState<{ id: number; color: string; left: number; delay: number }[]>([]);
  const [showWinner, setShowWinner] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundIndicator, setSoundIndicator] = useState<string | null>(null);
  const msgIdRef = useRef(0);
  const pollRef = useRef<ReturnType<typeof setInterval>>(null);

  const fetchGame = useCallback(async () => {
    try {
      const res = await fetch("/api/game");
      const data: GameData = await res.json();
      setPrevGame(game);
      setGame(data);
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchGame();
    pollRef.current = setInterval(fetchGame, 400);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [fetchGame]);

  // Detect state changes for animations
  useEffect(() => {
    if (!game || !prevGame) return;

    // New winner detected
    if (game.winner && game.winner !== prevGame.winner) {
      setShowWinner(true);
      addMascotMsg(`✅ ${game.winnerDisplayName} answered ${game.correctAnswer} first!`);
      showSound("🎵 Correct!");
      spawnConfetti();
      setTimeout(() => setShowWinner(false), 4000);
    }

    // Game complete
    if (game.status === "completed" && prevGame.status !== "completed") {
      setShowVictory(true);
      showSound("🏆 Victory!");
      spawnConfetti();
      spawnConfetti();
    }

    // Time warning
    if (game.timeRemaining === 10 && prevGame.timeRemaining === 11) {
      showSound("⏰ 10 seconds!");
    }

    // New question - announce difficulty phase
    if (game.currentQuestion?.id !== prevGame.currentQuestion?.id && game.currentQuestion) {
      setShowWinner(false);
      showSound("❓ New Question");
      const qNum = game.questionsAsked;
      if (qNum === 1) {
        addMascotMsg("📗 EASY ROUND — 10 questions, 10 points each!");
      } else if (qNum === 11) {
        addMascotMsg("📙 MEDIUM ROUND — 10 questions, 20 points each!");
      } else if (qNum === 21) {
        addMascotMsg("📕 HARD ROUND — 10 questions, 30 points each!");
      }
    }

    // Check for streak messages
    if (game.leaderboard && prevGame.leaderboard) {
      for (const player of game.leaderboard) {
        const prev = prevGame.leaderboard.find(p => p.username === player.username);
        if (prev && player.streak > prev.streak) {
          if (player.streak === 5) {
            addMascotMsg(`🔥🔥 ${player.displayName} is ON FIRE! 5-streak!`);
            showSound("🔥 5 Streak!");
          } else if (player.streak === 10) {
            addMascotMsg(`🔥🔥🔥 LEGENDARY! ${player.displayName} with 10 in a row!`);
            showSound("👑 LEGENDARY!");
          }
        }
      }
    }
  }, [game, prevGame]);

  const addMascotMsg = (text: string) => {
    const id = ++msgIdRef.current;
    setMascotMessages((prev) => [...prev.slice(-4), { text, id }]);
    setTimeout(() => {
      setMascotMessages((prev) => prev.filter((m) => m.id !== id));
    }, 6000);
  };

  const showSound = (text: string) => {
    setSoundIndicator(text);
    setTimeout(() => setSoundIndicator(null), 1500);
  };

  const spawnConfetti = () => {
    const colors = ["#ff2d95", "#00d4ff", "#a855f7", "#fbbf24", "#22d3ee", "#ef4444", "#10b981"];
    const particles = Array.from({ length: 40 }, (_, i) => ({
      id: Date.now() + i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setConfetti((prev) => [...prev, ...particles]);
    setTimeout(() => {
      setConfetti((prev) => prev.filter((p) => !particles.find((pp) => pp.id === p.id)));
    }, 5000);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const diffColor = (d: string) => {
    const m: Record<string, string> = { easy: "text-cyan-400", medium: "text-yellow-400", hard: "text-orange-400" };
    return m[d] || "text-gray-400";
  };

  const diffBg = (d: string) => {
    const m: Record<string, string> = {
      easy: "bg-cyan-500/20 border-cyan-500/40",
      medium: "bg-yellow-500/20 border-yellow-500/40",
      hard: "bg-orange-500/20 border-orange-500/40",
    };
    return m[d] || "bg-gray-500/20 border-gray-500/40";
  };

  // Calculate progress through phases
  const getPhaseProgress = () => {
    const q = game?.questionsAsked || 0;
    if (q <= 10) return { phase: "easy", progress: q / 10, label: "Easy" };
    if (q <= 20) return { phase: "medium", progress: (q - 10) / 10, label: "Medium" };
    return { phase: "hard", progress: (q - 20) / 10, label: "Hard" };
  };

  if (!game) return null;

  const phase = getPhaseProgress();
  const totalAnswers = game.answerDistribution ? 
    game.answerDistribution.A + game.answerDistribution.B + game.answerDistribution.C + game.answerDistribution.D : 0;

  return (
    <div className="obs-overlay relative w-screen h-screen overflow-hidden" style={{ background: "transparent" }}>
      {/* Fullscreen Button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-2 right-2 z-50 bg-purple-600/50 hover:bg-purple-600 text-white px-3 py-1 rounded text-xs transition-all"
      >
        {isFullscreen ? "Exit FS" : "Fullscreen"}
      </button>

      {/* Sound Indicator */}
      {soundIndicator && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-in">
          <div className="glass-card neon-border-pink px-6 py-2 rounded-full">
            <span className="text-lg font-bold text-white">{soundIndicator}</span>
          </div>
        </div>
      )}

      {/* Confetti */}
      {confetti.map((p) => (
        <div
          key={p.id}
          className="confetti"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            animationDuration: `${2 + Math.random() * 2}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Waiting Screen */}
      {game.status === "waiting" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <div className="text-6xl mb-4 animate-float">🎮</div>
            <h1 className="text-5xl font-black neon-text mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
              ANIME WIZ
            </h1>
            <p className="text-xl text-purple-300 neon-text-purple" style={{ fontFamily: "Orbitron" }}>
              LIVE ARENA
            </p>
            <p className="text-gray-400 mt-4 text-lg animate-pulse">Waiting for round to start...</p>
            <div className="mt-6 flex justify-center gap-4 text-sm">
              <div className="glass-card neon-border px-4 py-2 rounded-lg">
                <span className="text-cyan-400 font-bold">100</span> <span className="text-gray-400">Rounds</span>
              </div>
              <div className="glass-card neon-border px-4 py-2 rounded-lg">
                <span className="text-pink-400 font-bold">30</span> <span className="text-gray-400">Questions/Round</span>
              </div>
              <div className="glass-card neon-border px-4 py-2 rounded-lg">
                <span className="text-yellow-400 font-bold">A B C D</span> <span className="text-gray-400">to Answer</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Game Layout */}
      {(game.status === "active" || game.status === "question" || game.status === "revealing" || game.status === "paused") && (
        <div className="absolute inset-0 flex flex-col p-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-3 animate-slide-in-down">
            <div className="flex items-center gap-3">
              <div className="text-3xl animate-float">🎮</div>
              <div>
                <h1 className="text-xl font-black neon-text" style={{ fontFamily: "Orbitron" }}>ANIME WIZ</h1>
                <p className="text-[10px] text-purple-400 -mt-1" style={{ fontFamily: "Orbitron" }}>LIVE ARENA</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Phase Progress Bar */}
              <div className="glass-card neon-border px-3 py-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <span className={`font-bold ${phase.phase === "easy" ? "text-cyan-400" : phase.phase === "medium" ? "text-yellow-400" : "text-orange-400"}`}>
                    {phase.label}
                  </span>
                  <div className="w-20 bg-slate-800 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        phase.phase === "easy" ? "bg-cyan-400" : phase.phase === "medium" ? "bg-yellow-400" : "bg-orange-400"
                      }`}
                      style={{ width: `${phase.progress * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="glass-card neon-border-gold px-3 py-1.5 text-sm">
                <span className="text-yellow-300 font-bold">Round {game.currentRound}</span>
              </div>
              <div className="glass-card neon-border px-3 py-1.5 text-sm">
                <span className="text-gray-400">Q</span>
                <span className="text-white font-bold ml-1">{game.questionsAsked}/{game.totalQuestions}</span>
              </div>
              <div className="glass-card neon-border px-3 py-1.5 text-sm">
                <span className="text-gray-400">👥</span>
                <span className="text-cyan-300 font-bold ml-1">{game.totalPlayers}</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex gap-4">
            {/* Question Panel */}
            <div className="flex-1 flex flex-col">
              {game.currentQuestion ? (
                <div className="glass-card p-5 flex-1 flex flex-col neon-border animate-scale-in" key={game.currentQuestion.id}>
                  {/* Question Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`q-type-badge border ${diffBg(game.currentQuestion.difficulty)} ${diffColor(game.currentQuestion.difficulty)}`}>
                        {game.currentQuestion.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">
                        {game.currentQuestion.difficulty === "easy" ? "10 pts" : game.currentQuestion.difficulty === "medium" ? "20 pts" : "30 pts"}
                      </span>
                    </div>
                    {/* Streak indicator for top player */}
                    {game.leaderboard[0]?.streak >= 3 && (
                      <div className="flex items-center gap-1 text-orange-400 animate-pulse">
                        <span className="text-sm">🔥</span>
                        <span className="text-xs font-bold">{game.leaderboard[0].displayName}: {game.leaderboard[0].streak} streak</span>
                      </div>
                    )}
                  </div>

                  {/* Timer */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">TIME</span>
                      <span
                        className={`text-3xl font-black transition-all ${
                          game.timeRemaining <= 5 ? "text-red-400 animate-pulse scale-110" :
                          game.timeRemaining <= 10 ? "text-yellow-400" : "text-cyan-400"
                        }`}
                        style={{ fontFamily: "Orbitron" }}
                      >
                        {game.timeRemaining}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800/60 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          game.timeRemaining <= 5 ? "bg-gradient-to-r from-red-600 to-red-400 animate-pulse" :
                          game.timeRemaining <= 10 ? "bg-gradient-to-r from-yellow-600 to-yellow-400" :
                          "bg-gradient-to-r from-cyan-600 to-cyan-400"
                        }`}
                        style={{ width: `${(game.timeRemaining / game.currentQuestion.timeLimit) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="mb-4 flex-shrink-0">
                    <p className="text-2xl font-bold text-white text-center leading-relaxed">{game.currentQuestion.question}</p>
                  </div>

                  {/* Options Grid */}
                  {game.currentQuestion.options.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 flex-1">
                      {game.currentQuestion.options.map((opt, i) => {
                        const letter = String.fromCharCode(65 + i);
                        const colors = [
                          "border-cyan-500/50 bg-cyan-500/10",
                          "border-pink-500/50 bg-pink-500/10",
                          "border-yellow-500/50 bg-yellow-500/10",
                          "border-green-500/50 bg-green-500/10",
                        ];
                        const isCorrect = game.correctAnswer === letter;
                        const answerCount = game.answerDistribution?.[letter as "A"|"B"|"C"|"D"] || 0;
                        const percentage = totalAnswers > 0 ? Math.round((answerCount / totalAnswers) * 100) : 0;
                        
                        return (
                          <div
                            key={i}
                            className={`relative p-4 rounded-xl border text-lg font-medium transition-all overflow-hidden ${
                              isCorrect
                                ? "border-green-400 bg-green-500/30 text-green-200"
                                : game.correctAnswer
                                ? "border-gray-700 bg-gray-800/30 text-gray-500"
                                : colors[i] + " text-white"
                            }`}
                          >
                            {/* Answer distribution bar (shows after reveal) */}
                            {game.status === "revealing" && totalAnswers > 0 && (
                              <div
                                className={`absolute left-0 top-0 bottom-0 transition-all duration-500 ${
                                  isCorrect ? "bg-green-500/30" : "bg-slate-600/30"
                                }`}
                                style={{ width: `${percentage}%` }}
                              />
                            )}
                            <span className="relative z-10">{opt}</span>
                            {game.status === "revealing" && totalAnswers > 0 && (
                              <span className="relative z-10 ml-2 text-sm opacity-70">({percentage}%)</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Correct Answer Reveal with all answerers */}
                  {game.status === "revealing" && game.correctAnswer && (
                    <div className="mt-4 animate-bounce-in">
                      <div className="bg-green-500/15 border border-green-500/40 rounded-xl p-4">
                        <p className="text-green-400 font-bold text-xl text-center">✅ Correct Answer: {game.correctAnswer}</p>
                        {game.correctAnswerers && game.correctAnswerers.length > 0 && (
                          <div className="mt-2 text-center">
                            <p className="text-yellow-300 text-lg">🏆 {game.correctAnswerers[0].displayName} ({game.correctAnswerers[0].time.toFixed(1)}s)</p>
                            {game.correctAnswerers.length > 1 && (
                              <p className="text-gray-400 text-sm mt-1">
                                +{game.correctAnswerers.length - 1} others: {game.correctAnswerers.slice(1, 4).map(a => a.displayName).join(", ")}
                                {game.correctAnswerers.length > 4 && "..."}
                              </p>
                            )}
                          </div>
                        )}
                        {game.correctAnswerers?.length === 0 && (
                          <p className="text-gray-400 text-sm text-center mt-1">No one answered correctly!</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="glass-card neon-border p-8 flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-4 animate-float">⚡</div>
                    <p className="text-2xl text-purple-300 neon-text-purple" style={{ fontFamily: "Orbitron" }}>GET READY!</p>
                    <p className="text-gray-400 mt-2">Next question coming soon...</p>
                  </div>
                </div>
              )}

              {/* Mascot Messages */}
              <div className="mt-3 space-y-2 min-h-[60px]">
                {mascotMessages.map((msg) => (
                  <div key={msg.id} className="flex items-center gap-3 animate-slide-in-left">
                    <div className="text-2xl animate-float">🧙</div>
                    <div className="mascot-bubble neon-border-pink flex-1">
                      <p className="text-sm text-gray-200">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard Panel */}
            <div className="w-80 flex flex-col animate-slide-in-right">
              <div className="glass-card neon-border-gold p-4 flex-1 overflow-hidden">
                <h2 className="text-sm font-bold text-yellow-300 mb-3 text-center" style={{ fontFamily: "Orbitron" }}>
                  🏆 LEADERBOARD
                </h2>
                <div className="space-y-1.5 overflow-y-auto max-h-[calc(100vh-280px)]">
                  {game.leaderboard.length > 0 ? (
                    game.leaderboard.map((p, idx) => (
                      <div
                        key={p.username}
                        className={`lb-entry flex items-center gap-2 p-2 rounded-lg transition-all ${
                          p.rank <= 3 ? "bg-gradient-to-r from-yellow-500/10 to-transparent" : "bg-slate-800/30"
                        } ${p.streak >= 5 ? "ring-2 ring-orange-500/50" : ""}`}
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            p.rank === 1 ? "rank-1" : p.rank === 2 ? "rank-2" : p.rank === 3 ? "rank-3" : "bg-slate-700 text-gray-500"
                          }`}
                        >
                          {p.rank}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-white truncate">{p.displayName}</span>
                            {p.streak >= 3 && (
                              <span className="text-orange-400 animate-pulse">
                                {"🔥".repeat(Math.min(3, Math.floor(p.streak / 3)))}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-gray-500 truncate">{p.title}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-yellow-300 text-sm">{p.points}</div>
                          {p.streak >= 3 && <div className="text-[10px] text-orange-400">{p.streak}x</div>}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-xs text-center py-4">Type A, B, C, or D to answer!</p>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="glass-card neon-border mt-3 p-3">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <div className="text-gray-500">Answers</div>
                    <div className="text-cyan-400 font-bold">{game.stats.totalAnswers}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Accuracy</div>
                    <div className="text-green-400 font-bold">
                      {game.stats.totalAnswers > 0 ? Math.round((game.stats.correctAnswers / game.stats.totalAnswers) * 100) : 0}%
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Fastest</div>
                    <div className="text-orange-400 font-bold">
                      {game.stats.fastestAnswer ? `${game.stats.fastestAnswer.toFixed(1)}s` : "-"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions Bar */}
          <div className="mt-3 glass-card neon-border px-4 py-2 text-center animate-slide-in-up">
            <p className="text-sm text-gray-300">
              💬 Type <span className="text-cyan-400 font-bold">A</span>, <span className="text-pink-400 font-bold">B</span>, <span className="text-yellow-400 font-bold">C</span>, or <span className="text-green-400 font-bold">D</span> in chat to answer!
              {game.leaderboard[0]?.streak >= 3 && (
                <span className="ml-3 text-orange-400">
                  🔥 {game.leaderboard[0].displayName} is on a {game.leaderboard[0].streak}-streak!
                </span>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Winner Animation Overlay */}
      {showWinner && game?.winnerDisplayName && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="animate-bounce-in text-center">
            <div className="glass-card neon-border-gold p-8 rounded-2xl max-w-md">
              <div className="text-5xl mb-3">🎉</div>
              <p className="text-3xl font-black text-yellow-300 neon-text-gold" style={{ fontFamily: "Orbitron" }}>
                {game.winnerDisplayName}
              </p>
              <p className="text-lg text-green-400 mt-2">Answered {game.correctAnswer} correctly! 🏆</p>
              {game.correctAnswerers && game.correctAnswerers.length > 1 && (
                <p className="text-sm text-gray-400 mt-2">
                  +{game.correctAnswerers.length - 1} others also got it right
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Victory Screen */}
      {showVictory && game?.status === "completed" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-50 victory-screen">
          <div className="text-center animate-scale-in max-w-2xl w-full mx-4">
            <div className="glass-card neon-border-gold p-10 rounded-3xl">
              <h1 className="text-4xl font-black text-yellow-300 neon-text-gold mb-2" style={{ fontFamily: "Orbitron" }}>
                🏆 ROUND {game.currentRound} COMPLETE 🏆
              </h1>
              <p className="text-gray-400 mb-6">30 Questions Finished!</p>

              <div className="flex items-end justify-center gap-6 mb-8">
                {/* 2nd Place */}
                {game.leaderboard[1] && (
                  <div className="text-center">
                    <div className="trophy-2">🥈</div>
                    <div className="glass-card p-3 rounded-xl mt-2" style={{ minWidth: 120 }}>
                      <p className="font-bold text-gray-200 truncate">{game.leaderboard[1].displayName}</p>
                      <p className="text-xl font-black text-gray-300">{game.leaderboard[1].points}</p>
                    </div>
                  </div>
                )}

                {/* 1st Place */}
                {game.leaderboard[0] && (
                  <div className="text-center -mt-4">
                    <div className="trophy-1">🥇</div>
                    <div className="glass-card neon-border-gold p-4 rounded-xl mt-2" style={{ minWidth: 150 }}>
                      <p className="font-black text-yellow-300 text-lg truncate" style={{ fontFamily: "Orbitron" }}>
                        {game.leaderboard[0].displayName}
                      </p>
                      <p className="text-3xl font-black text-yellow-400 neon-text-gold">{game.leaderboard[0].points}</p>
                      <p className="text-xs text-purple-300 mt-1">{game.leaderboard[0].title}</p>
                      {game.leaderboard[0].streak >= 3 && (
                        <p className="text-xs text-orange-400 mt-1">Best Streak: {game.leaderboard[0].streak}🔥</p>
                      )}
                    </div>
                  </div>
                )}

                {/* 3rd Place */}
                {game.leaderboard[2] && (
                  <div className="text-center">
                    <div className="trophy-3">🥉</div>
                    <div className="glass-card p-3 rounded-xl mt-2" style={{ minWidth: 120 }}>
                      <p className="font-bold text-gray-200 truncate">{game.leaderboard[2].displayName}</p>
                      <p className="text-xl font-black text-orange-300">{game.leaderboard[2].points}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-4 gap-3 text-center mb-4">
                <div>
                  <p className="text-xs text-gray-500">Players</p>
                  <p className="text-lg font-bold text-cyan-400">{game.stats.totalPlayers}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Questions</p>
                  <p className="text-lg font-bold text-purple-400">{game.stats.questionsAnswered}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Accuracy</p>
                  <p className="text-lg font-bold text-green-400">
                    {game.stats.totalAnswers > 0 ? `${Math.round((game.stats.correctAnswers / game.stats.totalAnswers) * 100)}%` : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Fastest</p>
                  <p className="text-lg font-bold text-orange-400">
                    {game.stats.fastestAnswer ? `${game.stats.fastestAnswer.toFixed(1)}s` : "N/A"}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-400">Thanks for playing Round {game.currentRound}! 🎮</p>
            </div>
          </div>
        </div>
      )}

      {/* Paused Overlay */}
      {game.status === "paused" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-40">
          <div className="animate-pulse text-center">
            <div className="text-6xl mb-4">⏸️</div>
            <p className="text-3xl font-bold text-yellow-300 neon-text-gold" style={{ fontFamily: "Orbitron" }}>PAUSED</p>
          </div>
        </div>
      )}
    </div>
  );
}
