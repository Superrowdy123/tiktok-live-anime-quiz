import type { Player, GameState, MascotMessage, PowerUpType, PowerScalingFighter, PowerScalingBattle } from "./types";
import allQuestions, { getQuestionsForRound, getTotalRounds, type Question } from "@/data/questions";
const DIFFICULTY_POINTS: Record<string, number> = { easy: 10, medium: 20, hard: 30 };
const STREAK_BONUSES: Record<number, number> = { 1: 5, 3: 15, 5: 30, 10: 100 };
const TITLES: { minPoints: number; title: string }[] = [
 { minPoints: 0, title: "Anime Rookie" }, { minPoints: 100, title: "Otaku Apprentice" },
 { minPoints: 300, title: "Otaku" }, { minPoints: 500, title: "Anime Expert" },
 { minPoints: 1000, title: "Anime Sage" }, { minPoints: 2000, title: "Legendary Weeb" },
 { minPoints: 5000, title: "Anime God" },
];
const TEAMS = ["Team Shonen", "Team Seinen", "Team Isekai", "Team Romance"];

const MASCOT_CORRECT = [
 "Sugoi! {name} nailed it! ", "{name} is on fire! ", "Sasuga {name}! ",
 "{name} knows their anime! ", "Yatta! {name} got it! ", "{name} answered in {time}s! ",
];
const MASCOT_NO_ANSWER = [
 " No one got it! Answer: {answer}", " Tough one! It was {answer}", " Study up! Answer: {answer}",
];

function pick(arr: string[]): string { return arr[Math.floor(Math.random() * arr.length)]; }

function isCorrectAnswer(msg: string, ans: "A"|"B"|"C"|"D"): boolean {
 return msg.trim().toUpperCase() === ans;
}

export interface AnswerDistribution { A: number; B: number; C: number; D: number; }

export type GameMode = "quiz" | "power_scaling";

export class GameEngine {
 // Existing state 
 private currentRound = 1;
 private roundQuestions: Question[] = [];
 private players: Map<string, Player> = new Map();
 private antiCheat: Map<string, { lastMessageTime: number; messageCount: number; cooldownUntil: number; warnings: number }> = new Map();
 private answeredThisQuestion: Set<string> = new Set();
 private questionTimer: ReturnType<typeof setTimeout> | null = null;
 private state: GameState;
 private answerDistribution: AnswerDistribution = { A: 0, B: 0, C: 0, D: 0 };
 private correctAnswerers: { username: string; displayName: string; time: number }[] = [];
 private timeWarningShown = false;
 private onStateChange: ((state: GameState) => void) | null = null;
 private onEvent: ((event: { type: string; data: unknown }) => void) | null = null;

  // Game mode state 
  private gameMode: GameMode = "quiz";
  private powerBattle: PowerScalingBattle | null = null;
  private battleTimer: ReturnType<typeof setTimeout> | null = null;

 constructor() { this.state = this.getInitialState(); }

 private getInitialState(): GameState {
 return {
 status: "waiting", sessionId: null, currentQuestion: null, currentQuestionIndex: -1,
 totalQuestions: 30, questionStartTime: null, timeRemaining: 0, leaderboard: [],
 answeredPlayers: new Set(), correctAnswer: null, winner: null, winnerDisplayName: null,
 bossRound: false, difficulty: "mixed", season: null, questionsAsked: 0,
 totalPlayers: 0,
 stats: { totalPlayers: 0, questionsAnswered: 0, totalAnswers: 0, correctAnswers: 0,
 fastestAnswer: null, fastestPlayer: null, mostActivePlayer: null, sessionDuration: 0, startTime: null },
 };
 }

 private ensurePlayer(username: string, displayName: string): Player {
 if (!this.players.has(username)) {
 this.players.set(username, {
 tiktokUsername: username, displayName, points: 0, streak: 0, bestStreak: 0,
 correctAnswers: 0, totalAnswers: 0, fastestAnswer: null,
 team: TEAMS[Math.floor(Math.random() * TEAMS.length)],
 powerUps: { double: 1, shield: 1, steal: 1 }, rank: 0, title: "Anime Rookie",
 lastAnswerTime: 0, voteCount: 0,
 });
 this.emitEvent("new_player", { username, displayName });
 }
 return this.players.get(username)!;
 }

