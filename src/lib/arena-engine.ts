// 
// ANIME WIZ — Power Scaling Arena Engine
// Tug-of-war, attack system, random events, hype engine, predictions, boss raids
// 

export interface ArenaFighter {
 label: string;
 name: string;
 anime: string;
 hp: number;
 maxHp: number;
 votes: number;
 voters: Set<string>;
 attacks: { threshold: number; name: string; triggered: boolean }[];
 percentage: number;
}

export interface RandomEvent {
 id: string;
 name: string;
 description: string;
 multiplier: number;
 duration: number;
 startTime: number;
 active: boolean;
}

export interface ArenaState {
 mode: "vote" | "tug_of_war" | "boss_raid" | "tournament";
 status: "idle" | "voting" | "event" | "results";
 fighters: ArenaFighter[];
 totalVotes: number;
 timeRemaining: number;
 timeLimit: number;
 tugPosition: number; // -100 to 100, 0 is center
 activeEvent: RandomEvent | null;
 hypeScore: number;
 hypeLevel: "cold" | "warm" | "hot" | "blazing" | "legendary";
 messagesPerSecond: number;
 predictions: Map<string, string>; // username -> fighter label
 mvp: { username: string; displayName: string; votes: number } | null;
 attackLog: { fighter: string; attack: string; time: number }[];
 // Boss raid
 bossHp: number;
 bossMaxHp: number;
 bossName: string;
 bossPhase: number;
 comboDamage: number;
 comboCount: number;
 lastDamageTime: number;
 // Tournament
 tournamentRound: string;
 tournamentBracket: { round: string; matchup: string; winner?: string }[];
}

const RANDOM_EVENTS = [
 { name: "DOUBLE VOTES", description: "All votes count DOUBLE!", multiplier: 2 },
 { name: "TRIPLE VOTES", description: "All votes count TRIPLE!", multiplier: 3 },
 { name: "VOTE FRENZY", description: "Vote cooldown removed! Spam away!", multiplier: 1.5 },
 { name: "COMEBACK BOOST", description: "Losing side gets 3x votes!", multiplier: 3 },
 { name: "FINAL PUSH", description: "Last 10 seconds! Every vote counts double!", multiplier: 2 },
];

const ATTACK_THRESHOLDS = [
 { threshold: 10, name: "Basic Attack" },
 { threshold: 50, name: "Special Move" },
 { threshold: 100, name: "Ultimate Move" },
 { threshold: 250, name: "Transformation" },
 { threshold: 500, name: "Legendary Form" },
];

export class ArenaEngine {
 private state: ArenaState;
 private timer: ReturnType<typeof setTimeout> | null = null;
 private eventTimer: ReturnType<typeof setTimeout> | null = null;
 private hypeTracker: number[] = []; // timestamps of recent messages

 constructor() {
 this.state = this.getInitialState();
 }

 private getInitialState(): ArenaState {
 return {
 mode: "vote", status: "idle", fighters: [], totalVotes: 0,
 timeRemaining: 0, timeLimit: 30, tugPosition: 0,
 activeEvent: null, hypeScore: 0, hypeLevel: "cold",
 messagesPerSecond: 0, predictions: new Map(),
 mvp: null, attackLog: [],
 bossHp: 0, bossMaxHp: 0, bossName: "", bossPhase: 1,
 comboDamage: 0, comboCount: 0, lastDamageTime: 0,
 tournamentRound: "", tournamentBracket: [],
 };
 }

 getState(): ArenaState {
 return {
 ...this.state,
 fighters: this.state.fighters.map(f => ({ ...f, voters: new Set(f.voters) })),
 predictions: new Map(this.state.predictions),
 };
 }

 // Standard Vote Battle 
 startBattle(fighters: { name: string; anime: string }[], timeLimit: number, mode: "vote" | "tug_of_war" = "vote") {
 this.cleanup();
 const labels = ["A", "B", "C", "D", "E", "F"];
 this.state = {
 ...this.getInitialState(),
 mode,
 status: "voting",
 timeLimit,
 timeRemaining: timeLimit,
 fighters: fighters.slice(0, 6).map((f, i) => ({
 label: labels[i], name: f.name, anime: f.anime,
 hp: 1000, maxHp: 1000, votes: 0, voters: new Set(),
 attacks: ATTACK_THRESHOLDS.map(a => ({ ...a, triggered: false })),
 percentage: 0,
 })),
 };
 this.startTimer(timeLimit);
 // Schedule random event
 if (timeLimit >= 20) {
 const eventTime = 10 + Math.floor(Math.random() * (timeLimit - 15));
 this.eventTimer = setTimeout(() => this.triggerRandomEvent(), eventTime * 1000);
 }
 return this.state;
 }

