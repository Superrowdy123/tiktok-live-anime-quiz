"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  playCorrect, playTimeUp, playNewQuestion, playStreak,
  playTickWarning, playCountdownTick, playGameStart,
  playVictory, playPhaseChange, playNewLeader, initAudio,
} from "@/lib/sounds";
import gameStyles from "@/styles/game-ui.module.css";
import overlayStyles from "@/styles/overlays.module.css";

interface ImageQuizSessionData {
  question: {
    id: string; imageUrl: string; quizMode: string;
    correctAnswer: string; options: string[]; correctOptionIndex: number;
    title: string; hint: string; difficulty: string; revealMode: string;
    timeLimit: number; anime: string;
  } | null;
  status: "idle" | "active" | "revealing";
  startTime: number | null;
  timeRemaining: number;
  winners: { username: string; displayName: string; time: number }[];
  answerFeed: { username: string; displayName: string; answer: string; correct: boolean; time: number }[];
  revealProgress: number;
}

interface GameData {
  status: string;
  currentQuestion: {
    id: number; type: string; difficulty: string;
    question: string; options: string[]; answer: string; timeLimit: number;
  } | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  timeRemaining: number;
  leaderboard: {
    rank: number; username: string; displayName: string;
    points: number; streak: number; team: string | null; title: string;
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
    totalPlayers: number; questionsAnswered: number; totalAnswers: number;
    correctAnswers: number; fastestAnswer: number | null;
    fastestPlayer: string | null; mostActivePlayer: string | null; sessionDuration: number;
  };
  powerBattle: {
    id: string; status: string; timeRemaining: number; totalVotes: number;
    fighters: { label: string; name: string; anime: string; stats: Record<string, number>; votes: number; percentage: number }[];
  } | null;
}

interface MascotMsg { text: string; id: number; }
interface FloatingText { id: number; text: string; x: number; y: number; color: string; }

// ─── PARTICLE ───
interface Particle {
  id: number;
  size: number;
  left: number;
  top: number;
  color: string;
  duration: number;
  delay: number;
}