 setOnStateChange(cb: (state: GameState) => void) { this.onStateChange = cb; }
 setOnEvent(cb: (event: { type: string; data: unknown }) => void) { this.onEvent = cb; }
 private emitState() { this.onStateChange?.(this.getPublicState()); }
 private emitEvent(type: string, data: unknown) { this.onEvent?.({ type, data }); }

 getPublicState(): GameState {
 return { ...this.state, leaderboard: this.getLeaderboard(), totalPlayers: this.players.size,
 answeredPlayers: new Set(this.answeredThisQuestion),
 stats: { ...this.state.stats, totalPlayers: this.players.size,
 sessionDuration: this.state.stats.startTime ? Date.now() - this.state.stats.startTime : 0 } };
 }

 getCurrentRound(): number { return this.currentRound; }
 getTotalRounds(): number { return getTotalRounds(); }
 getAnswerDistribution(): AnswerDistribution { return { ...this.answerDistribution }; }
 getCorrectAnswerers() { return [...this.correctAnswerers]; }
  getGameMode(): GameMode { return this.gameMode; }
  getPowerBattle(): PowerScalingBattle | null {
 if (!this.powerBattle) return null;
 return { ...this.powerBattle, fighters: this.powerBattle.fighters.map(f => ({ ...f, voters: new Set(f.voters) })) };
 }

 // 
 // EXISTING: Quiz mode (unchanged logic)
 // 

 startGame(options: { round?: number; sessionId: number }) {
 const { round = 1, sessionId } = options;
 this.currentRound = Math.max(1, Math.min(round, getTotalRounds()));
 this.roundQuestions = getQuestionsForRound(this.currentRound);
 this.players.clear(); this.antiCheat.clear();
 this.answerDistribution = { A: 0, B: 0, C: 0, D: 0 }; this.correctAnswerers = [];
  this.gameMode = "quiz";
  this.powerBattle = null;
 this.state = { ...this.getInitialState(), status: "active", sessionId,
 totalQuestions: this.roundQuestions.length, difficulty: "mixed",
 stats: { ...this.getInitialState().stats, startTime: Date.now() } };
 this.emitState();
 this.emitEvent("game_start", { round: this.currentRound, totalQuestions: this.roundQuestions.length });
 this.emitEvent("sound", "game_start");
 this.emitEvent("mascot", this.msg("info", `🎮 Round ${this.currentRound}! 30 questions. Answer A, B, C, or D!`));
 }

 nextQuestion() {
 if (this.state.status === "completed") return;
 const nextIndex = this.state.currentQuestionIndex + 1;
 if (nextIndex >= this.roundQuestions.length) { this.endGame(); return; }
 const question = this.roundQuestions[nextIndex];
 if (this.questionTimer) { clearTimeout(this.questionTimer); this.questionTimer = null; }
 this.answeredThisQuestion.clear();
 this.answerDistribution = { A: 0, B: 0, C: 0, D: 0 }; this.correctAnswerers = [];
 this.timeWarningShown = false; this.gameMode = "quiz";
 const gq = { id: question.id, type: question.type as string, difficulty: question.difficulty as string,
 question: question.question, options: question.options.map((o, i) => `${String.fromCharCode(65+i)}) ${o}`),
 answer: question.answer, timeLimit: question.timeLimit };
 this.state = { ...this.state, status: "question", currentQuestion: gq, currentQuestionIndex: nextIndex,
 questionStartTime: Date.now(), timeRemaining: question.timeLimit, correctAnswer: null,
 winner: null, winnerDisplayName: null, bossRound: false, questionsAsked: nextIndex + 1 };
 this.emitState();
 if (nextIndex === 0) this.emitEvent("mascot", this.msg("info", " EASY ROUND — 10 pts each!"));
 else if (nextIndex === 10) { this.emitEvent("mascot", this.msg("info", " MEDIUM ROUND — 20 pts each!")); this.emitEvent("sound", "phase_change"); }
 else if (nextIndex === 20) { this.emitEvent("mascot", this.msg("info", " HARD ROUND — 30 pts each! ")); this.emitEvent("sound", "phase_change"); }
 this.emitEvent("new_question", { questionNumber: nextIndex+1, total: this.roundQuestions.length, difficulty: question.difficulty });
 this.emitEvent("sound", "new_question");
 this.startQuestionTimer(question.timeLimit);
 }