 // Boss Raid 
 startBossRaid(bossName: string, bossHp: number, timeLimit: number) {
 this.cleanup();
 this.state = {
 ...this.getInitialState(),
 mode: "boss_raid", status: "voting",
 timeLimit, timeRemaining: timeLimit,
 bossName, bossHp, bossMaxHp: bossHp, bossPhase: 1,
 fighters: [{ label: "BOSS", name: bossName, anime: "", hp: bossHp, maxHp: bossHp,
 votes: 0, voters: new Set(), attacks: [], percentage: 100 }],
 };
 this.startTimer(timeLimit);
 return this.state;
 }

 // Process Vote 
 processVote(username: string, displayName: string, message: string): { accepted: boolean; result: string } {
 if (this.state.status !== "voting") return { accepted: false, result: "Not voting" };

 const letter = message.trim().toUpperCase();
 this.trackHype();

 // Boss raid: any message is an "attack"
 if (this.state.mode === "boss_raid") {
 return this.processBossAttack(username, displayName);
 }

 const fighter = this.state.fighters.find(f => f.label === letter);
 if (!fighter) return { accepted: false, result: `Type ${this.state.fighters.map(f => f.label).join("/")}` };

 // Check duplicate
 for (const f of this.state.fighters) {
 if (f.voters.has(username)) return { accepted: false, result: "Already voted" };
 }

 // Apply event multiplier
 let voteWeight = 1;
 if (this.state.activeEvent?.active) {
 voteWeight = this.state.activeEvent.multiplier;
 // Comeback boost: only applies to losing side
 if (this.state.activeEvent.name === "COMEBACK BOOST") {
 const maxVotes = Math.max(...this.state.fighters.map(f => f.votes));
 voteWeight = fighter.votes < maxVotes ? 3 : 1;
 }
 }

 fighter.votes += voteWeight;
 fighter.voters.add(username);
 this.state.totalVotes += voteWeight;

 // Update percentages
 for (const f of this.state.fighters) {
 f.percentage = this.state.totalVotes > 0 ? Math.round((f.votes / this.state.totalVotes) * 100) : 0;
 }

 // Tug of war position (only for 2 fighters)
 if (this.state.mode === "tug_of_war" && this.state.fighters.length === 2) {
 const [a, b] = this.state.fighters;
 const total = a.votes + b.votes;
 this.state.tugPosition = total > 0 ? Math.round(((a.votes - b.votes) / total) * 100) : 0;
 }

 // Check attack thresholds
 for (const attack of fighter.attacks) {
 if (!attack.triggered && fighter.votes >= attack.threshold) {
 attack.triggered = true;
 this.state.attackLog.push({ fighter: fighter.name, attack: attack.name, time: Date.now() });
 }
 }

 // Track MVP
 const allVoters = new Map<string, { displayName: string; votes: number }>();
 for (const f of this.state.fighters) {
 for (const v of f.voters) {
 const existing = allVoters.get(v);
 allVoters.set(v, { displayName: existing?.displayName || displayName, votes: (existing?.votes || 0) + 1 });
 }
 }
 // MVP is always the earliest voter with most participation in this implementation
 if (!this.state.mvp || this.state.mvp.username === username) {
 this.state.mvp = { username, displayName, votes: 1 };
 }

 return { accepted: true, result: `Voted for ${fighter.name}!` };
 }

 // Boss Attack 
 private processBossAttack(username: string, displayName: string): { accepted: boolean; result: string } {
 const now = Date.now();
 // Combo system
 if (now - this.state.lastDamageTime < 2000) {
 this.state.comboCount++;
 } else {
 this.state.comboCount = 1;
 }
 this.state.lastDamageTime = now;

 // Base damage + combo multiplier
 let damage = 1 + Math.floor(this.state.comboCount / 5);
 // Critical hit (10% chance)
 const isCritical = Math.random() < 0.1;
 if (isCritical) damage *= 3;

 this.state.comboDamage += damage;
 this.state.bossHp = Math.max(0, this.state.bossHp - damage);
 this.state.totalVotes++;

 if (this.state.fighters[0]) {
 this.state.fighters[0].hp = this.state.bossHp;
 this.state.fighters[0].percentage = Math.round((this.state.bossHp / this.state.bossMaxHp) * 100);
 this.state.fighters[0].voters.add(username);
 }

 // Phase transitions
 const hpPercent = (this.state.bossHp / this.state.bossMaxHp) * 100;
 if (hpPercent <= 25 && this.state.bossPhase < 4) { this.state.bossPhase = 4; this.state.attackLog.push({ fighter: "BOSS", attack: "FINAL PHASE!", time: now }); }
 else if (hpPercent <= 50 && this.state.bossPhase < 3) { this.state.bossPhase = 3; this.state.attackLog.push({ fighter: "BOSS", attack: "PHASE 3 - ENRAGED!", time: now }); }
 else if (hpPercent <= 75 && this.state.bossPhase < 2) { this.state.bossPhase = 2; this.state.attackLog.push({ fighter: "BOSS", attack: "PHASE 2!", time: now }); }

 // Boss defeated
 if (this.state.bossHp <= 0) {
 this.state.status = "results";
 if (this.timer) { clearTimeout(this.timer); this.timer = null; }
 this.state.attackLog.push({ fighter: "CHAT", attack: "BOSS DEFEATED!", time: now });
 }

 return { accepted: true, result: isCritical ? `CRITICAL HIT! ${damage} damage!` : `${damage} damage!` };
 }

