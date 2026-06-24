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
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [arenaData, setArenaData] = useState<any>(null);
  const [imageQuizSession, setImageQuizSession] = useState<ImageQuizSessionData | null>(null);
 const msgIdRef = useRef(0);
 const floatIdRef = useRef(0);
 const pollRef = useRef<ReturnType<typeof setInterval>>(null);
 const prevTimeRef = useRef<number>(0);

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
  setGame(prev => {
  setPrevGame(prev);
  return data;
  });
  setArenaData(arena);
  if (iq.session) setImageQuizSession(iq.session);
  } catch { /* ignore */ }
  }, []);

 useEffect(() => {
 fetchGame();
 pollRef.current = setInterval(fetchGame, 400);
 return () => { if (pollRef.current) clearInterval(pollRef.current); };
 }, [fetchGame]);

 // Enable audio — try immediately, then on interaction
 useEffect(() => {
 const enableAudio = () => {
 initAudio();
 setAudioReady(true);
 };

 // Try to start audio immediately (works if user already interacted with page)
 try {
 const ctx = new AudioContext();
 if (ctx.state === "running") {
 enableAudio();
 ctx.close();
 } else {
 ctx.close();
 // If suspended, wait for user interaction
 window.addEventListener("click", enableAudio, { once: true });
 window.addEventListener("keydown", enableAudio, { once: true });
 window.addEventListener("touchstart", enableAudio, { once: true });
 // Also auto-enable after a short delay for OBS browser sources
 // OBS browser sources allow autoplay
 setTimeout(() => {
 enableAudio();
 }, 1000);
 }
 } catch {
 // Fallback: wait for interaction
 window.addEventListener("click", enableAudio, { once: true });
 window.addEventListener("keydown", enableAudio, { once: true });
 window.addEventListener("touchstart", enableAudio, { once: true });
 setTimeout(() => {
 enableAudio();
 }, 1000);
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

 // Someone answered correctly!
 if (game.winner && game.winner !== prevGame.winner) {
 setShowWinner(true);
 if (sound) playCorrect();
 addMascotMsg(` ${game.winnerDisplayName} answered ${game.correctAnswer} first!`);
 spawnConfetti();
 flash("rgba(34,197,94,0.2)");
 addFloatingText(`+${game.correctAnswerers?.[0]?.time ? game.correctAnswerers[0].time.toFixed(1) + "s" : ""}`, "text-green-400");

 // Check for streak
 const winner = game.leaderboard.find(p => p.username === game.winner);
 const prevWinner = prevGame.leaderboard.find(p => p.username === game.winner);
 if (winner && prevWinner && winner.streak > prevWinner.streak) {
 if (winner.streak >= 10) {
 if (sound) setTimeout(() => playStreak(), 600);
 addMascotMsg(` LEGENDARY! ${winner.displayName} — ${winner.streak} streak!`);
 shake();
 } else if (winner.streak >= 5) {
 if (sound) setTimeout(() => playStreak(), 600);
 addMascotMsg(` ${winner.displayName} is ON FIRE! ${winner.streak}-streak!`);
 } else if (winner.streak >= 3) {
 addMascotMsg(` ${winner.displayName} — ${winner.streak} in a row!`);
 }
 }

 // Check for new leader
 if (game.leaderboard[0]?.username === game.winner && prevGame.leaderboard[0]?.username !== game.winner && game.questionsAsked > 2) {
 if (sound) setTimeout(() => playNewLeader(), 800);
 addMascotMsg(` NEW LEADER: ${game.winnerDisplayName}!`);
 }

 setTimeout(() => setShowWinner(false), 5000);
 }

 // Time ran out with no answer
 if (game.status === "revealing" && prevGame.status === "question" && !game.winner) {
 if (sound) playTimeUp();
 addMascotMsg(` Nobody got it! Answer: ${game.correctAnswer}`);
 flash("rgba(239,68,68,0.15)");
 shake();
 }

 // Game started
 if (game.status === "active" && prevGame.status === "waiting") {
 if (sound) playGameStart();
 }

 // Game complete
 if (game.status === "completed" && prevGame.status !== "completed") {
 setShowVictory(true);
 if (sound) playVictory();
 spawnConfetti(); spawnConfetti(); spawnConfetti();
 }

 // New question
 if (game.currentQuestion?.id !== prevGame.currentQuestion?.id && game.currentQuestion) {
 setShowWinner(false);
 if (sound) playNewQuestion();

 const qNum = game.questionsAsked;
 if (qNum === 1) {
 addMascotMsg(" EASY ROUND — 10 pts each!");
 if (sound) setTimeout(() => playPhaseChange(), 300);
 } else if (qNum === 11) {
 addMascotMsg(" MEDIUM ROUND — 20 pts each! ");
 if (sound) setTimeout(() => playPhaseChange(), 300);
 flash("rgba(251,191,36,0.15)");
 } else if (qNum === 21) {
 addMascotMsg(" HARD ROUND — 30 pts each! ");
 if (sound) setTimeout(() => playPhaseChange(), 300);
 flash("rgba(249,115,22,0.15)");
 }
 }

 // Timer warnings
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
 ? game.answerDistribution.A + game.answerDistribution.B + game.answerDistribution.C + game.answerDistribution.D : 0;

 return (
 <div className={`relative w-screen h-screen overflow-hidden ${shakeScreen ? "animate-shake" : ""}`} style={{ background: "var(--color-bg-deep)" }}>
 {/* Screen Flash */}
 {screenFlash && (
  <div className={`absolute inset-0 z-[60] ${overlayStyles.screenFlash}`} style={{ background: screenFlash }} />
 )}

 {/* Floating Texts */}
 {floatingTexts.map(f => (
 <div key={f.id} className={`absolute z-50 pointer-events-none text-3xl font-black ${f.color}`}
 style={{ left: `${f.x}%`, top: `${f.y}%`, animation: "floatUp 2s ease-out forwards" }}>
 {f.text}
 </div>
 ))}

 {/* Sound Toggle */}
 <button
 onClick={() => { initAudio(); setAudioReady(true); setSoundEnabled(s => !s); }}
  className={`absolute top-3 right-3 z-50 text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-2xl md:text-3xl border-2 transition-all ${overlayStyles.soundToggle} ${
  soundEnabled && audioReady
  ? "border-green-400 text-green-300"
  : "border-red-500/70 text-red-400"
  }`} style={{ background: "rgba(10,5,30,0.85)", backdropFilter: "blur(8px)" }}
 >
 {soundEnabled ? "" : ""}
 </button>

 {/* Click to enable audio overlay */}
  {!audioReady && game?.status !== "waiting" && (
 <div className="absolute top-14 right-3 z-50 animate-bounce-in">
 <button
 onClick={() => { initAudio(); setAudioReady(true); }}
 className="glass-card neon-border-pink px-4 py-2 rounded-xl text-sm text-pink-300 hover:text-white transition-all animate-pulse"
 >
 Click for sound!
 </button>
 </div>
 )}

 {/* Confetti */}
  {confetti.map(p => (
  <div key={p.id} className={`confetti ${overlayStyles.confettiParticle}`} style={{
 left: `${p.left}%`, backgroundColor: p.color,
 animationDuration: `${2 + Math.random() * 2}s`, animationDelay: `${p.delay}s`,
 width: "12px", height: "12px",
 }} />
 ))}

  {/* WAITING SCREEN */}
  {game?.status === "waiting" && (
  <div className={`absolute inset-0 flex items-center justify-center ${gameStyles.waitingScreen}`}>
  <div className="text-center px-6 animate-fade-in">
  <div className="text-8xl md:text-9xl mb-6 animate-float">🎮</div>
  <h1 className={`text-5xl md:text-7xl font-black neon-text mb-3 ${gameStyles.titleDisplay}`} style={{ fontFamily: "Orbitron" }}>ANIME WIZ</h1>
 <p className="text-2xl md:text-3xl text-purple-300 neon-text-purple mb-8" style={{ fontFamily: "Orbitron" }}>LIVE ARENA</p>
 <div className="animate-pulse">
 <p className="text-xl md:text-2xl text-gray-300 mb-2"> Waiting for round to start...</p>
 <p className="text-lg text-cyan-400">
 Answer with <span className="font-black text-pink-400 text-2xl">A B C D</span> in chat!
 </p>
 </div>
 </div>
 </div>
 )}

  {/* ACTIVE GAME (trivia, image quiz, or arena) */}
  {((game && (game.status === "active" || game.status === "question" || game.status === "revealing" || game.status === "paused")) || 
     (imageQuizSession && imageQuizSession.status !== "idle" && imageQuizSession.question)) && (
  <div className="absolute inset-0 flex flex-col">
  {/* Top Bar - only when game data exists */}
  {game && (
   <div className={`flex items-center justify-between px-4 py-3 md:px-6 md:py-4 bg-gradient-to-b from-black/80 to-transparent ${gameStyles.topBar}`}>
  <div className="flex items-center gap-2 md:gap-3">
  <span className="text-3xl md:text-4xl animate-float">🎮</span>
  <h1 className="text-lg md:text-2xl font-black neon-text leading-tight" style={{ fontFamily: "Orbitron" }}>ANIME WIZ</h1>
  </div>
  <div className="flex items-center gap-2 md:gap-3">
  <div className="glass-card neon-border-gold px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
  <span className="text-yellow-300 font-black text-sm md:text-lg" style={{ fontFamily: "Orbitron" }}>R{game.currentRound}</span>
  </div>
  <div className="glass-card neon-border px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
  <span className="text-white font-bold text-sm md:text-lg">{game.questionsAsked}<span className="text-gray-500">/{game.totalQuestions}</span></span>
  </div>
  <div className="glass-card neon-border px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
  <span className="text-cyan-300 font-bold text-sm md:text-lg"> {game.totalPlayers}</span>
  </div>
  </div>
  </div>
  )}

  {/* Main */}
  <div className="flex-1 flex flex-col lg:flex-row gap-3 px-4 md:px-6 pb-3 md:pb-4 overflow-hidden">
   {/* NEW IMAGE QUIZ MODE */}
   {imageQuizSession && imageQuizSession.status !== "idle" && imageQuizSession.question && (
   <NewImageQuizOverlay session={imageQuizSession} />
   )}

  {/* POWER SCALING BATTLE MODE (Arena Engine) */}
 {arenaData && (arenaData.status === "voting" || arenaData.status === "event") && (
 <div className="flex-1 flex flex-col min-h-0">
 <div className="glass-card neon-border flex-1 flex flex-col p-4 md:p-6 animate-scale-in overflow-hidden">
 {/* Header */}
 <div className="flex items-center justify-between mb-4">
 <div className="flex items-center gap-3">
  <div className="px-4 py-1.5 rounded-full font-black text-sm md:text-lg uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
  {arenaData.modeState?.mode === "hot_take" ? "HOT TAKE" :
   arenaData.modeState?.mode === "tier_list" ? "TIER LIST" :
   arenaData.modeState?.mode === "tournament" ? `TOURNAMENT R${(arenaData.modeState?.tournament?.round || 0) + 1}` :
   arenaData.modeState?.mode === "who_wins" ? "WHO WINS?" :
   arenaData.mode === "boss_raid" ? `BOSS RAID: ${arenaData.bossName}` :
   arenaData.mode === "tug_of_war" ? "TUG OF WAR" : "VOTE"}
  </div>
  {arenaData.activeEvent?.active && (
  <div className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 text-xs font-bold animate-pulse">
  {arenaData.activeEvent.name}
  </div>
  )}
  </div>
  {arenaData.timeRemaining > 0 ? (
  <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-black ${
  arenaData.timeRemaining <= 5 ? "bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse" :
  "bg-zinc-800 text-zinc-300 border border-zinc-700"
  }`}>
  <span className="text-xl md:text-3xl">{arenaData.timeRemaining}</span>
  <span className="text-xs opacity-60">SEC</span>
  </div>
  ) : (
  <div className="px-4 py-2 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 text-sm font-bold">
  HOST CONTROLLED
  </div>
  )}
  </div>

  {/* Mode-specific content: Hot Take statement / Tier List character */}
  {arenaData.modeState?.mode === "hot_take" && arenaData.modeState.hotTake && (
  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 md:p-6 mb-4 text-center">
  <p className="text-lg md:text-2xl lg:text-3xl font-bold text-white leading-relaxed">
  &ldquo;{arenaData.modeState.hotTake.statement}&rdquo;
  </p>
  <p className="text-xs text-zinc-500 mt-2 uppercase">{arenaData.modeState.hotTake.category}</p>
  </div>
  )}

  {arenaData.modeState?.mode === "tier_list" && arenaData.modeState.tierCharacter && (
  <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 md:p-6 mb-4 text-center">
  <p className="text-sm text-zinc-500 uppercase mb-1">Where does this character belong?</p>
  <p className="text-2xl md:text-4xl font-black text-white">{arenaData.modeState.tierCharacter.name}</p>
  <p className="text-base md:text-lg text-zinc-400 mt-1">{arenaData.modeState.tierCharacter.anime}</p>
  </div>
  )}

  {arenaData.modeState?.mode === "tournament" && arenaData.modeState.tournament && (
  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-3 mb-4 text-center">
  <p className="text-xs text-zinc-500 uppercase">Elimination Tournament</p>
  <p className="text-sm text-zinc-400">Match {(arenaData.modeState.tournament.round || 0) + 1} of {arenaData.modeState.tournament.bracket?.length || 0}</p>
  </div>
  )}

 {/* Hype Meter */}
 {arenaData.hypeScore > 0 && (
 <div className="flex items-center gap-2 mb-3">
 <span className="text-xs text-gray-500">HYPE</span>
 <div className="flex-1 bg-slate-800/60 rounded-full h-2">
 <div className={`h-full rounded-full transition-all duration-300 ${
 arenaData.hypeLevel === "legendary" ? "bg-gradient-to-r from-red-500 to-yellow-400" :
 arenaData.hypeLevel === "blazing" ? "bg-gradient-to-r from-orange-500 to-red-400" :
 arenaData.hypeLevel === "hot" ? "bg-gradient-to-r from-yellow-500 to-orange-400" :
 "bg-gradient-to-r from-cyan-500 to-blue-400"
 }`} style={{ width: `${arenaData.hypeScore}%` }} />
 </div>
 <span className="text-xs font-bold text-orange-400">{arenaData.hypeLevel?.toUpperCase()}</span>
 </div>
 )}

 {/* Boss Raid HP Bar */}
 {arenaData.mode === "boss_raid" && (
 <div className="mb-4">
 <div className="flex justify-between text-sm mb-1">
 <span className="text-red-400 font-bold"> {arenaData.bossName}</span>
 <span className="text-gray-400">{arenaData.bossHp}/{arenaData.bossMaxHp} HP</span>
 </div>
 <div className="w-full bg-slate-800/60 rounded-full h-6 overflow-hidden">
 <div className={`h-full rounded-full transition-all duration-300 ${
 arenaData.bossPhase >= 4 ? "bg-gradient-to-r from-red-700 to-red-500 animate-pulse" :
 arenaData.bossPhase >= 3 ? "bg-gradient-to-r from-orange-600 to-red-500" :
 "bg-gradient-to-r from-green-600 to-yellow-500"
 }`} style={{ width: `${(arenaData.bossHp / arenaData.bossMaxHp) * 100}%` }} />
 </div>
 <div className="flex justify-between text-xs mt-1">
 <span className="text-yellow-400">Phase {arenaData.bossPhase}</span>
 <span className="text-cyan-400">Combo: {arenaData.comboCount}x | Damage: {arenaData.comboDamage}</span>
 </div>
 </div>
 )}

 {/* Tug of War Bar */}
 {arenaData.mode === "tug_of_war" && arenaData.fighters?.length === 2 && (
 <div className="mb-4">
 <div className="flex justify-between text-sm mb-1">
 <span className="text-cyan-400 font-bold">{arenaData.fighters[0]?.name}</span>
 <span className="text-pink-400 font-bold">{arenaData.fighters[1]?.name}</span>
 </div>
 <div className="w-full bg-slate-800/60 rounded-full h-6 overflow-hidden relative">
 <div className="absolute inset-0 flex">
 <div className="bg-cyan-500/60 transition-all duration-500" style={{ width: `${50 + arenaData.tugPosition / 2}%` }} />
 <div className="bg-pink-500/60 flex-1" />
 </div>
 <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white/50" />
 </div>
 </div>
 )}

 <p className="text-center text-gray-400 mb-3 text-sm">
 {arenaData.mode === "boss_raid" ? "Type anything in chat to ATTACK!" : "Total votes: "}
 <span className="text-white font-bold text-xl">{arenaData.totalVotes}</span>
 {arenaData.messagesPerSecond > 0 && <span className="text-gray-500 ml-2">({arenaData.messagesPerSecond} msg/s)</span>}
 </p>

 {/* Vote Bars (for standard and tug_of_war) */}
 {arenaData.mode !== "boss_raid" && (
 <div className="flex-1 flex flex-col gap-3 justify-center">
 {(arenaData.fighters || []).map((f: { label: string; name: string; anime: string; votes: number; percentage: number; attacks?: string[] }, i: number) => {
 const colors = ["bg-cyan-500", "bg-pink-500", "bg-amber-500", "bg-emerald-500", "bg-purple-500", "bg-red-500"];
 const borderColors = ["border-cyan-400", "border-pink-400", "border-amber-400", "border-emerald-400", "border-purple-400", "border-red-400"];
 const isLeader = (arenaData.fighters || []).every((o: { votes: number }) => f.votes >= o.votes) && f.votes > 0;
 return (
 <div key={f.label} className={`rounded-xl border-2 p-3 md:p-4 transition-all ${borderColors[i] || "border-gray-500"} ${isLeader ? "ring-2 ring-yellow-400/60" : ""}`} style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(4px)" }}>
 <div className="flex items-center justify-between mb-2">
 <div className="flex items-center gap-3">
 <span className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${colors[i] || "bg-gray-500"} flex items-center justify-center font-black text-xl md:text-2xl text-white`}>
 {f.label}
 </span>
 <div>
 <p className="font-black text-white text-lg md:text-2xl">{f.name}</p>
 <p className="text-xs text-gray-500">{f.anime}</p>
 </div>
 </div>
 <div className="text-right">
 <p className="font-black text-2xl md:text-3xl text-white">{f.percentage}%</p>
 <p className="text-xs text-gray-400">{f.votes} votes</p>
 </div>
 </div>
 <div className="w-full bg-slate-700/60 rounded-full h-4 md:h-5 overflow-hidden">
 <div className={`h-full rounded-full transition-all duration-500 ${colors[i] || "bg-gray-500"}`}
 style={{ width: `${f.percentage}%` }} />
 </div>
 <div className="flex justify-between items-center mt-1">
 {isLeader && <span className="text-xs text-yellow-400 font-bold"> LEADING</span>}
 {f.attacks && f.attacks.length > 0 && (
 <span className="text-xs text-orange-400 ml-auto"> {f.attacks[f.attacks.length - 1]}</span>
 )}
 </div>
 </div>
 );
 })}
 </div>
 )}

 {/* Attack Log */}
 {arenaData.attackLog && arenaData.attackLog.length > 0 && (
 <div className="mt-2 space-y-1">
 {arenaData.attackLog.map((a: { fighter: string; attack: string }, i: number) => (
 <div key={i} className="text-xs text-orange-400 animate-slide-in-left"> {a.fighter}: {a.attack}</div>
 ))}
 </div>
 )}

 {/* Results */}
 {arenaData.status === "results" && (
 <div className="mt-4 animate-bounce-in text-center">
 <div className="bg-yellow-500/15 border-2 border-yellow-500/40 rounded-xl p-4">
 {arenaData.mode === "boss_raid" ? (
 <p className="text-2xl md:text-3xl font-black text-green-300" style={{ fontFamily: "Orbitron" }}>
 {arenaData.bossHp <= 0 ? " BOSS DEFEATED!" : " BOSS SURVIVES!"}
 </p>
 ) : (
 <p className="text-2xl md:text-3xl font-black text-yellow-300" style={{ fontFamily: "Orbitron" }}>
 {[...(arenaData.fighters || [])].sort((a: { votes: number }, b: { votes: number }) => b.votes - a.votes)[0]?.name} WINS!
 </p>
 )}
 </div>
 </div>
 )}
 </div>

 {/* Mascot */}
 <div className="mt-2 space-y-2 min-h-[50px]">
 {mascotMessages.map(msg => (
  <div key={msg.id} className="flex items-center gap-3 animate-slide-in-left">
  <div className="text-3xl animate-float shrink-0"></div>
  <div className={`glass-card neon-border-pink px-4 py-2 md:px-5 md:py-3 rounded-xl flex-1 ${gameStyles.mascotMsg}`}>
  <p className="text-sm md:text-lg font-semibold text-gray-200">{msg.text}</p>
  </div>
  </div>
 ))}
 </div>
 </div>
 )}

  {/* QUIZ MODE (existing, unchanged) */}
  {game && !imageQuizSession?.question && !(arenaData && (arenaData.status === "voting" || arenaData.status === "event")) && (
  <div className="flex-1 flex flex-col min-h-0">
  {game.currentQuestion ? (
  <div className={`glass-card neon-border flex-1 flex flex-col p-4 md:p-6 lg:p-8 animate-scale-in overflow-hidden ${gameStyles.questionCard}`} key={game.currentQuestion.id}>
 {/* Difficulty + Timer */}
 <div className="flex items-center justify-between mb-4 md:mb-6">
  <div className={`px-4 py-1.5 md:px-5 md:py-2 rounded-full font-black text-sm md:text-lg uppercase tracking-wider ${gameStyles.diffBadge} ${
  game.currentQuestion.difficulty === "easy" ? "bg-cyan-500/30 text-cyan-300 border-2 border-cyan-500/60" :
  game.currentQuestion.difficulty === "medium" ? "bg-yellow-500/30 text-yellow-300 border-2 border-yellow-500/60" :
  "bg-orange-500/30 text-orange-300 border-2 border-orange-500/60"
  }`} style={{ fontFamily: "Orbitron" }}>
  {game.currentQuestion.difficulty === "easy" ? "EASY • 10pts" : game.currentQuestion.difficulty === "medium" ? "MEDIUM • 20pts" : "HARD • 30pts"}
  </div>
 <div className={`flex items-center gap-2 px-4 py-2 md:px-5 rounded-full font-black ${
 game.timeRemaining <= 5 ? "bg-red-500/30 text-red-300 border-2 border-red-500/60 animate-pulse" :
 game.timeRemaining <= 10 ? "bg-yellow-500/30 text-yellow-300 border-2 border-yellow-500/60" :
 "bg-slate-700/50 text-cyan-300 border-2 border-cyan-500/40"
 }`}>
  <span className={`text-xl md:text-3xl ${gameStyles.timerNumber}`} style={{ fontFamily: "Orbitron" }}>{game.timeRemaining}</span>
  <span className="text-xs md:text-sm opacity-60">SEC</span>
  </div>
  </div>

  {/* Timer Bar */}
  <div className={`w-full rounded-full h-2 md:h-3 mb-4 md:mb-6 ${gameStyles.timerBarContainer}`}>
  <div className={`h-full rounded-full transition-all duration-1000 ${gameStyles.timerBarFill} ${
  game.timeRemaining <= 5 ? gameStyles.timerCritical :
  game.timeRemaining <= 10 ? gameStyles.timerWarning :
  ""
  }`} style={{ width: `${(game.timeRemaining / game.currentQuestion.timeLimit) * 100}%` }} />
 </div>

 {/* Question */}
 <div className="flex-shrink-0 mb-4 md:mb-6">
 <p className="text-xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-snug">{game.currentQuestion.question}</p>
 </div>

 {/* Options */}
 <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 lg:gap-4 auto-rows-fr min-h-0">
 {game.currentQuestion.options.map((opt, i) => {
 const letter = String.fromCharCode(65 + i);
 const color = optionColors[i];
 const isCorrect = game.correctAnswer === letter;
 const isWrong = game.correctAnswer && game.correctAnswer !== letter;
 const answerCount = game.answerDistribution?.[letter as "A"|"B"|"C"|"D"] || 0;
 const pct = totalAnswers > 0 ? Math.round((answerCount / totalAnswers) * 100) : 0;

 return (
  <div key={i} className={`relative flex items-center gap-3 md:gap-4 p-3 md:p-4 lg:p-5 transition-all overflow-hidden ${gameStyles.answerOption} ${
  isCorrect ? gameStyles.answerCorrect :
  isWrong ? gameStyles.answerWrong : ""
  }`}>
 {game.status === "revealing" && totalAnswers > 0 && (
 <div className={`absolute left-0 top-0 bottom-0 transition-all duration-700 ${isCorrect ? "bg-green-500/25" : "bg-slate-500/15"}`}
 style={{ width: `${pct}%` }} />
 )}
 <div className={`relative z-10 flex items-center justify-center font-black text-xl md:text-3xl text-white shrink-0 ${gameStyles.answerLabel} ${
 isCorrect ? "bg-green-500" : isWrong ? "bg-gray-700" :
 i === 0 ? gameStyles.answerLabelA : i === 1 ? gameStyles.answerLabelB : i === 2 ? gameStyles.answerLabelC : gameStyles.answerLabelD
 }`}>{letter}</div>
 <span className={`relative z-10 font-semibold text-base md:text-xl lg:text-2xl leading-tight ${gameStyles.answerText} ${
 isCorrect ? gameStyles.answerTextCorrect : isWrong ? gameStyles.answerTextWrong : ""
 }`}>{opt.replace(/^[A-D]\)\s*/, "")}</span>
 {game.status === "revealing" && totalAnswers > 0 && (
 <span className="relative z-10 ml-auto text-lg md:text-2xl font-black opacity-70 shrink-0">{pct}%</span>
 )}
 {isCorrect && <span className="relative z-10 ml-auto text-3xl md:text-4xl animate-bounce-in shrink-0"></span>}
 </div>
 );
 })}
 </div>

 {/* Reveal Bar */}
 {game.status === "revealing" && game.correctAnswer && (
  <div className="mt-3 md:mt-4 animate-slide-in-up">
  <div className={`border-2 rounded-xl md:rounded-2xl p-3 md:p-5 text-center ${gameStyles.revealBanner}`}>
  {game.winnerDisplayName ? (
  <div>
  <p className={`text-xl md:text-3xl font-black text-yellow-300 ${gameStyles.revealBannerWinner}`} style={{ fontFamily: "Orbitron" }}> {game.winnerDisplayName}</p>
 <p className="text-sm md:text-lg text-green-400 mt-1">
 answered <span className="font-black text-xl md:text-2xl">{game.correctAnswer}</span> in {game.correctAnswerers?.[0]?.time.toFixed(1)}s!
 </p>
 {game.correctAnswerers && game.correctAnswerers.length > 1 && (
 <p className="text-xs md:text-sm text-gray-400 mt-1">+{game.correctAnswerers.length - 1} also correct</p>
 )}
 </div>
 ) : (
 <p className="text-lg md:text-2xl text-gray-400">
 Nobody answered! It was <span className="text-green-400 font-black">{game.correctAnswer}</span>
 </p>
 )}
 </div>
 </div>
 )}
 </div>
 ) : (
  <div className={`glass-card neon-border flex-1 flex items-center justify-center p-8 ${gameStyles.questionCard}`}>
  <div className="text-center">
  <div className="text-7xl md:text-8xl mb-6 animate-float"></div>
  <p className={`text-3xl md:text-4xl text-purple-300 neon-text-purple font-black ${gameStyles.getReadyText}`} style={{ fontFamily: "Orbitron" }}>GET READY!</p>
 <p className="text-lg md:text-xl text-gray-400 mt-3">Next question incoming...</p>
 </div>
 </div>
 )}

 {/* Mascot */}
 <div className="mt-2 md:mt-3 space-y-2 min-h-[50px]">
 {mascotMessages.map(msg => (
 <div key={msg.id} className="flex items-center gap-3 animate-slide-in-left">
 <div className="text-3xl md:text-4xl animate-float shrink-0"></div>
 <div className="glass-card neon-border-pink px-4 py-2 md:px-5 md:py-3 rounded-xl flex-1">
 <p className="text-sm md:text-lg font-semibold text-gray-200">{msg.text}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

  {/* Leaderboard (desktop) — trivia only */}
  {game && (
  <div className="hidden lg:flex w-80 xl:w-96 flex-col gap-3">
  <div className={`glass-card neon-border-gold p-4 xl:p-5 flex-1 overflow-hidden flex flex-col ${gameStyles.leaderboardPanel}`}>
  <h2 className={`text-lg xl:text-xl font-black text-yellow-300 mb-4 text-center ${gameStyles.leaderboardTitle}`} style={{ fontFamily: "Orbitron" }}> LEADERBOARD</h2>
 <div className="space-y-2 overflow-y-auto flex-1">
 {game.leaderboard.length > 0 ? game.leaderboard.map(p => (
 <div key={p.username} className={`flex items-center gap-3 p-2.5 xl:p-3 rounded-xl transition-all ${
 p.rank <= 3 ? "bg-gradient-to-r from-yellow-500/15 to-transparent" : "bg-slate-800/30"
 } ${p.streak >= 5 ? "ring-2 ring-orange-500/50" : ""}`}>
 <div className={`w-9 h-9 xl:w-10 xl:h-10 rounded-full flex items-center justify-center text-sm xl:text-base font-black ${
 p.rank === 1 ? "rank-1" : p.rank === 2 ? "rank-2" : p.rank === 3 ? "rank-3" : "bg-slate-700 text-gray-500"
 }`}>{p.rank}</div>
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-1">
 <span className="text-base xl:text-lg font-bold text-white truncate">{p.displayName}</span>
 {p.streak >= 3 && <span className="text-orange-400 animate-pulse shrink-0">{"".repeat(Math.min(3, Math.floor(p.streak / 3)))}</span>}
 </div>
 <div className="text-xs text-gray-500">{p.title}</div>
 </div>
 <div className="text-right shrink-0">
 <div className="font-black text-yellow-300 text-lg xl:text-xl">{p.points}</div>
 {p.streak >= 3 && <div className="text-xs text-orange-400">{p.streak}x</div>}
 </div>
 </div>
 )) : (
 <div className="text-center py-8">
 <p className="text-gray-500 text-base">No players yet!</p>
 <p className="text-cyan-400 text-lg font-bold mt-2">Type A B C D in chat!</p>
 </div>
 )}
 </div>
 </div>
 <div className="glass-card neon-border p-3 xl:p-4">
 <div className="grid grid-cols-3 gap-3 text-center">
 <div><div className="text-gray-500 text-xs">Answers</div><div className="text-cyan-400 font-black text-lg">{game.stats.totalAnswers}</div></div>
 <div><div className="text-gray-500 text-xs">Accuracy</div><div className="text-green-400 font-black text-lg">{game.stats.totalAnswers > 0 ? Math.round((game.stats.correctAnswers / game.stats.totalAnswers) * 100) : 0}%</div></div>
 <div><div className="text-gray-500 text-xs">Fastest</div><div className="text-orange-400 font-black text-lg">{game.stats.fastestAnswer ? `${game.stats.fastestAnswer.toFixed(1)}s` : "-"}</div></div>
 </div>
 </div>
  </div>
  )}
  </div>

  {/* Bottom (trivia only) */}
  {game && (
  <div className="px-4 pb-3 md:px-6 md:pb-4">
  {/* Mobile top 3 */}
  <div className="lg:hidden mb-2">
  {game.leaderboard.length > 0 && (
  <div className={`glass-card neon-border-gold px-4 py-2 rounded-xl flex items-center justify-center gap-4 ${gameStyles.bottomBar}`}>
  {game.leaderboard.slice(0, 3).map(p => (
  <div key={p.username} className="flex items-center gap-2">
  <span className="text-base">{p.rank === 1 ? "" : p.rank === 2 ? "" : ""}</span>
  <span className="text-sm font-bold text-white truncate max-w-[80px]">{p.displayName}</span>
  <span className="text-sm font-black text-yellow-300">{p.points}</span>
  </div>
  ))}
  </div>
  )}
  </div>
  <div className={`glass-card neon-border px-4 py-2.5 md:px-6 md:py-3 rounded-xl text-center ${gameStyles.bottomBar}`}>
  <p className="text-base md:text-xl lg:text-2xl text-gray-200 font-semibold">
  Type{""}
  <span className="inline-flex gap-1.5 md:gap-2 mx-1">
  <span className="bg-cyan-600 text-white font-black px-2.5 py-0.5 md:px-3 md:py-1 rounded-lg text-base md:text-xl">A</span>
  <span className="bg-pink-600 text-white font-black px-2.5 py-0.5 md:px-3 md:py-1 rounded-lg text-base md:text-xl">B</span>
  <span className="bg-amber-600 text-white font-black px-2.5 py-0.5 md:px-3 md:py-1 rounded-lg text-base md:text-xl">C</span>
  <span className="bg-emerald-600 text-white font-black px-2.5 py-0.5 md:px-3 md:py-1 rounded-lg text-base md:text-xl">D</span>
  </span>{""}in chat!
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
  <div className={`glass-card p-8 md:p-12 rounded-3xl max-w-lg ${overlayStyles.overlayPanel}`}>
  <div className="text-6xl md:text-8xl mb-4"></div>
  <p className={`text-3xl md:text-5xl font-black text-yellow-300 neon-text-gold ${overlayStyles.winnerName}`} style={{ fontFamily: "Orbitron" }}>{game.winnerDisplayName}</p>
 <p className="text-xl md:text-2xl text-green-400 mt-3 font-bold">Answered {game.correctAnswer} correctly! </p>
 </div>
 </div>
 </div>
 )}

 {/* Victory */}
  {showVictory && game?.status === "completed" && (
  <div className={`absolute inset-0 flex items-center justify-center bg-black/70 z-50 ${overlayStyles.victoryScreen}`}>
  <div className="text-center animate-scale-in max-w-2xl w-full mx-4">
  <div className={`p-8 md:p-12 ${overlayStyles.victoryPanel}`}>
  <h1 className={`text-3xl md:text-5xl font-black text-yellow-300 neon-text-gold mb-2 ${overlayStyles.victoryTitle}`} style={{ fontFamily: "Orbitron" }}> ROUND {game.currentRound} </h1>
 <p className="text-lg md:text-xl text-gray-400 mb-8">COMPLETE!</p>
 <div className="flex items-end justify-center gap-4 md:gap-8 mb-8">
 {game.leaderboard[1] && (
 <div className="text-center"><div className="text-4xl md:text-6xl trophy-2"></div>
 <div className="glass-card p-3 md:p-4 rounded-xl mt-2" style={{ minWidth: 100 }}>
 <p className="font-bold text-gray-200 text-sm md:text-lg truncate">{game.leaderboard[1].displayName}</p>
 <p className="text-xl md:text-2xl font-black text-gray-300">{game.leaderboard[1].points}</p>
 </div>
 </div>
 )}
 {game.leaderboard[0] && (
 <div className="text-center -mt-4"><div className="text-5xl md:text-7xl trophy-1"></div>
 <div className="glass-card neon-border-gold p-4 md:p-6 rounded-xl mt-2" style={{ minWidth: 140 }}>
 <p className="font-black text-yellow-300 text-lg md:text-2xl truncate" style={{ fontFamily: "Orbitron" }}>{game.leaderboard[0].displayName}</p>
 <p className="text-3xl md:text-4xl font-black text-yellow-400 neon-text-gold">{game.leaderboard[0].points}</p>
 <p className="text-xs md:text-sm text-purple-300 mt-1">{game.leaderboard[0].title}</p>
 </div>
 </div>
 )}
 {game.leaderboard[2] && (
 <div className="text-center"><div className="text-3xl md:text-5xl trophy-3"></div>
 <div className="glass-card p-3 md:p-4 rounded-xl mt-2" style={{ minWidth: 100 }}>
 <p className="font-bold text-gray-200 text-sm md:text-lg truncate">{game.leaderboard[2].displayName}</p>
 <p className="text-xl md:text-2xl font-black text-orange-300">{game.leaderboard[2].points}</p>
 </div>
 </div>
 )}
 </div>
 <div className="grid grid-cols-4 gap-2 md:gap-4 text-center mb-4">
 <div><p className="text-xs text-gray-500">Players</p><p className="text-lg md:text-2xl font-black text-cyan-400">{game.stats.totalPlayers}</p></div>
 <div><p className="text-xs text-gray-500">Questions</p><p className="text-lg md:text-2xl font-black text-purple-400">{game.stats.questionsAnswered}</p></div>
 <div><p className="text-xs text-gray-500">Accuracy</p><p className="text-lg md:text-2xl font-black text-green-400">{game.stats.totalAnswers > 0 ? `${Math.round((game.stats.correctAnswers / game.stats.totalAnswers) * 100)}%` : "N/A"}</p></div>
 <div><p className="text-xs text-gray-500">Fastest</p><p className="text-lg md:text-2xl font-black text-orange-400">{game.stats.fastestAnswer ? `${game.stats.fastestAnswer.toFixed(1)}s` : "N/A"}</p></div>
 </div>
 <p className="text-base md:text-lg text-gray-400 mt-4">GG! Thanks for playing! 🎮</p>
 </div>
 </div>
 </div>
 )}

  {/* Paused */}
  {game?.status === "paused" && (
  <div className={`absolute inset-0 flex items-center justify-center z-40 ${overlayStyles.pausedOverlay}`}>
  <div className="animate-pulse text-center">
  <div className="text-7xl md:text-9xl mb-4"></div>
  <p className={`text-4xl md:text-5xl font-black text-yellow-300 neon-text-gold ${overlayStyles.pausedText}`} style={{ fontFamily: "Orbitron" }}>PAUSED</p>
 </div>
 </div>
 )}

  {/* CSS for floating text */}
  <style jsx>{`
  @keyframes floatUp {
  0% { opacity: 1; transform: translateY(0) scale(1); }
  100% { opacity: 0; transform: translateY(-80px) scale(1.3); }
  }
  `}</style>
  </div>
  );
}

// ─── NEW IMAGE QUIZ OVERLAY COMPONENT ───
function NewImageQuizOverlay({ session }: { session: ImageQuizSessionData }) {
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
      <div className={`glass-card neon-border flex-1 flex flex-col p-4 md:p-6 animate-scale-in overflow-hidden ${gameStyles.questionCard}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className={`px-4 py-1.5 rounded-full font-black text-sm md:text-lg uppercase tracking-wider ${gameStyles.diffBadge} ${mc.bg} ${mc.text} border-2 ${mc.border}`} style={{ fontFamily: "Orbitron" }}>
            {q.quizMode === "character" ? " GUESS THE CHARACTER" :
             q.quizMode === "anime" ? " GUESS THE ANIME" :
             q.quizMode === "hair" ? " GUESS THE HAIR" :
             q.quizMode === "weapon" ? " GUESS THE WEAPON" :
             q.quizMode === "symbol" ? " GUESS THE SYMBOL" :
             q.quizMode === "outfit" ? " GUESS THE OUTFIT" :
             ` GUESS: ${q.quizMode.toUpperCase()}`}
            {" • "}{q.difficulty.toUpperCase()}
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-black ${
            session.timeRemaining <= 5 ? "bg-red-500/30 text-red-300 border-2 border-red-500/60 animate-pulse" :
            session.timeRemaining <= 10 ? "bg-yellow-500/30 text-yellow-300 border-2 border-yellow-500/60" :
            "bg-slate-700/50 text-cyan-300 border-2 border-cyan-500/40"
          }`}>
            <span className={`text-xl md:text-3xl ${gameStyles.timerNumber}`} style={{ fontFamily: "Orbitron" }}>{session.timeRemaining}</span>
            <span className="text-xs opacity-60">SEC</span>
          </div>
        </div>

        {/* Timer Bar */}
        <div className={`w-full rounded-full h-2 md:h-3 mb-4 ${gameStyles.timerBarContainer}`}>
          <div className={`h-full rounded-full transition-all duration-1000 ${gameStyles.timerBarFill} ${
            session.timeRemaining <= 5 ? gameStyles.timerCritical :
            session.timeRemaining <= 10 ? gameStyles.timerWarning :
            ""
          }`} style={{ width: `${(session.timeRemaining / q.timeLimit) * 100}%` }} />
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
            <div className="w-full shrink-0 grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {q.options.map((opt, i) => {
                const letter = String.fromCharCode(65 + i);
                const isCorrect = q.correctOptionIndex === i;
                const colors = [
                  { border: "border-cyan-500/50", bg: "bg-cyan-600/20", label: "bg-cyan-500" },
                  { border: "border-pink-500/50", bg: "bg-pink-600/20", label: "bg-pink-500" },
                  { border: "border-amber-500/50", bg: "bg-amber-600/20", label: "bg-amber-500" },
                  { border: "border-emerald-500/50", bg: "bg-emerald-600/20", label: "bg-emerald-500" },
                ][i];
                return (
                  <div key={i} className={`flex items-center gap-2 p-2 md:p-3 rounded-xl transition-all ${gameStyles.answerOption} ${
                    isRevealing && isCorrect ? gameStyles.answerCorrect :
                    isRevealing && !isCorrect ? `${gameStyles.answerWrong} opacity-40` : ""
                  }`}>
                    <div className={`flex items-center justify-center font-black text-sm md:text-lg text-white shrink-0 ${gameStyles.answerLabel} ${
                      isRevealing && isCorrect ? "bg-green-500" : isRevealing ? "bg-gray-700" :
                      i === 0 ? gameStyles.answerLabelA : i === 1 ? gameStyles.answerLabelB : i === 2 ? gameStyles.answerLabelC : gameStyles.answerLabelD
                    }`}>
                      {isRevealing && isCorrect ? "✓" : letter}
                    </div>
                    <span className={`font-semibold text-xs md:text-sm leading-tight truncate ${gameStyles.answerText} ${
                      isRevealing && isCorrect ? gameStyles.answerTextCorrect : isRevealing ? gameStyles.answerTextWrong : ""
                    }`}>{opt}</span>
                  </div>
                );
              })}
            </div>

            {/* Instructions */}
            {!isRevealing && (
              <div className="mt-2 text-center shrink-0">
                <p className="text-sm md:text-base text-cyan-400 font-semibold">
                  Type <span className="font-black text-pink-400">A B C D</span> in chat!
                </p>
                {session.timeRemaining > q.timeLimit * 0.67 && (
                  <p className="text-xs text-yellow-400 mt-1 animate-pulse"> SPEED BONUS — answer now for 2x points!</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Answer Feed */}
        {session.answerFeed.length > 0 && (
          <div className="mt-2 glass-card rounded-lg px-3 py-2 max-h-16 overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-500 font-bold">LIVE ANSWERS</span>
              <span className="text-xs text-gray-600">({session.answerFeed.length})</span>
            </div>
            {session.answerFeed.slice(-4).map((a, i) => (
              <div key={i} className={`text-xs py-0.5 animate-slide-in-left ${a.correct ? "text-green-400 font-bold" : "text-gray-500"}`}>
                <span className="font-bold">{a.displayName}:</span> {a.answer}
                {a.correct && ` (${a.time.toFixed(1)}s)`}
              </div>
            ))}
          </div>
        )}

        {/* Winner Banner */}
        {isRevealing && (
          <div className="mt-3 animate-bounce-in">
            <div className="bg-green-500/15 border-2 border-green-500/40 rounded-xl p-4 text-center">
              <p className="text-xl md:text-3xl font-black text-green-400"> {q.correctAnswer}</p>
              {session.winners.length > 0 ? (
                <div className="mt-2">
                  <p className="text-lg text-yellow-300 font-bold"> {session.winners[0].displayName} ({session.winners[0].time.toFixed(1)}s)</p>
                </div>
              ) : (
                <p className="text-lg text-gray-400 mt-1">Nobody got it!</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}