// ─── PHONE FRAME WRAPPER ───
function PhoneFrame({ children }: { children: React.ReactNode }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ["#a855f7", "#ec4899", "#00d4ff", "#fbbf24"];
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: 2 + Math.random() * 3,
        left: Math.random() * 100,
        top: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  return (
    <div className="phone-frame-page">
      {/* Background glow blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="phone-frame-glow-blob-1" />
        <div className="phone-frame-glow-blob-2" />
        <div className="phone-frame-glow-blob-3" />
        {/* Particles */}
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full animate-particle-float"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              background: p.color,
              opacity: 0.3,
              "--float-duration": `${p.duration}s`,
              "--float-delay": `${p.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Phone with outer glow */}
      <div className="relative flex flex-col items-center phone-outer-glow">
        {/* Phone floating animation */}
        <div className="animate-phone-float">
          {/* Phone bezel */}
          <div className="phone-bezel">
            {/* Side buttons */}
            <div className="phone-button-vol-up" />
            <div className="phone-button-vol-down" />
            <div className="phone-button-power" />

            {/* Screen */}
            <div className="phone-screen">
              {/* Dynamic Island */}
              <div className="phone-dynamic-island" />
              {/* Content */}
              <div className="w-full h-full">
                {children}
              </div>
            </div>
          </div>

          {/* Shadow beneath phone */}
          <div className="phone-shadow" />
        </div>
      </div>
    </div>
  );
}

export default function OverlayPage() {
  const [game, setGame] = useState<GameData | null>(null);
  const [prevGame, setPrevGame] = useState<GameData | null>(null);
  const [mascotMessages, setMascotMessages] = useState<MascotMsg[]>([]);
  const [confetti, setConfetti] = useState<{ id: number; color: string; left: number; delay: number }[]>([]);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [showWinner, setShowWinner] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioReady, setAudioReady] = useState(false);
  const [screenFlash, setScreenFlash] = useState<string | null>(null);
  const [shakeScreen, setShakeScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState(false);
  const [showMobileLB, setShowMobileLB] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [arenaData, setArenaData] = useState<any>(null);
  const [imageQuizSession, setImageQuizSession] = useState<ImageQuizSessionData | null>(null);
  const msgIdRef = useRef(0);
  const floatIdRef = useRef(0);
  const pollRef = useRef<ReturnType<typeof setInterval>>(null);
  const prevTimeRef = useRef<number>(0);

  // Detect mobile layout and phone frame from URL param
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setIsMobile(params.has("mobile"));
      setIsPhoneFrame(params.has("phoneframe"));
    }
  }, []);

  const fetchGame = useCallback(async () => {
    try {
      const [gameRes, arenaRes, iqRes] = await Promise.all([
        fetch("/api/game"),
        fetch("/api/game/modes"),
        fetch("/api/new-image-quiz"),
      ]);
      const data: GameData = await gameRes.json();
      const arena = await arenaRes.json();
      const iq = await iqRes.json();
      setGame(prev => { setPrevGame(prev); return data; });
      setArenaData(arena);
      if (iq.session) setImageQuizSession(iq.session);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    fetchGame();
    pollRef.current = setInterval(fetchGame, 400);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [fetchGame]);

  // Enable audio
  useEffect(() => {
    const enableAudio = () => { initAudio(); setAudioReady(true); };
    try {
      const ctx = new AudioContext();
      if (ctx.state === "running") {
        enableAudio(); ctx.close();
      } else {
        ctx.close();
        window.addEventListener("click", enableAudio, { once: true });
        window.addEventListener("keydown", enableAudio, { once: true });
        window.addEventListener("touchstart", enableAudio, { once: true });
        setTimeout(() => { enableAudio(); }, 1000);
      }
    } catch {
      window.addEventListener("click", enableAudio, { once: true });
      window.addEventListener("keydown", enableAudio, { once: true });
      window.addEventListener("touchstart", enableAudio, { once: true });
      setTimeout(() => { enableAudio(); }, 1000);
    }
    return () => {
      window.removeEventListener("click", enableAudio);
      window.removeEventListener("keydown", enableAudio);
      window.removeEventListener("touchstart", enableAudio);
    };
  }, []);

  // React to game state changes
  useEffect(() => {
    if (!game || !prevGame) return;
    const sound = soundEnabled && audioReady;

    if (game.winner && game.winner !== prevGame.winner) {
      setShowWinner(true);
      if (sound) playCorrect();
      addMascotMsg(`🎯 ${game.winnerDisplayName} answered ${game.correctAnswer} first!`);
      spawnConfetti();
      flash("rgba(34,197,94,0.2)");
      addFloatingText(
        `+${game.correctAnswerers?.[0]?.time ? game.correctAnswerers[0].time.toFixed(1) + "s" : ""}`,
        "text-green-400"
      );

      const winner = game.leaderboard.find(p => p.username === game.winner);
      const prevWinner = prevGame.leaderboard.find(p => p.username === game.winner);
      if (winner && prevWinner && winner.streak > prevWinner.streak) {
        if (winner.streak >= 10) {
          if (sound) setTimeout(() => playStreak(), 600);
          addMascotMsg(`🔥 LEGENDARY! ${winner.displayName} — ${winner.streak} streak!`);
          shake();
        } else if (winner.streak >= 5) {
          if (sound) setTimeout(() => playStreak(), 600);
          addMascotMsg(`🔥 ${winner.displayName} is ON FIRE! ${winner.streak}-streak!`);
        } else if (winner.streak >= 3) {
          addMascotMsg(`⚡ ${winner.displayName} — ${winner.streak} in a row!`);
        }
      }

      if (
        game.leaderboard[0]?.username === game.winner &&
        prevGame.leaderboard[0]?.username !== game.winner &&
        game.questionsAsked > 2
      ) {
        if (sound) setTimeout(() => playNewLeader(), 800);
        addMascotMsg(`👑 NEW LEADER: ${game.winnerDisplayName}!`);
      }

      setTimeout(() => setShowWinner(false), 5000);
    }

    if (game.status === "revealing" && prevGame.status === "question" && !game.winner) {
      if (sound) playTimeUp();
      addMascotMsg(`⏰ Nobody got it! Answer: ${game.correctAnswer}`);
      flash("rgba(239,68,68,0.15)");
      shake();
    }

    if (game.status === "active" && prevGame.status === "waiting") {
      if (sound) playGameStart();
    }

    if (game.status === "completed" && prevGame.status !== "completed") {
      setShowVictory(true);
      if (sound) playVictory();
      spawnConfetti(); spawnConfetti(); spawnConfetti();
    }

    if (game.currentQuestion?.id !== prevGame.currentQuestion?.id && game.currentQuestion) {
      setShowWinner(false);
      if (sound) playNewQuestion();
      const qNum = game.questionsAsked;
      if (qNum === 1) {
        addMascotMsg("🟢 EASY ROUND — 10 pts each!");
        if (sound) setTimeout(() => playPhaseChange(), 300);
      } else if (qNum === 11) {
        addMascotMsg("🟡 MEDIUM ROUND — 20 pts each! 🧠");
        if (sound) setTimeout(() => playPhaseChange(), 300);
        flash("rgba(251,191,36,0.15)");
      } else if (qNum === 21) {
        addMascotMsg("🔴 HARD ROUND — 30 pts each! 💀");
        if (sound) setTimeout(() => playPhaseChange(), 300);
        flash("rgba(249,115,22,0.15)");
      }
    }

    if (game.timeRemaining !== prevTimeRef.current) {
      if (game.timeRemaining === 10 && game.status === "question") {
        if (sound) playTickWarning();
      }
      if (game.timeRemaining <= 5 && game.timeRemaining > 0 && game.status === "question") {
        if (sound) playCountdownTick();
      }
      prevTimeRef.current = game.timeRemaining;
    }
  }, [game, prevGame, soundEnabled, audioReady]);

  const addMascotMsg = (text: string) => {
    const id = ++msgIdRef.current;
    setMascotMessages(prev => [...prev.slice(-2), { text, id }]);
    setTimeout(() => setMascotMessages(prev => prev.filter(m => m.id !== id)), 6000);
  };

  const addFloatingText = (text: string, color: string) => {
    const id = ++floatIdRef.current;
    const x = 30 + Math.random() * 40;
    const y = 20 + Math.random() * 30;
    setFloatingTexts(prev => [...prev, { id, text, x, y, color }]);
    setTimeout(() => setFloatingTexts(prev => prev.filter(f => f.id !== id)), 2000);
  };

  const flash = (color: string) => {
    setScreenFlash(color);
    setTimeout(() => setScreenFlash(null), 300);
  };

  const shake = () => {
    setShakeScreen(true);
    setTimeout(() => setShakeScreen(false), 500);
  };

  const spawnConfetti = () => {
    const colors = ["#ff2d95", "#00d4ff", "#a855f7", "#fbbf24", "#22d3ee", "#ef4444", "#10b981"];
    const particles = Array.from({ length: 40 }, (_, i) => ({
      id: Date.now() + i + Math.random() * 1000,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setConfetti(prev => [...prev, ...particles]);
    setTimeout(() => setConfetti(prev => prev.filter(p => !particles.find(pp => pp.id === p.id))), 5000);
  };

  const optionColors = [
    { bg: "bg-cyan-600", border: "border-cyan-400", label: "bg-cyan-500" },
    { bg: "bg-pink-600", border: "border-pink-400", label: "bg-pink-500" },
    { bg: "bg-amber-600", border: "border-amber-400", label: "bg-amber-500" },
    { bg: "bg-emerald-600", border: "border-emerald-400", label: "bg-emerald-500" },
  ];

  const imageQuizActive = imageQuizSession && imageQuizSession.status !== "idle";
  if (!game && !imageQuizActive) return null;

  const totalAnswers = game?.answerDistribution
    ? game.answerDistribution.A + game.answerDistribution.B + game.answerDistribution.C + game.answerDistribution.D
    : 0;

  const m = isMobile || isPhoneFrame;

  // ─── OVERLAY CONTENT ───
  const overlayContent = (
    <div
      className={`relative overflow-hidden ${shakeScreen ? "animate-shake" : ""} ${m ? overlayStyles.mobileLayout : ""}`}
      style={{
        background: "var(--color-bg-deep)",
        width: isPhoneFrame ? "100%" : "100vw",
        height: isPhoneFrame ? "100%" : "100vh",
        paddingTop: m ? "env(safe-area-inset-top, 0px)" : undefined,
        paddingBottom: m ? "env(safe-area-inset-bottom, 0px)" : undefined,
      }}
    >
      {/* Screen Flash */}
      {screenFlash && (
        <div
          className={`absolute inset-0 z-60 ${overlayStyles.screenFlash}`}
          style={{ background: screenFlash }}
        />
      )}

      {/* Floating Texts */}
      {floatingTexts.map(f => (
        <div
          key={f.id}
          className={`absolute z-50 pointer-events-none ${m ? "text-4xl" : "text-3xl"} font-black ${f.color}`}
          style={{ left: `${f.x}%`, top: `${f.y}%`, animation: "floatUp 2s ease-out forwards" }}
        >
          {f.text}
        </div>
      ))}

      {/* Sound Toggle */}
      <button
        onClick={() => { initAudio(); setAudioReady(true); setSoundEnabled(s => !s); }}
        className={`absolute top-3 right-3 z-50 text-white rounded-full flex items-center justify-center border-2 transition-all ${overlayStyles.soundToggle} ${
          m ? "w-12 h-12 text-xl" : "w-12 h-12 md:w-14 md:h-14 text-2xl md:text-3xl"
        } ${
          soundEnabled && audioReady
            ? "border-green-400 text-green-300"
            : "border-red-500/70 text-red-400"
        }`}
        style={{ background: "rgba(10,5,30,0.85)", backdropFilter: "blur(8px)" }}
      >
        {soundEnabled ? "🔊" : "🔇"}
      </button>

      {/* Click to enable audio */}
      {!audioReady && game?.status !== "waiting" && (
        <div className="absolute top-14 right-3 z-50 animate-bounce-in">
          <button
            onClick={() => { initAudio(); setAudioReady(true); }}
            className="glass-card neon-border-pink px-4 py-2 rounded-xl text-sm text-pink-300 hover:text-white transition-all animate-pulse"
          >
            🔊 Click for sound!
          </button>
        </div>
      )}

      {/* Confetti */}
      {confetti.map(p => (
        <div
          key={p.id}
          className={`confetti ${overlayStyles.confettiParticle}`}
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

      {/* WAITING SCREEN */}
      {game?.status === "waiting" && (
        <div className={`absolute inset-0 flex items-center justify-center ${gameStyles.waitingScreen}`}>
          <div className="text-center px-6 animate-fade-in">
            <div className={`${m ? "text-7xl mb-4" : "text-8xl md:text-9xl mb-6"} animate-float`}>🎮</div>
            <h1
              className={`${m ? "text-4xl" : "text-5xl md:text-7xl"} font-black neon-text mb-1 ${gameStyles.titleDisplay}`}
              style={{ fontFamily: "Orbitron" }}
            >
              ANIME WIZ
            </h1>
            <p
              className={`${m ? "text-xl" : "text-2xl md:text-3xl"} text-purple-300 neon-text-purple mb-4 md:mb-8`}
              style={{ fontFamily: "Orbitron" }}
            >
              LIVE ARENA
            </p>
            <div className="animate-pulse">
              <p className={`${m ? "text-lg" : "text-xl md:text-2xl"} text-gray-300 mb-2`}>
                ⏳ Waiting for round to start...
              </p>
              <p className={`${m ? "text-base" : "text-lg"} text-cyan-400`}>
                Answer with{" "}
                <span className={`font-black text-pink-400 ${m ? "text-xl" : "text-2xl"}`}>A B C D</span>
                {" "}in chat!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVE GAME */}
      {((game && (
        game.status === "active" ||
        game.status === "question" ||
        game.status === "revealing" ||
        game.status === "paused"
      )) || (imageQuizSession && imageQuizSession.status !== "idle" && imageQuizSession.question)) && (
        <div className="absolute inset-0 flex flex-col">

          {/* Top Bar */}
          {game && (
            <div className={`flex items-center justify-between bg-linear-to-b from-black/80 to-transparent ${gameStyles.topBar} ${m ? "px-3 py-2" : "px-4 py-3 md:px-6 md:py-4"}`}>
              <div className="flex items-center gap-1 md:gap-3">
                <span className={`${m ? "text-2xl" : "text-3xl md:text-4xl"} animate-float`}>🎮</span>
                <h1
                  className={`${m ? "text-base" : "text-lg md:text-2xl"} font-black neon-text leading-tight`}
                  style={{ fontFamily: "Orbitron" }}
                >
                  ANIME WIZ
                </h1>
              </div>
              <div className="flex items-center gap-1 md:gap-3">
                <div className="glass-card neon-border-gold px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
                  <span className="text-yellow-300 font-black text-sm md:text-lg" style={{ fontFamily: "Orbitron" }}>
                    R{game.currentRound}
                  </span>
                </div>
                <div className="glass-card neon-border px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
                  <span className="text-white font-bold text-sm md:text-lg">
                    {game.questionsAsked}
                    <span className="text-gray-500">/{game.totalQuestions}</span>
                  </span>
                </div>
                <div className="glass-card neon-border px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
                  <span className="text-cyan-300 font-bold text-sm md:text-lg">👥 {game.totalPlayers}</span>
                </div>
                {m && game.leaderboard.length > 0 && (
                  <button
                    onClick={() => setShowMobileLB(o => !o)}
                    className="glass-card px-2.5 py-1.5 rounded-lg text-base border border-yellow-500/50 text-yellow-300 font-bold"
                  >
                    🏆
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className={`flex-1 flex flex-col lg:flex-row gap-3 overflow-hidden ${m ? "px-2 pb-2" : "px-4 md:px-6 pb-3 md:pb-4"}`}>

            {/* IMAGE QUIZ MODE */}
            {imageQuizSession && imageQuizSession.status !== "idle" && imageQuizSession.question && (
              <NewImageQuizOverlay session={imageQuizSession} isMobile={m} />
            )}

            {/* ARENA MODE */}
            {arenaData && (arenaData.status === "voting" || arenaData.status === "event") && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className={`glass-card neon-border flex-1 flex flex-col animate-scale-in overflow-hidden ${m ? "p-2" : "p-4 md:p-6"}`}>

                  {/* Arena Header */}
                  <div className={`flex items-center justify-between ${m ? "mb-2" : "mb-4"}`}>
                    <div className="flex items-center gap-1 md:gap-3">
                      <div className={`rounded-full font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 ${m ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm md:text-lg"}`}>
                        {arenaData.modeState?.mode === "hot_take" ? "HOT TAKE" :
                          arenaData.modeState?.mode === "tier_list" ? "TIER LIST" :
                            arenaData.modeState?.mode === "tournament"
                              ? `TOURNAMENT R${(arenaData.modeState?.tournament?.round || 0) + 1}` :
                              arenaData.modeState?.mode === "who_wins" ? "WHO WINS?" :
                                arenaData.mode === "boss_raid" ? `BOSS RAID: ${arenaData.bossName}` :
                                  arenaData.mode === "tug_of_war" ? "TUG OF WAR" : "VOTE"}
                      </div>
                      {arenaData.activeEvent?.active && (
                        <div className={`rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 font-bold animate-pulse ${m ? "px-2 py-1 text-[10px]" : "px-3 py-1 text-xs"}`}>
                          {arenaData.activeEvent.name}
                        </div>
                      )}
                    </div>
                    {arenaData.timeRemaining > 0 ? (
                      <div className={`flex items-center gap-1 rounded-full font-black ${m ? "px-2 py-1" : "px-4 py-2"} ${
                        arenaData.timeRemaining <= 5
                          ? "bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse"
                          : "bg-zinc-800 text-zinc-300 border border-zinc-700"
                      }`}>
                        <span className={m ? "text-2xl" : "text-xl md:text-3xl"}>{arenaData.timeRemaining}</span>
                        <span className={`opacity-60 ${m ? "text-xs" : "text-xs"}`}>SEC</span>
                      </div>
                    ) : (
                      <div className={`rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 font-bold ${m ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"}`}>
                        HOST
                      </div>
                    )}
                  </div>

                  {/* Hot Take */}
                  {arenaData.modeState?.mode === "hot_take" && arenaData.modeState.hotTake && (
                    <div className={`bg-yellow-500/10 border border-yellow-500/20 text-center ${m ? "rounded-lg p-2 mb-2" : "rounded-xl p-4 md:p-6 mb-4"}`}>
                      <p className={`font-bold text-white leading-relaxed ${m ? "text-sm" : "text-lg md:text-2xl lg:text-3xl"}`}>
                        &ldquo;{arenaData.modeState.hotTake.statement}&rdquo;
                      </p>
                      <p className={`text-zinc-500 mt-1 md:mt-2 uppercase ${m ? "text-xs" : "text-xs"}`}>
                        {arenaData.modeState.hotTake.category}
                      </p>
                    </div>
                  )}

                  {/* Tier List */}
                  {arenaData.modeState?.mode === "tier_list" && arenaData.modeState.tierCharacter && (
                    <div className={`bg-purple-500/10 border border-purple-500/20 text-center ${m ? "rounded-lg p-2 mb-2" : "rounded-xl p-4 md:p-6 mb-4"}`}>
                      <p className={`text-zinc-500 uppercase mb-0 md:mb-1 ${m ? "text-xs" : "text-sm"}`}>
                        Where does this character belong?
                      </p>
                      <p className={`font-black text-white ${m ? "text-base" : "text-2xl md:text-4xl"}`}>
                        {arenaData.modeState.tierCharacter.name}
                      </p>
                      <p className={`text-zinc-400 mt-0 md:mt-1 ${m ? "text-xs" : "text-base md:text-lg"}`}>
                        {arenaData.modeState.tierCharacter.anime}
                      </p>
                    </div>
                  )}

                  {/* Tournament */}
                  {arenaData.modeState?.mode === "tournament" && arenaData.modeState.tournament && (
                    <div className={`bg-cyan-500/10 border border-cyan-500/20 text-center ${m ? "rounded-lg p-2 mb-2" : "rounded-xl p-3 mb-4"}`}>
                      <p className={`text-zinc-500 uppercase ${m ? "text-xs" : "text-xs"}`}>Elimination Tournament</p>
                      <p className={`text-zinc-400 ${m ? "text-xs" : "text-sm"}`}>
                        Match {(arenaData.modeState.tournament.round || 0) + 1} of {arenaData.modeState.tournament.bracket?.length || 0}
                      </p>
                    </div>
                  )}

                  {/* Hype Meter */}
                  {arenaData.hypeScore > 0 && (
                    <div className={`flex items-center gap-1 md:gap-2 ${m ? "mb-1.5" : "mb-3"}`}>
                      <span className={`text-gray-500 ${m ? "text-xs" : "text-xs"}`}>HYPE</span>
                      <div className={`flex-1 bg-slate-800/60 rounded-full ${m ? "h-2" : "h-2"}`}>
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            arenaData.hypeLevel === "legendary" ? "bg-linear-to-r from-red-500 to-yellow-400" :
                              arenaData.hypeLevel === "blazing" ? "bg-linear-to-r from-orange-500 to-red-400" :
                                arenaData.hypeLevel === "hot" ? "bg-linear-to-r from-yellow-500 to-orange-400" :
                                  "bg-linear-to-r from-cyan-500 to-blue-400"
                          }`}
                          style={{ width: `${arenaData.hypeScore}%` }}
                        />
                      </div>
                      <span className={`font-bold text-orange-400 ${m ? "text-xs" : "text-xs"}`}>
                        {arenaData.hypeLevel?.toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* Boss Raid HP Bar */}
                  {arenaData.mode === "boss_raid" && (
                    <div className={m ? "mb-2" : "mb-4"}>
                      <div className={`flex justify-between mb-1 ${m ? "text-xs" : "text-sm"}`}>
                        <span className="text-red-400 font-bold">{m ? "👹" : "👹 "}{arenaData.bossName}</span>
                        <span className="text-gray-400">{arenaData.bossHp}/{arenaData.bossMaxHp} HP</span>
                      </div>
                      <div className={`w-full bg-slate-800/60 rounded-full overflow-hidden ${m ? "h-3" : "h-6"}`}>
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            arenaData.bossPhase >= 4
                              ? "bg-linear-to-r from-red-700 to-red-500 animate-pulse"
                              : arenaData.bossPhase >= 3
                                ? "bg-linear-to-r from-orange-600 to-red-500"
                                : "bg-linear-to-r from-green-600 to-yellow-500"
                          }`}
                          style={{ width: `${(arenaData.bossHp / arenaData.bossMaxHp) * 100}%` }}
                        />
                      </div>
                      <div className={`flex justify-between mt-0.5 md:mt-1 ${m ? "text-xs" : "text-xs"}`}>
                        <span className="text-yellow-400">Phase {arenaData.bossPhase}</span>
                        <span className="text-cyan-400">Combo: {arenaData.comboCount}x</span>
                      </div>
                    </div>
                  )}

                  {/* Tug of War */}
                  {arenaData.mode === "tug_of_war" && arenaData.fighters?.length === 2 && (
                    <div className={m ? "mb-2" : "mb-4"}>
                      <div className={`flex justify-between mb-1 ${m ? "text-xs" : "text-sm"}`}>
                        <span className="text-cyan-400 font-bold">{arenaData.fighters[0]?.name}</span>
                        <span className="text-pink-400 font-bold">{arenaData.fighters[1]?.name}</span>
                      </div>
                      <div className={`w-full bg-slate-800/60 rounded-full overflow-hidden relative ${m ? "h-3" : "h-6"}`}>
                        <div className="absolute inset-0 flex">
                          <div
                            className="bg-cyan-500/60 transition-all duration-500"
                            style={{ width: `${50 + arenaData.tugPosition / 2}%` }}
                          />
                          <div className="bg-pink-500/60 flex-1" />
                        </div>
                        <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white/50" />
                      </div>
                    </div>
                  )}

                    <p className={`text-center text-gray-400 ${m ? "mb-1.5 text-xs" : "mb-3 text-sm"}`}>
                      {arenaData.mode === "boss_raid" ? "Type anything to ATTACK!" : "Total votes: "}
                      <span className={`text-white font-bold ${m ? "text-base" : "text-xl"}`}>{arenaData.totalVotes}</span>
                      {arenaData.messagesPerSecond > 0 && (
                        <span className={`text-gray-500 ${m ? "ml-1 text-xs" : "ml-2"}`}>
                          ({arenaData.messagesPerSecond} msg/s)
                        </span>
                      )}
                    </p>

                  {/* Vote Bars */}
                  {arenaData.mode !== "boss_raid" && (
                    <div className={`flex-1 flex flex-col justify-center ${m ? "gap-1.5" : "gap-3"}`}>
                      {(arenaData.fighters || []).map((
                        f: { label: string; name: string; anime: string; votes: number; percentage: number; attacks?: string[] },
                        i: number
                      ) => {
                        const bgColors = ["bg-cyan-500", "bg-pink-500", "bg-amber-500", "bg-emerald-500", "bg-purple-500", "bg-red-500"];
                        const borderColors = ["border-cyan-400", "border-pink-400", "border-amber-400", "border-emerald-400", "border-purple-400", "border-red-400"];
                        const isLeader = (arenaData.fighters || []).every((o: { votes: number }) => f.votes >= o.votes) && f.votes > 0;
                        return (
                          <div
                            key={f.label}
                            className={`rounded-xl border-2 transition-all ${m ? "p-2" : "p-3 md:p-4"} ${borderColors[i] || "border-gray-500"} ${isLeader ? "ring-2 ring-yellow-400/60" : ""}`}
                            style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(4px)" }}
                          >
                            <div className={`flex items-center justify-between ${m ? "mb-1" : "mb-2"}`}>
                              <div className="flex items-center gap-1 md:gap-3">
                                <span className={`rounded-xl flex items-center justify-center font-black text-white ${bgColors[i] || "bg-gray-500"} ${m ? "w-10 h-10 text-lg" : "w-10 h-10 md:w-12 md:h-12 text-xl md:text-2xl"}`}>
                                  {f.label}
                                </span>
                                <div>
                                  <p className={`font-black text-white ${m ? "text-sm" : "text-lg md:text-2xl"}`}>{f.name}</p>
                                  <p className={`text-gray-500 ${m ? "text-xs" : "text-xs"}`}>{f.anime}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className={`font-black text-white ${m ? "text-base" : "text-2xl md:text-3xl"}`}>{f.percentage}%</p>
                                <p className={`text-gray-400 ${m ? "text-xs" : "text-xs"}`}>{f.votes} votes</p>
                              </div>
                            </div>
                            <div className={`w-full bg-slate-700/60 rounded-full overflow-hidden ${m ? "h-2" : "h-4 md:h-5"}`}>
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${bgColors[i] || "bg-gray-500"}`}
                                style={{ width: `${f.percentage}%` }}
                              />
                            </div>
                            <div className="flex justify-between items-center mt-0.5 md:mt-1">
                              {isLeader && (
                                <span className={`text-yellow-400 font-bold ${m ? "text-xs" : "text-xs"}`}>👑 LEADING</span>
                              )}
                              {f.attacks && f.attacks.length > 0 && (
                                <span className={`text-orange-400 ml-auto ${m ? "text-xs" : "text-xs"}`}>
                                  ⚡ {f.attacks[f.attacks.length - 1]}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Attack Log */}
                      {arenaData.attackLog && arenaData.attackLog.length > 0 && (
                    <div className={m ? "mt-1 space-y-0.5" : "mt-2 space-y-1"}>
                      {arenaData.attackLog.map((a: { fighter: string; attack: string }, i: number) => (
                        <div key={i} className={`text-orange-400 animate-slide-in-left ${m ? "text-xs" : "text-xs"}`}>
                          ⚡ {a.fighter}: {a.attack}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Arena Results */}
                  {arenaData.status === "results" && (
                    <div className={`animate-bounce-in text-center ${m ? "mt-2" : "mt-4"}`}>
                      <div className={`bg-yellow-500/15 border-2 border-yellow-500/40 ${m ? "rounded-lg p-2" : "rounded-xl p-4"}`}>
                        {arenaData.mode === "boss_raid" ? (
                          <p className={`font-black text-green-300 ${m ? "text-base" : "text-2xl md:text-3xl"}`} style={{ fontFamily: "Orbitron" }}>
                            {arenaData.bossHp <= 0 ? "✅ BOSS DEFEATED!" : "💀 BOSS SURVIVES!"}
                          </p>
                        ) : (
                          <p className={`font-black text-yellow-300 ${m ? "text-base" : "text-2xl md:text-3xl"}`} style={{ fontFamily: "Orbitron" }}>
                            {[...(arenaData.fighters || [])].sort((a: { votes: number }, b: { votes: number }) => b.votes - a.votes)[0]?.name} WINS!
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Mascot */}
                <div className={`${m ? "mt-1 space-y-1 min-h-8" : "mt-2 space-y-2 min-h-[50px]"}`}>
                  {mascotMessages.map(msg => (
                    <div key={msg.id} className="flex items-center gap-2 md:gap-3 animate-slide-in-left">
                      <div className={`animate-float shrink-0 ${m ? "text-2xl" : "text-3xl"}`}>🦊</div>
                      <div className={`glass-card neon-border-pink rounded-xl flex-1 ${gameStyles.mascotMsg} ${m ? "px-3 py-1.5" : "px-4 py-2 md:px-5 md:py-3"}`}>
                        <p className={`font-semibold text-gray-200 ${m ? "text-sm" : "text-sm md:text-lg"}`}>{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* QUIZ MODE */}
            {game && !imageQuizSession?.question && !(arenaData && (arenaData.status === "voting" || arenaData.status === "event")) && (
              <div className="flex-1 flex flex-col min-h-0">
                {game.currentQuestion ? (
                  <div
                    className={`glass-card neon-border flex-1 flex flex-col animate-scale-in overflow-hidden ${gameStyles.questionCard} ${m ? "p-3" : "p-3 md:p-6 lg:p-8"}`}
                    key={game.currentQuestion.id}
                  >
                    {/* Difficulty + Timer */}
                    <div className={`flex items-center justify-between mb-2 md:mb-6 ${m ? "gap-1" : ""}`}>
                      <div
                        className={`rounded-full font-black uppercase tracking-wider ${gameStyles.diffBadge} ${
                          game.currentQuestion.difficulty === "easy"
                            ? "bg-cyan-500/30 text-cyan-300 border-2 border-cyan-500/60"
                            : game.currentQuestion.difficulty === "medium"
                              ? "bg-yellow-500/30 text-yellow-300 border-2 border-yellow-500/60"
                              : "bg-orange-500/30 text-orange-300 border-2 border-orange-500/60"
                        } ${m ? "px-3 py-1.5 text-sm" : "px-4 py-1.5 md:px-5 md:py-2 text-sm md:text-lg"}`}
                        style={{ fontFamily: "Orbitron" }}
                      >
                        {game.currentQuestion.difficulty === "easy"
                          ? "EASY • 10pts"
                          : game.currentQuestion.difficulty === "medium"
                            ? "MEDIUM • 20pts"
                            : "HARD • 30pts"}
                      </div>
                      <div className={`flex items-center gap-1 rounded-full font-black ${
                        game.timeRemaining <= 5
                          ? "bg-red-500/30 text-red-300 border-2 border-red-500/60 animate-pulse"
                          : game.timeRemaining <= 10
                            ? "bg-yellow-500/30 text-yellow-300 border-2 border-yellow-500/60"
                            : "bg-slate-700/50 text-cyan-300 border-2 border-cyan-500/40"
                      } ${m ? "px-3 py-1.5" : "px-4 py-2 md:px-5"}`}>
                        <span
                          className={`${gameStyles.timerNumber} ${m ? "text-3xl" : "text-xl md:text-3xl"}`}
                          style={{ fontFamily: "Orbitron" }}
                        >
                          {game.timeRemaining}
                        </span>
                        <span className={`opacity-60 ${m ? "text-sm" : "text-xs md:text-sm"}`}>SEC</span>
                      </div>
                    </div>

                    {/* Timer Bar */}
                    <div className={`w-full rounded-full ${gameStyles.timerBarContainer} ${m ? "h-3 mb-3" : "h-2 md:h-3 mb-4 md:mb-6"}`}>
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${gameStyles.timerBarFill} ${
                          game.timeRemaining <= 5
                            ? gameStyles.timerCritical
                            : game.timeRemaining <= 10
                              ? gameStyles.timerWarning
                              : ""
                        }`}
                        style={{ width: `${(game.timeRemaining / game.currentQuestion.timeLimit) * 100}%` }}
                      />
                    </div>

                    {/* Question */}
                    <div className={`shrink-0 ${m ? "mb-3" : "mb-4 md:mb-6"}`}>
                      <p className={`font-black text-white text-center leading-snug ${gameStyles.questionText} ${m ? "text-xl" : "text-xl md:text-3xl lg:text-4xl"}`}>
                        {game.currentQuestion.question}
                      </p>
                    </div>

                    {/* Options */}
                    <div className="flex-1 grid gap-1.5 md:gap-3 lg:gap-4 auto-rows-fr min-h-0 grid-cols-1 md:grid-cols-2">
                      {game.currentQuestion.options.map((opt, i) => {
                        const letter = String.fromCharCode(65 + i);
                        const isCorrect = game.correctAnswer === letter;
                        const isWrong = game.correctAnswer && game.correctAnswer !== letter;
                        const answerCount = game.answerDistribution?.[letter as "A" | "B" | "C" | "D"] || 0;
                        const pct = totalAnswers > 0 ? Math.round((answerCount / totalAnswers) * 100) : 0;

                        return (
                          <div
                            key={i}
                            className={`relative flex items-center gap-2 md:gap-4 transition-all overflow-hidden ${gameStyles.answerOption} ${
                              isCorrect ? gameStyles.answerCorrect : isWrong ? gameStyles.answerWrong : ""
                            } ${m ? "p-3 min-h-16" : "p-3 md:p-4 lg:p-5"}`}
                          >
                            {game.status === "revealing" && totalAnswers > 0 && (
                              <div
                                className={`absolute left-0 top-0 bottom-0 transition-all duration-700 ${isCorrect ? "bg-green-500/25" : "bg-slate-500/15"}`}
                                style={{ width: `${pct}%` }}
                              />
                            )}
                            <div
                              className={`relative z-10 flex items-center justify-center font-black text-white shrink-0 ${gameStyles.answerLabel} ${
                                isCorrect
                                  ? "bg-green-500"
                                  : isWrong
                                    ? "bg-gray-700"
                                    : i === 0 ? gameStyles.answerLabelA
                                      : i === 1 ? gameStyles.answerLabelB
                                        : i === 2 ? gameStyles.answerLabelC
                                          : gameStyles.answerLabelD
                              } ${m ? "w-14 h-14 text-3xl" : "text-xl md:text-3xl"}`}
                            >
                              {letter}
                            </div>
                            <span
                              className={`relative z-10 font-bold leading-tight ${gameStyles.answerText} ${
                                isCorrect ? gameStyles.answerTextCorrect : isWrong ? gameStyles.answerTextWrong : ""
                              } ${m ? "text-base" : "text-base md:text-xl lg:text-2xl"}`}
                            >
                              {opt.replace(/^[A-D]\)\s*/, "")}
                            </span>
                            {game.status === "revealing" && totalAnswers > 0 && (
                              <span className={`relative z-10 ml-auto font-black opacity-70 shrink-0 ${m ? "text-base" : "text-lg md:text-2xl"}`}>
                                {pct}%
                              </span>
                            )}
                            {isCorrect && (
                              <span className={`relative z-10 ml-auto animate-bounce-in shrink-0 ${m ? "text-2xl" : "text-3xl md:text-4xl"}`}>
                                ✅
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Reveal Banner */}
                    {game.status === "revealing" && game.correctAnswer && (
                      <div className={`animate-slide-in-up ${m ? "mt-2" : "mt-3 md:mt-4"}`}>
                        <div className={`border-2 text-center ${gameStyles.revealBanner} ${m ? "rounded-xl p-3" : "rounded-xl md:rounded-2xl p-3 md:p-5"}`}>
                          {game.winnerDisplayName ? (
                            <div>
                              <p
                                className={`font-black text-yellow-300 ${gameStyles.revealBannerWinner} ${m ? "text-lg" : "text-xl md:text-3xl"}`}
                                style={{ fontFamily: "Orbitron" }}
                              >
                                🏆 {game.winnerDisplayName}
                              </p>
                              <p className={`text-green-400 mt-1 ${m ? "text-sm" : "text-sm md:text-lg"}`}>
                                answered{" "}
                                <span className={`font-black ${m ? "text-lg" : "text-xl md:text-2xl"}`}>{game.correctAnswer}</span>
                                {" "}in {game.correctAnswerers?.[0]?.time.toFixed(1)}s!
                              </p>
                              {game.correctAnswerers && game.correctAnswerers.length > 1 && (
                                <p className={`text-gray-400 mt-1 ${m ? "text-xs" : "text-xs md:text-sm"}`}>
                                  +{game.correctAnswerers.length - 1} also correct
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className={`text-gray-400 ${m ? "text-base" : "text-lg md:text-2xl"}`}>
                              Nobody answered! It was{" "}
                              <span className="text-green-400 font-black">{game.correctAnswer}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={`glass-card neon-border flex-1 flex items-center justify-center ${gameStyles.questionCard} ${m ? "p-4" : "p-8"}`}>
                    <div className="text-center">
                      <div className={`animate-float ${m ? "text-5xl mb-3" : "text-7xl md:text-8xl mb-6"}`}>⚡</div>
                      <p
                        className={`text-purple-300 neon-text-purple font-black ${gameStyles.getReadyText} ${m ? "text-2xl" : "text-3xl md:text-4xl"}`}
                        style={{ fontFamily: "Orbitron" }}
                      >
                        GET READY!
                      </p>
                      <p className={`text-gray-400 mt-2 md:mt-3 ${m ? "text-base" : "text-lg md:text-xl"}`}>
                        Next question incoming...
                      </p>
                    </div>
                  </div>
                )}

                {/* Mascot */}
                <div className={`${m ? "mt-1 space-y-1 min-h-8" : "mt-2 md:mt-3 space-y-2 min-h-[50px]"}`}>
                  {mascotMessages.map(msg => (
                    <div key={msg.id} className="flex items-center gap-2 md:gap-3 animate-slide-in-left">
                      <div className={`animate-float shrink-0 ${m ? "text-2xl" : "text-3xl md:text-4xl"}`}>🦊</div>
                      <div className={`glass-card neon-border-pink rounded-xl flex-1 ${m ? "px-3 py-1.5" : "px-4 py-2 md:px-5 md:py-3"}`}>
                        <p className={`font-semibold text-gray-200 ${m ? "text-sm" : "text-sm md:text-lg"}`}>{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Leaderboard (desktop) */}
            {game && !m && (
              <div className="hidden lg:flex w-80 xl:w-96 flex-col gap-3">
                <div className={`glass-card neon-border-gold p-4 xl:p-5 flex-1 overflow-hidden flex flex-col ${gameStyles.leaderboardPanel}`}>
                  <h2
                    className={`text-lg xl:text-xl font-black text-yellow-300 mb-4 text-center ${gameStyles.leaderboardTitle}`}
                    style={{ fontFamily: "Orbitron" }}
                  >
                    🏆 LEADERBOARD
                  </h2>
                  <div className="space-y-2 overflow-y-auto flex-1">
                    {game.leaderboard.length > 0 ? (
                      game.leaderboard.map(p => (
                        <div
                          key={p.username}
                          className={`flex items-center gap-3 p-2.5 xl:p-3 rounded-xl transition-all ${
                            p.rank <= 3 ? "bg-linear-to-r from-yellow-500/15 to-transparent" : "bg-slate-800/30"
                          } ${p.streak >= 5 ? "ring-2 ring-orange-500/50" : ""}`}
                        >
                          <div className={`w-9 h-9 xl:w-10 xl:h-10 rounded-full flex items-center justify-center text-sm xl:text-base font-black ${
                            p.rank === 1 ? "rank-1" : p.rank === 2 ? "rank-2" : p.rank === 3 ? "rank-3" : "bg-slate-700 text-gray-500"
                          }`}>
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
                            {p.streak >= 3 && <div className="text-xs text-orange-400">{p.streak}x🔥</div>}
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
                <div className="glass-card neon-border p-3 xl:p-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-gray-500 text-xs">Answers</div>
                      <div className="text-cyan-400 font-black text-lg">{game.stats.totalAnswers}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">Accuracy</div>
                      <div className="text-green-400 font-black text-lg">
                        {game.stats.totalAnswers > 0
                          ? Math.round((game.stats.correctAnswers / game.stats.totalAnswers) * 100)
                          : 0}%
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
            )}

            {/* Mobile Leaderboard Sheet */}
            {m && showMobileLB && game && (
              <div
                className={`absolute inset-0 z-40 flex flex-col justify-end ${overlayStyles.mobileLbBackdrop}`}
                onClick={() => setShowMobileLB(false)}
              >
                <div
                  className={`${overlayStyles.mobileLbSheet} animate-slide-in-up`}
                  onClick={e => e.stopPropagation()}
                  style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-yellow-500/20">
                    <h2 className="text-lg font-black text-yellow-300" style={{ fontFamily: "Orbitron" }}>
                      🏆 LEADERBOARD
                    </h2>
                    <button onClick={() => setShowMobileLB(false)} className="text-white/60 text-2xl">&times;</button>
                  </div>
                  <div className="overflow-y-auto flex-1 p-3 space-y-1.5">
                    {game.leaderboard.length > 0 ? (
                      game.leaderboard.map(p => (
                        <div
                          key={p.username}
                          className={`flex items-center gap-2 p-2.5 rounded-lg transition-all ${
                            p.rank <= 3 ? "bg-linear-to-r from-yellow-500/12 to-transparent" : "bg-slate-800/25"
                          } ${p.streak >= 5 ? "ring-1 ring-orange-500/40" : ""}`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${
                            p.rank === 1 ? "rank-1" : p.rank === 2 ? "rank-2" : p.rank === 3 ? "rank-3" : "bg-slate-700 text-gray-500"
                          }`}>
                            {p.rank}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-base font-bold text-white truncate block">{p.displayName}</span>
                            <span className="text-xs text-gray-500">{p.title}</span>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-black text-yellow-300 text-base">{p.points}</div>
                            {p.streak >= 3 && <div className="text-xs text-orange-400">{p.streak}x🔥</div>}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-gray-500 text-sm">No players yet!</p>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-yellow-500/20 px-4 py-2">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-xs text-gray-500">Answers</div>
                        <div className="text-cyan-400 font-black text-base">{game.stats.totalAnswers}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Accuracy</div>
                        <div className="text-green-400 font-black text-base">
                          {game.stats.totalAnswers > 0
                            ? Math.round((game.stats.correctAnswers / game.stats.totalAnswers) * 100)
                            : 0}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Fastest</div>
                        <div className="text-orange-400 font-black text-base">
                          {game.stats.fastestAnswer ? `${game.stats.fastestAnswer.toFixed(1)}s` : "-"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bar */}
          {game && (
            <div className={m ? "px-2 pb-2" : "px-4 pb-3 md:px-6 md:pb-4"}>
              {!m && (
                <div className="lg:hidden mb-2">
                  {game.leaderboard.length > 0 && (
                    <div className={`glass-card neon-border-gold px-4 py-2 rounded-xl flex items-center justify-center gap-4 ${gameStyles.bottomBar}`}>
                      {game.leaderboard.slice(0, 3).map(p => (
                        <div key={p.username} className="flex items-center gap-2">
                          <span className="text-base">{p.rank === 1 ? "🥇" : p.rank === 2 ? "🥈" : "🥉"}</span>
                          <span className="text-sm font-bold text-white truncate max-w-20">{p.displayName}</span>
                          <span className="text-sm font-black text-yellow-300">{p.points}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div className={`glass-card neon-border rounded-xl text-center ${gameStyles.bottomBar} ${m ? "px-3 py-2" : "px-4 py-2.5 md:px-6 md:py-3"}`}>
                <p className={`text-gray-200 font-bold ${m ? "text-sm" : "text-base md:text-xl lg:text-2xl"}`}>
                  Type{" "}
                  <span className={`inline-flex mx-1 ${m ? "gap-1" : "gap-1.5 md:gap-2"}`}>
                    <span className={`bg-cyan-600 text-white font-black ${m ? "px-2 py-0.5 text-sm rounded" : "px-2.5 py-0.5 md:px-3 md:py-1 rounded-lg text-base md:text-xl"}`}>A</span>
                    <span className={`bg-pink-600 text-white font-black ${m ? "px-2 py-0.5 text-sm rounded" : "px-2.5 py-0.5 md:px-3 md:py-1 rounded-lg text-base md:text-xl"}`}>B</span>
                    <span className={`bg-amber-600 text-white font-black ${m ? "px-2 py-0.5 text-sm rounded" : "px-2.5 py-0.5 md:px-3 md:py-1 rounded-lg text-base md:text-xl"}`}>C</span>
                    <span className={`bg-emerald-600 text-white font-black ${m ? "px-2 py-0.5 text-sm rounded" : "px-2.5 py-0.5 md:px-3 md:py-1 rounded-lg text-base md:text-xl"}`}>D</span>
                  </span>
                  {" "}in chat!
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Winner Popup */}
      {showWinner && game?.winnerDisplayName && (
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-50 ${overlayStyles.winnerPopup}`}>
          <div className="animate-bounce-in text-center mx-6">
            <div className={`glass-card rounded-3xl max-w-lg ${overlayStyles.overlayPanel} ${m ? "p-6" : "p-8 md:p-12"}`}>
              <div className={m ? "text-6xl mb-2" : "text-6xl md:text-8xl mb-4"}>🎉</div>
              <p
                className={`font-black text-yellow-300 neon-text-gold ${overlayStyles.winnerName} ${m ? "text-3xl" : "text-3xl md:text-5xl"}`}
                style={{ fontFamily: "Orbitron" }}
              >
                {game.winnerDisplayName}
              </p>
              <p className={`text-green-400 font-bold mt-2 md:mt-3 ${m ? "text-lg" : "text-xl md:text-2xl"}`}>
                Answered {game.correctAnswer} correctly! 🎯
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Victory */}
      {showVictory && game?.status === "completed" && (
        <div className={`absolute inset-0 flex items-center justify-center bg-black/70 z-50 ${overlayStyles.victoryScreen}`}>
          <div className="text-center animate-scale-in max-w-2xl w-full mx-2 md:mx-4">
            <div className={`${overlayStyles.victoryPanel} ${m ? "p-5" : "p-8 md:p-12"}`}>
              <h1
                className={`font-black text-yellow-300 neon-text-gold mb-0 md:mb-2 ${overlayStyles.victoryTitle} ${m ? "text-2xl" : "text-3xl md:text-5xl"}`}
                style={{ fontFamily: "Orbitron" }}
              >
                🏆 ROUND {game.currentRound} 🏆
              </h1>
              <p className={`text-gray-400 ${m ? "text-base mb-3" : "text-lg md:text-xl mb-8"}`}>COMPLETE!</p>
              <div className={`flex items-end justify-center gap-2 md:gap-8 ${m ? "mb-3" : "mb-8"}`}>
                {game.leaderboard[1] && (
                  <div className="text-center">
                    <div className={`trophy-2 ${m ? "text-3xl" : ""}`}>🥈</div>
                    <div className="glass-card p-2 md:p-4 rounded-xl mt-1 md:mt-2">
                      <p className={`font-bold text-gray-200 truncate max-w-20 md:max-w-none ${m ? "text-sm" : "text-sm md:text-lg"}`}>
                        {game.leaderboard[1].displayName}
                      </p>
                      <p className={`font-black text-gray-300 ${m ? "text-base" : "text-xl md:text-2xl"}`}>
                        {game.leaderboard[1].points}
                      </p>
                    </div>
                  </div>
                )}
                {game.leaderboard[0] && (
                  <div className="text-center -mt-2 md:-mt-4">
                    <div className={`trophy-1 ${m ? "text-4xl" : ""}`}>🥇</div>
                    <div
                      className="glass-card neon-border-gold p-2 md:p-6 rounded-xl mt-1 md:mt-2"
                      style={{ minWidth: m ? 100 : 140 }}
                    >
                      <p
                        className={`font-black text-yellow-300 truncate max-w-[100px] md:max-w-none ${m ? "text-sm" : "text-lg md:text-2xl"}`}
                        style={{ fontFamily: "Orbitron" }}
                      >
                        {game.leaderboard[0].displayName}
                      </p>
                      <p className={`font-black text-yellow-400 neon-text-gold ${m ? "text-2xl" : "text-3xl md:text-4xl"}`}>
                        {game.leaderboard[0].points}
                      </p>
                      <p className={`text-purple-300 mt-0 md:mt-1 ${m ? "text-xs" : "text-xs md:text-sm"}`}>
                        {game.leaderboard[0].title}
                      </p>
                    </div>
                  </div>
                )}
                {game.leaderboard[2] && (
                  <div className="text-center">
                    <div className={`trophy-3 ${m ? "text-2xl" : ""}`}>🥉</div>
                    <div className="glass-card p-2 md:p-4 rounded-xl mt-1 md:mt-2">
                      <p className={`font-bold text-gray-200 truncate max-w-20 md:max-w-none ${m ? "text-sm" : "text-sm md:text-lg"}`}>
                        {game.leaderboard[2].displayName}
                      </p>
                      <p className={`font-black text-orange-300 ${m ? "text-base" : "text-xl md:text-2xl"}`}>
                        {game.leaderboard[2].points}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className={`grid grid-cols-4 text-center ${m ? "gap-1 mb-2" : "gap-2 md:gap-4 mb-4"}`}>
                <div>
                  <p className={`text-gray-500 ${m ? "text-xs" : "text-xs"}`}>Players</p>
                  <p className={`font-black text-cyan-400 ${m ? "text-base" : "text-lg md:text-2xl"}`}>{game.stats.totalPlayers}</p>
                </div>
                <div>
                  <p className={`text-gray-500 ${m ? "text-xs" : "text-xs"}`}>Q&apos;s</p>
                  <p className={`font-black text-purple-400 ${m ? "text-base" : "text-lg md:text-2xl"}`}>{game.stats.questionsAnswered}</p>
                </div>
                <div>
                  <p className={`text-gray-500 ${m ? "text-xs" : "text-xs"}`}>Acc</p>
                  <p className={`font-black text-green-400 ${m ? "text-base" : "text-lg md:text-2xl"}`}>
                    {game.stats.totalAnswers > 0
                      ? `${Math.round((game.stats.correctAnswers / game.stats.totalAnswers) * 100)}%`
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className={`text-gray-500 ${m ? "text-xs" : "text-xs"}`}>Fast</p>
                  <p className={`font-black text-orange-400 ${m ? "text-base" : "text-lg md:text-2xl"}`}>
                    {game.stats.fastestAnswer ? `${game.stats.fastestAnswer.toFixed(1)}s` : "N/A"}
                  </p>
                </div>
              </div>
              <p className={`text-gray-400 mt-2 md:mt-4 ${m ? "text-base" : "text-base md:text-lg"}`}>
                GG! Thanks for playing! 🎮
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Paused */}
      {game?.status === "paused" && (
        <div className={`absolute inset-0 flex items-center justify-center z-40 ${overlayStyles.pausedOverlay}`}>
          <div className="animate-pulse text-center">
            <div className={m ? "text-6xl mb-2" : "text-7xl md:text-9xl mb-4"}>⏸</div>
            <p
              className={`font-black text-yellow-300 neon-text-gold ${overlayStyles.pausedText} ${m ? "text-3xl" : "text-4xl md:text-5xl"}`}
              style={{ fontFamily: "Orbitron" }}
            >
              PAUSED
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes floatUp {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-80px) scale(1.3); }
        }
      `}</style>
    </div>
  );

  // ─── RENDER ───
  if (isPhoneFrame) {
    return <PhoneFrame>{overlayContent}</PhoneFrame>;
  }

  return overlayContent;
}

// ─── NEW IMAGE QUIZ OVERLAY COMPONENT ───
function NewImageQuizOverlay({ session, isMobile }: { session: ImageQuizSessionData; isMobile: boolean }) {
  const m = isMobile;
  const q = session.question!;
  const isRevealing = session.status === "revealing";

  const getImageStyle = (): React.CSSProperties => {
    const rp = session.revealProgress;
    switch (q.revealMode) {
      case "blurred":
        return { filter: `blur(${Math.max(0, 20 - rp * 0.2)}px)` };
      case "pixelated": {
        const px = Math.max(2, 20 - rp * 0.18);
        return { filter: `blur(${px}px)`, imageRendering: "pixelated" as React.CSSProperties["imageRendering"] };
      }
      case "zoomed": {
        const zoom = Math.max(1, 3 - (rp / 100) * 2);
        return { transform: `scale(${zoom})`, objectFit: "cover" as const };
      }
      case "silhouette":
        return { filter: `brightness(0) contrast(100%)` };
      case "progressive":
        return { filter: `blur(${Math.max(0, 15 - rp * 0.15)}px) brightness(${0.3 + rp * 0.007})` };
      default:
        return {};
    }
  };

  const modeColors: Record<string, { bg: string; border: string; text: string }> = {
    character: { bg: "bg-blue-500/20", border: "border-blue-500/40", text: "text-blue-300" },
    anime: { bg: "bg-purple-500/20", border: "border-purple-500/40", text: "text-purple-300" },
    hair: { bg: "bg-pink-500/20", border: "border-pink-500/40", text: "text-pink-300" },
    weapon: { bg: "bg-orange-500/20", border: "border-orange-500/40", text: "text-orange-300" },
    symbol: { bg: "bg-cyan-500/20", border: "border-cyan-500/40", text: "text-cyan-300" },
    outfit: { bg: "bg-emerald-500/20", border: "border-emerald-500/40", text: "text-emerald-300" },
  };

  const mc = modeColors[q.quizMode] || modeColors.character;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className={`glass-card neon-border flex-1 flex flex-col animate-scale-in overflow-hidden ${gameStyles.questionCard} ${m ? "p-2" : "p-4 md:p-6"}`}>

        {/* Header */}
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <div
            className={`rounded-full font-black uppercase tracking-wider ${gameStyles.diffBadge} ${mc.bg} ${mc.text} border-2 ${mc.border} ${m ? "px-3 py-1.5 text-sm" : "px-4 py-1.5 text-sm md:text-lg"}`}
            style={{ fontFamily: "Orbitron" }}
          >
            {q.quizMode === "character" ? "👤 GUESS THE CHARACTER" :
              q.quizMode === "anime" ? "🎌 GUESS THE ANIME" :
                q.quizMode === "hair" ? "💇 GUESS THE HAIR" :
                  q.quizMode === "weapon" ? "⚔️ GUESS THE WEAPON" :
                    q.quizMode === "symbol" ? "🔮 GUESS THE SYMBOL" :
                      q.quizMode === "outfit" ? "👘 GUESS THE OUTFIT" :
                        `🔍 GUESS: ${q.quizMode.toUpperCase()}`}
            {" • "}{q.difficulty.toUpperCase()}
          </div>
          <div className={`flex items-center gap-1 rounded-full font-black ${
            session.timeRemaining <= 5
              ? "bg-red-500/30 text-red-300 border-2 border-red-500/60 animate-pulse"
              : session.timeRemaining <= 10
                ? "bg-yellow-500/30 text-yellow-300 border-2 border-yellow-500/60"
                : "bg-slate-700/50 text-cyan-300 border-2 border-cyan-500/40"
          } ${m ? "px-3 py-1.5" : "px-4 py-2"}`}>
            <span
              className={`${gameStyles.timerNumber} ${m ? "text-2xl" : "text-xl md:text-3xl"}`}
              style={{ fontFamily: "Orbitron" }}
            >
              {session.timeRemaining}
            </span>
            <span className={`opacity-60 ${m ? "text-sm" : "text-xs"}`}>SEC</span>
          </div>
        </div>

        {/* Timer Bar */}
        <div className={`w-full rounded-full ${gameStyles.timerBarContainer} ${m ? "h-2.5 mb-2" : "h-2 md:h-3 mb-4"}`}>
          <div
            className={`h-full rounded-full transition-all duration-1000 ${gameStyles.timerBarFill} ${
              session.timeRemaining <= 5
                ? gameStyles.timerCritical
                : session.timeRemaining <= 10
                  ? gameStyles.timerWarning
                  : ""
            }`}
            style={{ width: `${(session.timeRemaining / q.timeLimit) * 100}%` }}
          />
        </div>

        {/* Image */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden rounded-2xl bg-slate-900/50 min-h-0">
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <div className="flex-1 w-full flex items-center justify-center relative min-h-0">
              <img
                src={q.imageUrl}
                alt="Quiz"
                className="max-h-full max-w-full object-contain rounded-xl transition-all duration-500"
                style={isRevealing ? {} : getImageStyle()}
              />
              {!isRevealing && q.revealMode !== "normal" && (
                <div className="absolute top-3 left-3 glass-card px-3 py-1 rounded-full text-xs">
                  <span className="text-purple-300 font-bold">{q.revealMode.toUpperCase()}</span>
                </div>
              )}
              {isRevealing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="text-center animate-bounce-in">
                    <p className="text-2xl md:text-4xl font-black text-green-400">{q.correctAnswer}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Options */}
            <div className={`w-full shrink-0 grid mt-2 ${m ? "grid-cols-2 gap-1.5" : "grid-cols-2 md:grid-cols-4 gap-2"}`}>
              {q.options.map((opt, i) => {
                const letter = String.fromCharCode(65 + i);
                const isCorrect = q.correctOptionIndex === i;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 rounded-xl transition-all ${gameStyles.answerOption} ${
                      isRevealing && isCorrect
                        ? gameStyles.answerCorrect
                        : isRevealing && !isCorrect
                          ? `${gameStyles.answerWrong} opacity-40`
                          : ""
                    } ${m ? "p-2" : "p-2 md:p-3"}`}
                  >
                    <div
                      className={`flex items-center justify-center font-black text-white shrink-0 ${gameStyles.answerLabel} ${
                        isRevealing && isCorrect
                          ? "bg-green-500"
                          : isRevealing
                            ? "bg-gray-700"
                            : i === 0 ? gameStyles.answerLabelA
                              : i === 1 ? gameStyles.answerLabelB
                                : i === 2 ? gameStyles.answerLabelC
                                  : gameStyles.answerLabelD
                      } ${m ? "w-9 h-9 text-base" : "text-sm md:text-lg"}`}
                    >
                      {isRevealing && isCorrect ? "✓" : letter}
                    </div>
                    <span
                      className={`font-bold leading-tight truncate ${gameStyles.answerText} ${
                        isRevealing && isCorrect
                          ? gameStyles.answerTextCorrect
                          : isRevealing
                            ? gameStyles.answerTextWrong
                            : ""
                      } ${m ? "text-sm" : "text-xs md:text-sm"}`}
                    >
                      {opt}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Instructions */}
            {!isRevealing && (
              <div className={`text-center shrink-0 ${m ? "mt-1" : "mt-2"}`}>
                <p className={`text-cyan-400 font-bold ${m ? "text-sm" : "text-sm md:text-base"}`}>
                  Type <span className="font-black text-pink-400">A B C D</span> in chat!
                </p>
                {session.timeRemaining > q.timeLimit * 0.67 && (
                  <p className={`text-yellow-400 animate-pulse mt-0.5 md:mt-1 ${m ? "text-xs" : "text-xs"}`}>
                    ⚡ SPEED BONUS — answer now for 2x points!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Answer Feed */}
        {session.answerFeed.length > 0 && (
          <div className={`glass-card rounded-lg overflow-hidden ${m ? "mt-1 px-3 py-1.5 max-h-16" : "mt-2 px-3 py-2 max-h-16"}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-gray-500 font-bold ${m ? "text-xs" : "text-xs"}`}>LIVE ANSWERS</span>
              <span className={`text-gray-600 ${m ? "text-xs" : "text-xs"}`}>({session.answerFeed.length})</span>
            </div>
            {session.answerFeed.slice(-4).map((a, i) => (
              <div
                key={i}
                className={`py-0.5 animate-slide-in-left ${a.correct ? "text-green-400 font-bold" : "text-gray-500"} ${m ? "text-xs" : "text-xs"}`}
              >
                <span className="font-bold">{a.displayName}:</span> {a.answer}
                {a.correct && ` (${a.time.toFixed(1)}s)`}
              </div>
            ))}
          </div>
        )}

        {/* Winner Banner */}
        {isRevealing && (
          <div className={`animate-bounce-in ${m ? "mt-1.5" : "mt-3"}`}>
            <div className={`bg-green-500/15 border-2 border-green-500/40 text-center ${m ? "rounded-lg p-3" : "rounded-xl p-4"}`}>
              <p className={`font-black text-green-400 ${m ? "text-lg" : "text-xl md:text-3xl"}`}>
                ✅ {q.correctAnswer}
              </p>
              {session.winners.length > 0 ? (
                <div className={m ? "mt-1" : "mt-2"}>
                  <p className={`text-yellow-300 font-bold ${m ? "text-base" : "text-lg"}`}>
                    🏆 {session.winners[0].displayName} ({session.winners[0].time.toFixed(1)}s)
                  </p>
                </div>
              ) : (
                <p className={`text-gray-400 mt-1 ${m ? "text-sm" : "text-lg"}`}>Nobody got it!</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}