 private startQuestionTimer(seconds: number) {
 if (this.questionTimer) clearTimeout(this.questionTimer);
 let remaining = seconds;
 const tick = () => {
 remaining--;
 this.state.timeRemaining = remaining;
 this.emitState();
 if (remaining === 10 && !this.timeWarningShown) { this.timeWarningShown = true; this.emitEvent("sound", "time_warning"); }
 if (remaining <= 5 && remaining > 0) this.emitEvent("sound", "countdown_tick");
 if (remaining <= 0) this.timeUp();
 else this.questionTimer = setTimeout(tick, 1000);
 };
 this.questionTimer = setTimeout(tick, 1000);
 }

 private timeUp() {
 if (this.state.status !== "question") return;
 const currentQ = this.roundQuestions[this.state.currentQuestionIndex];
 this.state.status = "revealing"; this.state.correctAnswer = currentQ?.answer ?? null;
 this.state.stats.questionsAnswered++; this.emitState();
 if (this.correctAnswerers.length === 0) {
 this.emitEvent("mascot", this.msg("info", pick(MASCOT_NO_ANSWER).replace("{answer}", currentQ?.answer || "?")));
 }
 this.emitEvent("time_up", { answer: this.state.correctAnswer, distribution: this.answerDistribution });
 this.emitEvent("sound", "time_up");
 }

  processAnswer(username: string, displayName: string, message: string): { correct: boolean; reason: string } {
  if (this.gameMode === "power_scaling") return this.processVote(username, displayName, message);

 if (this.state.status !== "question") return { correct: false, reason: `Not in question mode (${this.state.status})` };
 const currentQ = this.roundQuestions[this.state.currentQuestionIndex];
 if (!currentQ) return { correct: false, reason: "No active question" };
 if (!this.passAntiCheat(username)) return { correct: false, reason: "Rate limited" };
 if (this.answeredThisQuestion.has(username)) return { correct: false, reason: "Already answered" };
 const cleaned = message.trim().toUpperCase();
 if (!["A","B","C","D"].includes(cleaned)) return { correct: false, reason: `Type A, B, C, or D` };

 this.answerDistribution[cleaned as "A"|"B"|"C"|"D"]++;
 const isCorrect = isCorrectAnswer(message, currentQ.answer);
 const player = this.ensurePlayer(username, displayName);
 this.answeredThisQuestion.add(username);
 player.totalAnswers++; this.state.stats.totalAnswers++;

 if (isCorrect) {
 const answerTime = this.state.questionStartTime ? (Date.now() - this.state.questionStartTime) / 1000 : 0;
 this.correctAnswerers.push({ username, displayName, time: answerTime });
 let points = DIFFICULTY_POINTS[currentQ.difficulty] || 10;
 player.streak++;
 if (player.streak > player.bestStreak) player.bestStreak = player.streak;
 const streakBonus = STREAK_BONUSES[player.streak] || 0;
 points += streakBonus;
 player.points += points; player.correctAnswers++;
 if (!player.fastestAnswer || answerTime < player.fastestAnswer) player.fastestAnswer = answerTime;
 player.lastAnswerTime = answerTime; player.title = this.getTitle(player.points);
 this.state.stats.correctAnswers++;
 if (!this.state.stats.fastestAnswer || answerTime < this.state.stats.fastestAnswer) {
 this.state.stats.fastestAnswer = answerTime; this.state.stats.fastestPlayer = displayName;
 }
 if (!this.state.winner) {
 this.state.winner = username; this.state.winnerDisplayName = displayName;
 this.state.correctAnswer = currentQ.answer; this.state.status = "revealing";
 this.state.stats.questionsAnswered++;
 if (this.questionTimer) { clearTimeout(this.questionTimer); this.questionTimer = null; }
 this.emitEvent("correct_answer", { username, displayName, points, streak: player.streak, answerTime: answerTime.toFixed(1), answer: currentQ.answer, distribution: this.answerDistribution });
 this.emitEvent("sound", "correct");
 if (player.streak >= 10) this.emitEvent("mascot", this.msg("streak", ` LEGENDARY! ${displayName} — ${player.streak} streak!`));
 else if (player.streak >= 5) this.emitEvent("mascot", this.msg("streak", ` ${displayName} ON FIRE! ${player.streak}-streak!`));
 else if (player.streak >= 3) this.emitEvent("mascot", this.msg("streak", ` ${displayName} — ${player.streak} in a row!`));
 else {
 const lb = this.getLeaderboard();
 if (lb.length > 0 && lb[0].tiktokUsername === username && this.state.questionsAsked > 1)
 this.emitEvent("mascot", this.msg("winner", ` NEW LEADER: ${displayName} with ${player.points} pts!`));
 else this.emitEvent("mascot", this.msg("correct", pick(MASCOT_CORRECT).replace("{name}", displayName).replace("{time}", answerTime.toFixed(1))));
 }
 }
 this.emitState();
 return { correct: true, reason: `Correct! +${points} pts` };
 } else {
 player.streak = 0;
 return { correct: false, reason: `Wrong! You: ${cleaned}, Correct: ${currentQ.answer}` };
 }
 }

