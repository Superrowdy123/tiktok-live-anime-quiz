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

  useEffect(() => {
    if (!game || !prevGame) return;

    if (game.winner && game.winner !== prevGame.winner) {
      setShowWinner(true);
      addMascotMsg(`✅ ${game.winnerDisplayName} answered ${game.correctAnswer} first!`);
      spawnConfetti();
      setTimeout(() => setShowWinner(false), 5000);
    }

    if (game.status === "completed" && prevGame.status !== "completed") {
      setShowVictory(true);
      spawnConfetti();
      spawnConfetti();
    }

    if (game.currentQuestion?.id !== prevGame.currentQuestion?.id && game.currentQuestion) {
      setShowWinner(false);
      const qNum = game.questionsAsked;
      if (qNum === 1) addMascotMsg("📗 EASY ROUND — 10 pts each!");
      else if (qNum === 11) addMascotMsg("📙 MEDIUM ROUND — 20 pts each!");
      else if (qNum === 21) addMascotMsg("📕 HARD ROUND — 30 pts each! 🔥");
    }
  }, [game, prevGame]);

  const addMascotMsg = (text: string) => {
    const id = ++msgIdRef.current;
    setMascotMessages((prev) => [...prev.slice(-2), { text, id }]);
    setTimeout(() => {
      setMascotMessages((prev) => prev.filter((m) => m.id !== id));
    }, 6000);
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

  const optionColors = [
    { bg: "bg-cyan-600", border: "border-cyan-400", label: "bg-cyan-500" },
    { bg: "bg-pink-600", border: "border-pink-400", label: "bg-pink-500" },
    { bg: "bg-amber-600", border: "border-amber-400", label: "bg-amber-500" },
    { bg: "bg-emerald-600", border: "border-emerald-400", label: "bg-emerald-500" },
  ];

  if (!game) return null;

  const totalAnswers = game.answerDistribution
    ? game.answerDistribution.A + game.answerDistribution.B + game.answerDistribution.C + game.answerDistribution.D
    : 0;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a0a1a]">
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
            width: "12px",
            height: "12px",
          }}
        />
      ))}

      {/* ═══════════════════════════════════════════ */}
      {/* WAITING SCREEN */}
      {/* ═══════════════════════════════════════════ */}
      {game.status === "waiting" && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-purple-950 via-[#0a0a1a] to-[#0a0a1a]">
          <div className="text-center px-6 animate-fade-in">
            <div className="text-8xl md:text-9xl mb-6 animate-float">🎮</div>
            <h1
              className="text-5xl md:text-7xl font-black neon-text mb-3"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              ANIME WIZ
            </h1>
            <p
              className="text-2xl md:text-3xl text-purple-300 neon-text-purple mb-8"
              style={{ fontFamily: "Orbitron" }}
            >
              LIVE ARENA
            </p>
            <div className="animate-pulse">
              <p className="text-xl md:text-2xl text-gray-300 mb-2">
                ⏳ Waiting for round to start...
              </p>
              <p className="text-lg text-cyan-400">
                Answer with <span className="font-black text-pink-400 text-2xl">A B C D</span> in chat!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* ACTIVE GAME */}
      {/* ═══════════════════════════════════════════ */}
      {(game.status === "active" || game.status === "question" || game.status === "revealing" || game.status === "paused") && (
        <div className="absolute inset-0 flex flex-col">
          {/* ── Top Bar ── */}
          <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-3xl md:text-4xl animate-float">🎮</span>
              <div>
                <h1
                  className="text-lg md:text-2xl font-black neon-text leading-tight"
                  style={{ fontFamily: "Orbitron" }}
                >
                  ANIME WIZ
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <div className="glass-card neon-border-gold px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
                <span className="text-yellow-300 font-black text-sm md:text-lg" style={{ fontFamily: "Orbitron" }}>
                  R{game.currentRound}
                </span>
              </div>
              <div className="glass-card neon-border px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
                <span className="text-white font-bold text-sm md:text-lg">
                  {game.questionsAsked}<span className="text-gray-500">/{game.totalQuestions}</span>
                </span>
              </div>
              <div className="glass-card neon-border px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
                <span className="text-cyan-300 font-bold text-sm md:text-lg">
                  👥 {game.totalPlayers}
                </span>
              </div>
            </div>
          </div>

          {/* ── Main Area ── */}
          <div className="flex-1 flex flex-col lg:flex-row gap-3 px-4 md:px-6 pb-3 md:pb-4 overflow-hidden">
            {/* ── Question Panel ── */}
            <div className="flex-1 flex flex-col min-h-0">
              {game.currentQuestion ? (
                <div
                  className="glass-card neon-border flex-1 flex flex-col p-4 md:p-6 lg:p-8 animate-scale-in overflow-hidden"
                  key={game.currentQuestion.id}
                >
                  {/* Difficulty + Timer Row */}
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    {/* Difficulty Badge */}
                    <div className={`px-4 py-1.5 md:px-5 md:py-2 rounded-full font-black text-sm md:text-lg uppercase tracking-wider ${
                      game.currentQuestion.difficulty === "easy"
                        ? "bg-cyan-500/30 text-cyan-300 border-2 border-cyan-500/60"
                        : game.currentQuestion.difficulty === "medium"
                        ? "bg-yellow-500/30 text-yellow-300 border-2 border-yellow-500/60"
                        : "bg-orange-500/30 text-orange-300 border-2 border-orange-500/60"
                    }`} style={{ fontFamily: "Orbitron" }}>
                      {game.currentQuestion.difficulty === "easy" ? "EASY • 10pts" :
                       game.currentQuestion.difficulty === "medium" ? "MEDIUM • 20pts" : "HARD • 30pts"}
                    </div>

                    {/* Timer */}
                    <div className={`flex items-center gap-2 px-4 py-2 md:px-5 md:py-2 rounded-full font-black ${
                      game.timeRemaining <= 5
                        ? "bg-red-500/30 text-red-300 border-2 border-red-500/60 animate-pulse"
                        : game.timeRemaining <= 10
                        ? "bg-yellow-500/30 text-yellow-300 border-2 border-yellow-500/60"
                        : "bg-slate-700/50 text-cyan-300 border-2 border-cyan-500/40"
                    }`}>
                      <span className="text-xl md:text-3xl" style={{ fontFamily: "Orbitron" }}>
                        {game.timeRemaining}
                      </span>
                      <span className="text-xs md:text-sm opacity-60">SEC</span>
                    </div>
                  </div>

                  {/* Timer Bar */}
                  <div className="w-full bg-slate-800/60 rounded-full h-2 md:h-3 mb-4 md:mb-6">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        game.timeRemaining <= 5 ? "bg-gradient-to-r from-red-600 to-red-400" :
                        game.timeRemaining <= 10 ? "bg-gradient-to-r from-yellow-600 to-yellow-400" :
                        "bg-gradient-to-r from-cyan-600 to-cyan-400"
                      }`}
                      style={{ width: `${(game.timeRemaining / game.currentQuestion.timeLimit) * 100}%` }}
                    />
                  </div>

                  {/* Question Text */}
                  <div className="flex-shrink-0 mb-4 md:mb-6">
                    <p className="text-xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-snug">
                      {game.currentQuestion.question}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 lg:gap-4 auto-rows-fr min-h-0">
                    {game.currentQuestion.options.map((opt, i) => {
                      const letter = String.fromCharCode(65 + i);
                      const color = optionColors[i];
                      const isCorrect = game.correctAnswer === letter;
                      const isWrong = game.correctAnswer && game.correctAnswer !== letter;
                      const answerCount = game.answerDistribution?.[letter as "A"|"B"|"C"|"D"] || 0;
                      const percentage = totalAnswers > 0 ? Math.round((answerCount / totalAnswers) * 100) : 0;

                      return (
                        <div
                          key={i}
                          className={`relative flex items-center gap-3 md:gap-4 p-3 md:p-4 lg:p-5 rounded-xl md:rounded-2xl border-2 transition-all overflow-hidden ${
                            isCorrect
                              ? "border-green-400 bg-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                              : isWrong
                              ? "border-gray-700 bg-gray-800/50 opacity-50"
                              : `${color.border} ${color.bg}/20`
                          }`}
                        >
                          {/* Distribution Bar */}
                          {game.status === "revealing" && totalAnswers > 0 && (
                            <div
                              className={`absolute left-0 top-0 bottom-0 transition-all duration-700 ${
                                isCorrect ? "bg-green-500/25" : "bg-slate-500/15"
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          )}

                          {/* Letter Badge */}
                          <div
                            className={`relative z-10 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-xl md:text-3xl text-white shrink-0 ${
                              isCorrect ? "bg-green-500" : isWrong ? "bg-gray-700" : color.label
                            }`}
                          >
                            {letter}
                          </div>

                          {/* Option Text */}
                          <span className={`relative z-10 font-semibold text-base md:text-xl lg:text-2xl leading-tight ${
                            isCorrect ? "text-green-200" : isWrong ? "text-gray-500" : "text-white"
                          }`}>
                            {opt.replace(/^[A-D]\)\s*/, "")}
                          </span>

                          {/* Percentage */}
                          {game.status === "revealing" && totalAnswers > 0 && (
                            <span className="relative z-10 ml-auto text-lg md:text-2xl font-black opacity-70 shrink-0">
                              {percentage}%
                            </span>
                          )}

                          {/* Correct Checkmark */}
                          {isCorrect && (
                            <span className="relative z-10 ml-auto text-3xl md:text-4xl animate-bounce-in shrink-0">✅</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Answer Reveal Bar */}
                  {game.status === "revealing" && game.correctAnswer && (
                    <div className="mt-3 md:mt-4 animate-slide-in-up">
                      <div className="bg-green-500/15 border-2 border-green-500/40 rounded-xl md:rounded-2xl p-3 md:p-5 text-center">
                        {game.winnerDisplayName ? (
                          <div>
                            <p className="text-xl md:text-3xl font-black text-yellow-300" style={{ fontFamily: "Orbitron" }}>
                              🏆 {game.winnerDisplayName}
                            </p>
                            <p className="text-sm md:text-lg text-green-400 mt-1">
                              answered <span className="font-black text-xl md:text-2xl">{game.correctAnswer}</span> first!
                            </p>
                            {game.correctAnswerers && game.correctAnswerers.length > 1 && (
                              <p className="text-xs md:text-sm text-gray-400 mt-1">
                                +{game.correctAnswerers.length - 1} also correct
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-lg md:text-2xl text-gray-400">
                            ⏰ Nobody answered! It was <span className="text-green-400 font-black">{game.correctAnswer}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="glass-card neon-border flex-1 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="text-7xl md:text-8xl mb-6 animate-float">⚡</div>
                    <p
                      className="text-3xl md:text-4xl text-purple-300 neon-text-purple font-black"
                      style={{ fontFamily: "Orbitron" }}
                    >
                      GET READY!
                    </p>
                    <p className="text-lg md:text-xl text-gray-400 mt-3">
                      Next question incoming...
                    </p>
                  </div>
                </div>
              )}

              {/* Mascot */}
              <div className="mt-2 md:mt-3 space-y-2 min-h-[50px]">
                {mascotMessages.map((msg) => (
                  <div key={msg.id} className="flex items-center gap-3 animate-slide-in-left">
                    <div className="text-3xl md:text-4xl animate-float shrink-0">🧙</div>
                    <div className="glass-card neon-border-pink px-4 py-2 md:px-5 md:py-3 rounded-xl flex-1">
                      <p className="text-sm md:text-lg font-semibold text-gray-200">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Leaderboard ── (hidden on very small screens, shown on md+) */}
            <div className="hidden lg:flex w-80 xl:w-96 flex-col gap-3">
              <div className="glass-card neon-border-gold p-4 xl:p-5 flex-1 overflow-hidden flex flex-col">
                <h2
                  className="text-lg xl:text-xl font-black text-yellow-300 mb-4 text-center"
                  style={{ fontFamily: "Orbitron" }}
                >
                  🏆 LEADERBOARD
                </h2>
                <div className="space-y-2 overflow-y-auto flex-1">
                  {game.leaderboard.length > 0 ? (
                    game.leaderboard.map((p) => (
                      <div
                        key={p.username}
                        className={`flex items-center gap-3 p-2.5 xl:p-3 rounded-xl transition-all ${
                          p.rank <= 3
                            ? "bg-gradient-to-r from-yellow-500/15 to-transparent"
                            : "bg-slate-800/30"
                        } ${p.streak >= 5 ? "ring-2 ring-orange-500/50" : ""}`}
                      >
                        <div
                          className={`w-9 h-9 xl:w-10 xl:h-10 rounded-full flex items-center justify-center text-sm xl:text-base font-black ${
                            p.rank === 1 ? "rank-1" :
                            p.rank === 2 ? "rank-2" :
                            p.rank === 3 ? "rank-3" :
                            "bg-slate-700 text-gray-500"
                          }`}
                        >
                          {p.rank}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="text-base xl:text-lg font-bold text-white truncate">{p.displayName}</span>
                            {p.streak >= 3 && (
                              <span className="text-orange-400 animate-pulse shrink-0">
                                {"🔥".repeat(Math.min(3, Math.floor(p.streak / 3)))}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">{p.title}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-black text-yellow-300 text-lg xl:text-xl">{p.points}</div>
                          {p.streak >= 3 && (
                            <div className="text-xs text-orange-400">{p.streak}x streak</div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 text-base">No players yet!</p>
                      <p className="text-cyan-400 text-lg font-bold mt-2">Type A B C D in chat!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="glass-card neon-border p-3 xl:p-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-gray-500 text-xs">Answers</div>
                    <div className="text-cyan-400 font-black text-lg">{game.stats.totalAnswers}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Accuracy</div>
                    <div className="text-green-400 font-black text-lg">
                      {game.stats.totalAnswers > 0 ? Math.round((game.stats.correctAnswers / game.stats.totalAnswers) * 100) : 0}%
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Fastest</div>
                    <div className="text-orange-400 font-black text-lg">
                      {game.stats.fastestAnswer ? `${game.stats.fastestAnswer.toFixed(1)}s` : "-"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom Bar ── */}
          <div className="px-4 pb-3 md:px-6 md:pb-4">
            {/* Mobile Leaderboard (top 3 only) — shown below lg */}
            <div className="lg:hidden mb-2">
              {game.leaderboard.length > 0 && (
                <div className="glass-card neon-border-gold px-4 py-2 rounded-xl flex items-center justify-center gap-4">
                  {game.leaderboard.slice(0, 3).map((p) => (
                    <div key={p.username} className="flex items-center gap-2">
                      <span className="text-base">
                        {p.rank === 1 ? "🥇" : p.rank === 2 ? "🥈" : "🥉"}
                      </span>
                      <span className="text-sm font-bold text-white truncate max-w-[80px]">{p.displayName}</span>
                      <span className="text-sm font-black text-yellow-300">{p.points}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="glass-card neon-border px-4 py-2.5 md:px-6 md:py-3 rounded-xl text-center">
              <p className="text-base md:text-xl lg:text-2xl text-gray-200 font-semibold">
                💬 Type{" "}
                <span className="inline-flex gap-1.5 md:gap-2 mx-1">
                  <span className="bg-cyan-600 text-white font-black px-2.5 py-0.5 md:px-3 md:py-1 rounded-lg text-base md:text-xl">A</span>
                  <span className="bg-pink-600 text-white font-black px-2.5 py-0.5 md:px-3 md:py-1 rounded-lg text-base md:text-xl">B</span>
                  <span className="bg-amber-600 text-white font-black px-2.5 py-0.5 md:px-3 md:py-1 rounded-lg text-base md:text-xl">C</span>
                  <span className="bg-emerald-600 text-white font-black px-2.5 py-0.5 md:px-3 md:py-1 rounded-lg text-base md:text-xl">D</span>
                </span>
                {" "}in chat to answer!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* WINNER POPUP */}
      {/* ═══════════════════════════════════════════ */}
      {showWinner && game?.winnerDisplayName && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="animate-bounce-in text-center mx-6">
            <div className="glass-card neon-border-gold p-8 md:p-12 rounded-3xl max-w-lg">
              <div className="text-6xl md:text-8xl mb-4">🎉</div>
              <p
                className="text-3xl md:text-5xl font-black text-yellow-300 neon-text-gold"
                style={{ fontFamily: "Orbitron" }}
              >
                {game.winnerDisplayName}
              </p>
              <p className="text-xl md:text-2xl text-green-400 mt-3 font-bold">
                Answered {game.correctAnswer} first! 🏆
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* VICTORY SCREEN */}
      {/* ═══════════════════════════════════════════ */}
      {showVictory && game?.status === "completed" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-50 victory-screen">
          <div className="text-center animate-scale-in max-w-2xl w-full mx-4">
            <div className="glass-card neon-border-gold p-8 md:p-12 rounded-3xl">
              <h1
                className="text-3xl md:text-5xl font-black text-yellow-300 neon-text-gold mb-2"
                style={{ fontFamily: "Orbitron" }}
              >
                🏆 ROUND {game.currentRound} 🏆
              </h1>
              <p className="text-lg md:text-xl text-gray-400 mb-8">COMPLETE!</p>

              <div className="flex items-end justify-center gap-4 md:gap-8 mb-8">
                {/* 2nd */}
                {game.leaderboard[1] && (
                  <div className="text-center">
                    <div className="text-4xl md:text-6xl trophy-2">🥈</div>
                    <div className="glass-card p-3 md:p-4 rounded-xl mt-2" style={{ minWidth: 100 }}>
                      <p className="font-bold text-gray-200 text-sm md:text-lg truncate">{game.leaderboard[1].displayName}</p>
                      <p className="text-xl md:text-2xl font-black text-gray-300">{game.leaderboard[1].points}</p>
                    </div>
                  </div>
                )}
                {/* 1st */}
                {game.leaderboard[0] && (
                  <div className="text-center -mt-4">
                    <div className="text-5xl md:text-7xl trophy-1">🥇</div>
                    <div className="glass-card neon-border-gold p-4 md:p-6 rounded-xl mt-2" style={{ minWidth: 140 }}>
                      <p
                        className="font-black text-yellow-300 text-lg md:text-2xl truncate"
                        style={{ fontFamily: "Orbitron" }}
                      >
                        {game.leaderboard[0].displayName}
                      </p>
                      <p className="text-3xl md:text-4xl font-black text-yellow-400 neon-text-gold">
                        {game.leaderboard[0].points}
                      </p>
                      <p className="text-xs md:text-sm text-purple-300 mt-1">{game.leaderboard[0].title}</p>
                    </div>
                  </div>
                )}
                {/* 3rd */}
                {game.leaderboard[2] && (
                  <div className="text-center">
                    <div className="text-3xl md:text-5xl trophy-3">🥉</div>
                    <div className="glass-card p-3 md:p-4 rounded-xl mt-2" style={{ minWidth: 100 }}>
                      <p className="font-bold text-gray-200 text-sm md:text-lg truncate">{game.leaderboard[2].displayName}</p>
                      <p className="text-xl md:text-2xl font-black text-orange-300">{game.leaderboard[2].points}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2 md:gap-4 text-center mb-4">
                <div>
                  <p className="text-xs text-gray-500">Players</p>
                  <p className="text-lg md:text-2xl font-black text-cyan-400">{game.stats.totalPlayers}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Questions</p>
                  <p className="text-lg md:text-2xl font-black text-purple-400">{game.stats.questionsAnswered}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Accuracy</p>
                  <p className="text-lg md:text-2xl font-black text-green-400">
                    {game.stats.totalAnswers > 0 ? `${Math.round((game.stats.correctAnswers / game.stats.totalAnswers) * 100)}%` : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Fastest</p>
                  <p className="text-lg md:text-2xl font-black text-orange-400">
                    {game.stats.fastestAnswer ? `${game.stats.fastestAnswer.toFixed(1)}s` : "N/A"}
                  </p>
                </div>
              </div>

              <p className="text-base md:text-lg text-gray-400 mt-4">GG! Thanks for playing! 🎮</p>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* PAUSED */}
      {/* ═══════════════════════════════════════════ */}
      {game.status === "paused" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-40">
          <div className="animate-pulse text-center">
            <div className="text-7xl md:text-9xl mb-4">⏸️</div>
            <p
              className="text-4xl md:text-5xl font-black text-yellow-300 neon-text-gold"
              style={{ fontFamily: "Orbitron" }}
            >
              PAUSED
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