 // Prediction 
 addPrediction(username: string, fighterLabel: string): boolean {
 if (this.state.predictions.has(username)) return false;
 if (!this.state.fighters.find(f => f.label === fighterLabel)) return false;
 this.state.predictions.set(username, fighterLabel);
 return true;
 }

 getPredictionResults(): { correct: string[]; winnerLabel: string } {
 const sorted = [...this.state.fighters].sort((a, b) => b.votes - a.votes);
 const winnerLabel = sorted[0]?.label || "";
 const correct: string[] = [];
 for (const [username, label] of this.state.predictions) {
 if (label === winnerLabel) correct.push(username);
 }
 return { correct, winnerLabel };
 }

 // Random Events 
 private triggerRandomEvent() {
 const event = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
 this.state.activeEvent = {
 id: `event_${Date.now()}`, name: event.name, description: event.description,
 multiplier: event.multiplier, duration: 10, startTime: Date.now(), active: true,
 };
 this.state.status = "event";
 setTimeout(() => {
 if (this.state.activeEvent) {
 this.state.activeEvent.active = false;
 this.state.status = "voting";
 }
 }, 10000);
 }

 triggerEventManually(eventName?: string) {
 const event = eventName
 ? RANDOM_EVENTS.find(e => e.name === eventName) || RANDOM_EVENTS[0]
 : RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
 this.state.activeEvent = {
 id: `event_${Date.now()}`, name: event.name, description: event.description,
 multiplier: event.multiplier, duration: 10, startTime: Date.now(), active: true,
 };
 }

 // Hype Tracking 
 private trackHype() {
 const now = Date.now();
 this.hypeTracker.push(now);
 // Keep last 10 seconds
 this.hypeTracker = this.hypeTracker.filter(t => now - t < 10000);
 this.state.messagesPerSecond = Math.round(this.hypeTracker.length / 10);
 this.state.hypeScore = Math.min(100, this.hypeTracker.length * 2);
 if (this.state.hypeScore >= 80) this.state.hypeLevel = "legendary";
 else if (this.state.hypeScore >= 60) this.state.hypeLevel = "blazing";
 else if (this.state.hypeScore >= 40) this.state.hypeLevel = "hot";
 else if (this.state.hypeScore >= 20) this.state.hypeLevel = "warm";
 else this.state.hypeLevel = "cold";
 }

  // Timer (0 = no timer / host controlled)
  private startTimer(seconds: number) {
  if (this.timer) clearTimeout(this.timer);
  if (seconds <= 0) {
  // No timer mode - stays open until host ends it
  this.state.timeRemaining = 0;
  return;
  }
  let remaining = seconds;
  const tick = () => {
  remaining--;
  this.state.timeRemaining = remaining;
  if (remaining <= 0) { this.endBattle(); }
  else this.timer = setTimeout(tick, 1000);
  };
  this.timer = setTimeout(tick, 1000);
  }

 endBattle() {
 if (this.timer) { clearTimeout(this.timer); this.timer = null; }
 if (this.eventTimer) { clearTimeout(this.eventTimer); this.eventTimer = null; }
 this.state.status = "results";
 // Sort fighters by votes
 this.state.fighters.sort((a, b) => b.votes - a.votes);
 }

 resetVotes() {
 for (const f of this.state.fighters) { f.votes = 0; f.voters.clear(); f.attacks.forEach(a => a.triggered = false); }
 this.state.totalVotes = 0; this.state.tugPosition = 0; this.state.attackLog = [];
 this.state.predictions.clear();
 }

 cleanup() {
 if (this.timer) clearTimeout(this.timer);
 if (this.eventTimer) clearTimeout(this.eventTimer);
 this.timer = null; this.eventTimer = null;
 this.state = this.getInitialState();
 }

 pause() { if (this.timer) { clearTimeout(this.timer); this.timer = null; } }
 resume() { if (this.state.status === "voting" && this.state.timeRemaining > 0) this.startTimer(this.state.timeRemaining); }
}

// Singleton
const gArena = globalThis as typeof globalThis & { __animeWizArena?: ArenaEngine };
export function getArenaEngine(): ArenaEngine {
 if (!gArena.__animeWizArena) gArena.__animeWizArena = new ArenaEngine();
 return gArena.__animeWizArena;
}