  // 
  // NEW FEATURE: Power Scaling Battles with Live Vote Bars
  // 

 startPowerBattle(fighters: { name: string; anime: string; stats?: Partial<PowerScalingFighter["stats"]> }[], timeLimit = 30) {
 if (this.battleTimer) clearTimeout(this.battleTimer);
 this.gameMode = "power_scaling";
 const labels = ["A", "B", "C", "D", "E", "F"];
 this.powerBattle = {
 id: `battle_${Date.now()}`,
 fighters: fighters.slice(0, 6).map((f, i) => ({
 label: labels[i], name: f.name, anime: f.anime,
 stats: {
 power: f.stats?.power ?? 50 + Math.floor(Math.random() * 50),
 speed: f.stats?.speed ?? 50 + Math.floor(Math.random() * 50),
 defense: f.stats?.defense ?? 50 + Math.floor(Math.random() * 50),
 technique: f.stats?.technique ?? 50 + Math.floor(Math.random() * 50),
 special: f.stats?.special ?? 50 + Math.floor(Math.random() * 50),
 },
 votes: 0, voters: new Set(),
 })),
 status: "voting", startTime: Date.now(), timeLimit, timeRemaining: timeLimit, totalVotes: 0,
 };
 this.emitState();
 const names = this.powerBattle.fighters.map(f => `${f.label}=${f.name}`).join(", ");
 this.emitEvent("mascot", this.msg("info", ` POWER SCALING BATTLE! Vote: ${names}! Type the letter!`));
 this.emitEvent("power_battle_start", { fighters: this.powerBattle.fighters.map(f => ({ label: f.label, name: f.name, anime: f.anime, stats: f.stats })) });
 this.emitEvent("sound", "game_start");
 this.startBattleTimer(timeLimit);
 }

 private startBattleTimer(seconds: number) {
 if (this.battleTimer) clearTimeout(this.battleTimer);
 let remaining = seconds;
 const tick = () => {
 remaining--;
 if (this.powerBattle) { this.powerBattle.timeRemaining = remaining; this.emitState(); }
 if (remaining === 10) this.emitEvent("sound", "time_warning");
 if (remaining <= 5 && remaining > 0) this.emitEvent("sound", "countdown_tick");
 if (remaining <= 0) this.endPowerBattle();
 else this.battleTimer = setTimeout(tick, 1000);
 };
 this.battleTimer = setTimeout(tick, 1000);
 }

 private endPowerBattle() {
 if (!this.powerBattle) return;
 this.powerBattle.status = "results";
 const sorted = [...this.powerBattle.fighters].sort((a, b) => b.votes - a.votes);
 const winner = sorted[0];
 this.emitState();
 this.emitEvent("power_battle_end", { winner: { name: winner.name, votes: winner.votes }, results: sorted.map(f => ({ label: f.label, name: f.name, votes: f.votes })) });
 this.emitEvent("mascot", this.msg("winner", ` ${winner.name} wins with ${winner.votes} votes!`));
 this.emitEvent("sound", "game_complete");
 // Award bonus to voters who picked the winner
 for (const voterId of winner.voters) {
 const player = this.players.get(voterId);
 if (player) { player.points += 5; player.voteCount++; }
 }
 this.emitState();
 }

 processVote(username: string, displayName: string, message: string): { correct: boolean; reason: string } {
 if (!this.powerBattle || this.powerBattle.status !== "voting")
 return { correct: false, reason: "No active battle" };
 if (!this.passAntiCheat(username)) return { correct: false, reason: "Rate limited" };

 const letter = message.trim().toUpperCase();
 const fighter = this.powerBattle.fighters.find(f => f.label === letter);
 if (!fighter) return { correct: false, reason: `Type ${this.powerBattle.fighters.map(f => f.label).join(", ")}` };

 // Check if already voted
 for (const f of this.powerBattle.fighters) {
 if (f.voters.has(username)) return { correct: false, reason: "Already voted" };
 }

 const player = this.ensurePlayer(username, displayName);
 fighter.votes++;
 fighter.voters.add(username);
 this.powerBattle.totalVotes++;
 player.voteCount++;
 this.emitState();
 this.emitEvent("vote", { username, displayName, fighter: fighter.name, label: fighter.label, totalVotes: this.powerBattle.totalVotes });
 return { correct: true, reason: `Voted for ${fighter.name}!` };
 }

 // 
 // EXISTING: Controls (preserved)
 // 

 processPowerUp(username: string, powerUp: PowerUpType): boolean {
 const player = this.players.get(username);
 if (!player) return false;
 const count = player.powerUps[powerUp] || 0;
 if (count <= 0) return false;
 switch (powerUp) {
 case "double": player.powerUps.double--; this.emitEvent("power_up", { username, displayName: player.displayName, type: "double" }); return true;
 case "shield": player.powerUps.shield--; this.emitEvent("power_up", { username, displayName: player.displayName, type: "shield" }); return true;
 case "steal": {
 player.powerUps.steal--;
 const others = Array.from(this.players.values()).filter(p => p.tiktokUsername !== username && p.points > 0);
 if (others.length > 0) {
 const victim = others[Math.floor(Math.random() * others.length)];
 const stolen = Math.min(10, victim.points);
 victim.points -= stolen; player.points += stolen;
 this.emitEvent("power_up", { username, displayName: player.displayName, type: "steal", victim: victim.displayName, amount: stolen });
 }
 return true;
 }
 }
 return false;
 }

  pauseGame() {
  if (this.state.status === "question") { if (this.questionTimer) { clearTimeout(this.questionTimer); this.questionTimer = null; } this.state.status = "paused"; this.emitState(); }
  if (this.powerBattle?.status === "voting") { if (this.battleTimer) { clearTimeout(this.battleTimer); this.battleTimer = null; } }
  }

  resumeGame() {
  if (this.state.status === "paused" && this.state.currentQuestion) { this.state.status = "question"; this.startQuestionTimer(this.state.timeRemaining); this.emitState(); }
  if (this.powerBattle?.status === "voting" && !this.battleTimer) this.startBattleTimer(this.powerBattle.timeRemaining);
  }

  skipQuestion() { if (this.questionTimer) { clearTimeout(this.questionTimer); this.questionTimer = null; } this.timeUp(); }
  addPoints(username: string, points: number) { const p = this.players.get(username); if (p) { p.points += points; p.title = this.getTitle(p.points); this.emitState(); } }
  banPlayer(username: string) { this.players.delete(username); this.emitState(); }

  resetGame() {
  if (this.questionTimer) { clearTimeout(this.questionTimer); this.questionTimer = null; }
  if (this.battleTimer) { clearTimeout(this.battleTimer); this.battleTimer = null; }
  this.players.clear(); this.antiCheat.clear(); this.answeredThisQuestion.clear();
  this.answerDistribution = { A: 0, B: 0, C: 0, D: 0 }; this.correctAnswerers = [];
  this.gameMode = "quiz"; this.powerBattle = null;
  this.state = this.getInitialState(); this.emitState();
  }

  endGame() {
  if (this.questionTimer) { clearTimeout(this.questionTimer); this.questionTimer = null; }
  if (this.battleTimer) { clearTimeout(this.battleTimer); this.battleTimer = null; }
  this.state.status = "completed"; this.emitState();
  const top3 = this.getLeaderboard().slice(0, 3);
  this.emitEvent("game_complete", { winners: top3, round: this.currentRound });
  this.emitEvent("sound", "game_complete");
  if (top3.length >= 1) this.emitEvent("mascot", this.msg("winner", ` ROUND ${this.currentRound} CHAMPION: ${top3[0].displayName} with ${top3[0].points} pts! `));
  }

 // Stop power battle early
 closePowerBattle() {
 if (this.battleTimer) { clearTimeout(this.battleTimer); this.battleTimer = null; }
 this.endPowerBattle();
 }

 resetVotes() {
 if (this.powerBattle) {
 this.powerBattle.fighters.forEach(f => { f.votes = 0; f.voters.clear(); });
 this.powerBattle.totalVotes = 0;
 this.emitState();
 }
 }

 getLeaderboard(): Player[] {
 const players = Array.from(this.players.values());
 players.sort((a, b) => b.points - a.points || (a.fastestAnswer ?? 999) - (b.fastestAnswer ?? 999));
 return players.map((p, i) => ({ ...p, rank: i + 1 }));
 }

 getWinners(): Player[] { return this.getLeaderboard().slice(0, 3); }

 getFullStats() {
 const players = Array.from(this.players.values());
 let mostActive: Player | null = null;
 for (const p of players) if (!mostActive || p.totalAnswers > mostActive.totalAnswers) mostActive = p;
 return { ...this.state.stats, totalPlayers: players.length, mostActivePlayer: mostActive?.displayName ?? null,
 sessionDuration: this.state.stats.startTime ? Date.now() - this.state.stats.startTime : 0,
 currentRound: this.currentRound, totalRounds: getTotalRounds(), gameMode: this.gameMode };
 }

 getExportData() {
 return { session: { id: this.state.sessionId, status: this.state.status, totalQuestions: this.state.totalQuestions, questionsAsked: this.state.questionsAsked, round: this.currentRound },
 leaderboard: this.getLeaderboard(), stats: this.getFullStats() };
 }

 private passAntiCheat(username: string): boolean {
 const now = Date.now();
 let r = this.antiCheat.get(username);
 if (!r) { r = { lastMessageTime: 0, messageCount: 0, cooldownUntil: 0, warnings: 0 }; this.antiCheat.set(username, r); }
 if (now < r.cooldownUntil) return false;
 if (now - r.lastMessageTime < 2000) { r.messageCount++; if (r.messageCount > 3) { r.warnings++; r.cooldownUntil = now + 5000; return false; } } else r.messageCount = 1;
 r.lastMessageTime = now; return true;
 }

 private getTitle(points: number): string { let t = "Anime Rookie"; for (const x of TITLES) if (points >= x.minPoints) t = x.title; return t; }
 private msg(type: MascotMessage["type"], text: string): MascotMessage {
 const e: Record<string, string> = { question:"", correct:"", streak:"", boss:"", winner:"", motivational:"", info:"" };
 return { text, emoji: e[type] || "🎮", type };
 }
}

// Singleton survives HMR
const g = globalThis as typeof globalThis & { __animeWizGameEngine?: GameEngine };
export function getGameEngine(): GameEngine { if (!g.__animeWizGameEngine) g.__animeWizGameEngine = new GameEngine(); return g.__animeWizGameEngine; }
