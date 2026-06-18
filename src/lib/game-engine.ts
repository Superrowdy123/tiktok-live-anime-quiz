import type { Player, GameState, MascotMessage, PowerUpType, ImageChallenge, PowerScalingFighter, PowerScalingBattle } from "./types";
import allQuestions, { getQuestionsForRound, getTotalRounds, type Question } from "@/data/questions";
import { getRandomEntry, getRandomMCQuestion, type GuessCategory, type GuessDifficulty } from "@/data/content-library";

const DIFFICULTY_POINTS: Record<string, number> = { easy: 10, medium: 20, hard: 30 };
const IMAGE_POINTS: Record<string, number> = { easy: 15, medium: 25, hard: 40, extreme: 60 };
const STREAK_BONUSES: Record<number, number> = { 1: 5, 3: 15, 5: 30, 10: 100 };
const TITLES: { minPoints: number; title: string }[] = [
  { minPoints: 0, title: "Anime Rookie" }, { minPoints: 100, title: "Otaku Apprentice" },
  { minPoints: 300, title: "Otaku" }, { minPoints: 500, title: "Anime Expert" },
  { minPoints: 1000, title: "Anime Sage" }, { minPoints: 2000, title: "Legendary Weeb" },
  { minPoints: 5000, title: "Anime God" },
];
const TEAMS = ["Team Shonen", "Team Seinen", "Team Isekai", "Team Romance"];

const MASCOT_CORRECT = [
  "Sugoi! {name} nailed it! 🎯", "{name} is on fire! 🔥", "Sasuga {name}! ✨",
  "{name} knows their anime! 📚", "Yatta! {name} got it! 🎉", "{name} answered in {time}s! ⚡",
];
const MASCOT_NO_ANSWER = [
  "😅 No one got it! Answer: {answer}", "🤔 Tough one! It was {answer}", "📚 Study up! Answer: {answer}",
];

function pick(arr: string[]): string { return arr[Math.floor(Math.random() * arr.length)]; }

function isCorrectAnswer(msg: string, ans: "A"|"B"|"C"|"D"): boolean {
  return msg.trim().toUpperCase() === ans;
}

// Fuzzy matching for image challenge text answers
function fuzzyMatch(input: string, targets: string[]): boolean {
  const clean = input.toLowerCase().trim().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ");
  if (!clean) return false;
  for (const t of targets) {
    const ct = t.toLowerCase().trim().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ");
    if (clean === ct) return true;
    if (clean.length >= 3 && ct.includes(clean)) return true;
    if (ct.length >= 3 && clean.includes(ct)) return true;
    // Levenshtein for minor typos (distance <= 2)
    if (ct.length >= 4 && levenshtein(clean, ct) <= 2) return true;
  }
  return false;
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = Math.min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+(a[i-1]!==b[j-1]?1:0));
  return dp[m][n];
}

export interface AnswerDistribution { A: number; B: number; C: number; D: number; }

export type GameMode = "quiz" | "image_guess" | "power_scaling";

export interface ImageChallengeState {
  challenge: ImageChallenge;
  status: "active" | "revealing";
  startTime: number;
  timeRemaining: number;
  winners: { username: string; displayName: string; time: number }[];
  answeredPlayers: Set<string>;
  answerFeed: { username: string; displayName: string; answer: string; correct: boolean; time: number }[];
  revealProgress: number; // 0-100 for progressive reveals
}

export class GameEngine {
  // ─── Existing state ───
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

  // ─── NEW: Game mode state ───
  private gameMode: GameMode = "quiz";
  private imageChallenge: ImageChallengeState | null = null;
  private powerBattle: PowerScalingBattle | null = null;
  private battleTimer: ReturnType<typeof setTimeout> | null = null;
  private imageTimer: ReturnType<typeof setTimeout> | null = null;
  private revealInterval: ReturnType<typeof setInterval> | null = null;

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
  getImageChallenge(): ImageChallengeState | null { return this.imageChallenge ? { ...this.imageChallenge, answeredPlayers: new Set(this.imageChallenge.answeredPlayers) } : null; }
  getPowerBattle(): PowerScalingBattle | null {
    if (!this.powerBattle) return null;
    return { ...this.powerBattle, fighters: this.powerBattle.fighters.map(f => ({ ...f, voters: new Set(f.voters) })) };
  }

  // ═══════════════════════════════════════════════════
  // EXISTING: Quiz mode (unchanged logic)
  // ═══════════════════════════════════════════════════

  startGame(options: { round?: number; sessionId: number }) {
    const { round = 1, sessionId } = options;
    this.currentRound = Math.max(1, Math.min(round, getTotalRounds()));
    this.roundQuestions = getQuestionsForRound(this.currentRound);
    this.players.clear(); this.antiCheat.clear();
    this.answerDistribution = { A: 0, B: 0, C: 0, D: 0 }; this.correctAnswerers = [];
    this.gameMode = "quiz";
    this.imageChallenge = null; this.powerBattle = null;
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
    if (nextIndex === 0) this.emitEvent("mascot", this.msg("info", "📗 EASY ROUND — 10 pts each!"));
    else if (nextIndex === 10) { this.emitEvent("mascot", this.msg("info", "📙 MEDIUM ROUND — 20 pts each!")); this.emitEvent("sound", "phase_change"); }
    else if (nextIndex === 20) { this.emitEvent("mascot", this.msg("info", "📕 HARD ROUND — 30 pts each! 🔥")); this.emitEvent("sound", "phase_change"); }
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
    // Route to correct handler based on mode
    if (this.gameMode === "image_guess") return this.processImageAnswer(username, displayName, message);
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
        if (player.streak >= 10) this.emitEvent("mascot", this.msg("streak", `🔥🔥🔥 LEGENDARY! ${displayName} — ${player.streak} streak!`));
        else if (player.streak >= 5) this.emitEvent("mascot", this.msg("streak", `🔥🔥 ${displayName} ON FIRE! ${player.streak}-streak!`));
        else if (player.streak >= 3) this.emitEvent("mascot", this.msg("streak", `🔥 ${displayName} — ${player.streak} in a row!`));
        else {
          const lb = this.getLeaderboard();
          if (lb.length > 0 && lb[0].tiktokUsername === username && this.state.questionsAsked > 1)
            this.emitEvent("mascot", this.msg("winner", `👑 NEW LEADER: ${displayName} with ${player.points} pts!`));
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

  // ═══════════════════════════════════════════════════
  // NEW FEATURE 1-3: Image Guess Modes
  // ═══════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════
  // PROGRESSIVE REVEAL GUESSING SYSTEM
  // - Starts heavily blurred/obscured, clears over 30s
  // - First correct answer ENDS the round instantly
  // - Speed-based scoring (faster = more points)
  // - Auto-hints at 20s and 10s remaining
  // - Auto-queues next round after reveal
  // ═══════════════════════════════════════════════════

  private autoQueueCategory: GuessCategory | null = null;
  private autoQueueDifficulty: GuessDifficulty | undefined = undefined;
  private autoQueueEnabled = false;
  private autoQueueTimer: ReturnType<typeof setTimeout> | null = null;
  private autoQueueTimeLimit: number | undefined = undefined;

  startLibraryChallenge(category: GuessCategory, difficulty?: GuessDifficulty, franchise?: string, autoQueue = false, timeLimit?: number) {
    const mcq = getRandomMCQuestion(category, difficulty, franchise);
    if (!mcq) return { success: false, error: "No entries found" };
    const { entry, options, answer } = mcq;
    this.autoQueueCategory = category;
    this.autoQueueDifficulty = difficulty;
    this.autoQueueEnabled = autoQueue;
    this.autoQueueTimeLimit = timeLimit;
    const tl = timeLimit || 30;
    this.startImageChallenge({
      id: `lib_${entry.id}_${Date.now()}`, mode: "guess_anime",
      imageUrl: "",
      correctAnswer: entry.answer, aliases: entry.aliases,
      difficulty: entry.difficulty, revealType: category as ImageChallenge["revealType"],
      timeLimit: tl, pointValue: IMAGE_POINTS[entry.difficulty] || 25,
      description: entry.description, category,
      // A/B/C/D multiple choice options
      mcOptions: options.map((o, i) => `${String.fromCharCode(65 + i)}) ${o}`),
      mcAnswer: answer,
    });
    return { success: true, entry: { id: entry.id, description: entry.description, category, difficulty: entry.difficulty, franchise: entry.franchise, hint: entry.hint, options, answer } };
  }

  setAutoQueue(enabled: boolean) { this.autoQueueEnabled = enabled; }

  startImageChallenge(challenge: ImageChallenge) {
    if (this.imageTimer) clearTimeout(this.imageTimer);
    if (this.revealInterval) clearInterval(this.revealInterval);
    if (this.autoQueueTimer) clearTimeout(this.autoQueueTimer);
    this.gameMode = "image_guess";
    this.imageChallenge = {
      challenge, status: "active", startTime: Date.now(),
      timeRemaining: challenge.timeLimit, winners: [],
      answeredPlayers: new Set(), answerFeed: [], revealProgress: 0,
    };

    // Always run progressive reveal (blur decreases over time)
    this.revealInterval = setInterval(() => {
      if (this.imageChallenge && this.imageChallenge.status === "active") {
        const elapsed = (Date.now() - this.imageChallenge.startTime) / 1000;
        this.imageChallenge.revealProgress = Math.min(100, (elapsed / challenge.timeLimit) * 100);
        this.emitState();
      }
    }, 200); // Update 5x per second for smooth reveal

    this.emitState();
    this.emitEvent("image_challenge_start", { mode: challenge.mode, difficulty: challenge.difficulty, category: challenge.category, revealType: challenge.revealType });
    this.emitEvent("sound", "new_question");

    const catName = challenge.category
      ? challenge.category.charAt(0).toUpperCase() + challenge.category.slice(1)
      : "Anime";
    this.emitEvent("mascot", this.msg("info", `🖼️ GUESS THE ${catName.toUpperCase()}! Type your answer in chat! 30s!`));
    this.startImageTimer(challenge.timeLimit);
  }

  private startImageTimer(seconds: number) {
    if (this.imageTimer) clearTimeout(this.imageTimer);
    let remaining = seconds;
    const tick = () => {
      remaining--;
      if (!this.imageChallenge) return;
      this.imageChallenge.timeRemaining = remaining;
      this.emitState();

      // Auto-hint at 20s remaining
      if (remaining === 20 && this.imageChallenge.challenge.description) {
        const desc = this.imageChallenge.challenge.description;
        const words = desc.split(" ");
        const hintWords = words.slice(0, Math.ceil(words.length / 3));
        this.emitEvent("mascot", this.msg("info", `💡 Hint: ${hintWords.join(" ")}...`));
      }

      // Stronger hint at 10s remaining
      if (remaining === 10) {
        this.emitEvent("sound", "time_warning");
        const answer = this.imageChallenge.challenge.correctAnswer;
        const hint = answer[0] + "_".repeat(answer.length - 2) + answer[answer.length - 1];
        this.emitEvent("mascot", this.msg("info", `⏰ 10 seconds! Hint: ${hint} (${answer.length} letters)`));
      }

      if (remaining <= 5 && remaining > 0) this.emitEvent("sound", "countdown_tick");
      if (remaining <= 0) this.endImageChallenge();
      else this.imageTimer = setTimeout(tick, 1000);
    };
    this.imageTimer = setTimeout(tick, 1000);
  }

  private endImageChallenge() {
    if (!this.imageChallenge) return;
    if (this.imageTimer) { clearTimeout(this.imageTimer); this.imageTimer = null; }
    if (this.revealInterval) { clearInterval(this.revealInterval); this.revealInterval = null; }

    this.imageChallenge.status = "revealing";
    this.imageChallenge.revealProgress = 100;
    this.emitState();

    if (this.imageChallenge.winners.length > 0) {
      const w = this.imageChallenge.winners[0];
      const pts = this.calcSpeedPoints(w.time, this.imageChallenge.challenge);
      this.emitEvent("mascot", this.msg("correct", `✅ ${w.displayName} got it in ${w.time.toFixed(1)}s! Answer: ${this.imageChallenge.challenge.correctAnswer} (+${pts} pts!)`));
      this.emitEvent("sound", "correct");
    } else {
      this.emitEvent("mascot", this.msg("info", `⏰ No one got it! Answer: ${this.imageChallenge.challenge.correctAnswer}`));
      this.emitEvent("sound", "time_up");
    }

    this.emitEvent("image_challenge_end", {
      answer: this.imageChallenge.challenge.correctAnswer,
      winners: this.imageChallenge.winners,
      revealImage: this.imageChallenge.challenge.revealImageUrl,
    });

    // Auto-queue next round after 5 seconds
    if (this.autoQueueEnabled && this.autoQueueCategory) {
      this.autoQueueTimer = setTimeout(() => {
        this.startLibraryChallenge(this.autoQueueCategory!, this.autoQueueDifficulty, undefined, true, this.autoQueueTimeLimit);
      }, 5000);
    }
  }

  // Speed-based scoring: faster answer = more points
  private calcSpeedPoints(answerTime: number, challenge: ImageChallenge): number {
    const base = IMAGE_POINTS[challenge.difficulty] || 15;
    const timeLimit = challenge.timeLimit;
    // Bonus: up to 2x for answering in first 5 seconds
    const speedMultiplier = Math.max(1, 2 - (answerTime / timeLimit));
    return Math.round(base * speedMultiplier);
  }

  processImageAnswer(username: string, displayName: string, message: string): { correct: boolean; reason: string } {
    if (!this.imageChallenge || this.imageChallenge.status !== "active")
      return { correct: false, reason: "No active image challenge" };
    if (!this.passAntiCheat(username)) return { correct: false, reason: "Rate limited" };
    if (this.imageChallenge.answeredPlayers.has(username)) return { correct: false, reason: "Already answered" };

    const player = this.ensurePlayer(username, displayName);
    this.imageChallenge.answeredPlayers.add(username);
    player.totalAnswers++; this.state.stats.totalAnswers++;

    const ch = this.imageChallenge.challenge;
    // Check A/B/C/D if this is a multiple choice challenge
    let isCorrect = false;
    if (ch.mcAnswer) {
      const cleaned = message.trim().toUpperCase();
      isCorrect = cleaned === ch.mcAnswer;
    } else {
      // Free-text fuzzy match fallback
      const allTargets = [ch.correctAnswer, ...ch.aliases];
      isCorrect = fuzzyMatch(message, allTargets);
    }
    const answerTime = (Date.now() - this.imageChallenge.startTime) / 1000;

    // Add to live feed
    this.imageChallenge.answerFeed.push({ username, displayName, answer: message, correct: isCorrect, time: answerTime });
    if (this.imageChallenge.answerFeed.length > 50) this.imageChallenge.answerFeed.shift();

    if (isCorrect) {
      this.imageChallenge.winners.push({ username, displayName, time: answerTime });

      // Speed-based scoring
      const points = this.calcSpeedPoints(answerTime, ch);
      player.streak++;
      if (player.streak > player.bestStreak) player.bestStreak = player.streak;
      const streakBonus = STREAK_BONUSES[player.streak] || 0;
      const totalPoints = points + streakBonus;
      player.points += totalPoints; player.correctAnswers++;
      if (!player.fastestAnswer || answerTime < player.fastestAnswer) player.fastestAnswer = answerTime;
      player.title = this.getTitle(player.points);
      this.state.stats.correctAnswers++;

      // ═══ FIRST CORRECT ANSWER ENDS THE ROUND INSTANTLY ═══
      if (this.imageChallenge.winners.length === 1) {
        this.emitEvent("image_first_correct", { username, displayName, time: answerTime, points: totalPoints });
        // Stop timer, reveal full image, show winner
        this.endImageChallenge();
      }

      this.emitState();
      return { correct: true, reason: `Correct! +${totalPoints} pts (${answerTime.toFixed(1)}s)` };
    } else {
      player.streak = 0;
      this.emitState();
      return { correct: false, reason: "Not correct" };
    }
  }

  // ═══════════════════════════════════════════════════
  // NEW FEATURE 4-5: Power Scaling Battles with Live Vote Bars
  // ═══════════════════════════════════════════════════

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
    this.emitEvent("mascot", this.msg("info", `⚔️ POWER SCALING BATTLE! Vote: ${names}! Type the letter!`));
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
    this.emitEvent("mascot", this.msg("winner", `👑 ${winner.name} wins with ${winner.votes} votes!`));
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

  // ═══════════════════════════════════════════════════
  // EXISTING: Controls (preserved)
  // ═══════════════════════════════════════════════════

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
    if (this.imageChallenge?.status === "active") { if (this.imageTimer) { clearTimeout(this.imageTimer); this.imageTimer = null; } }
    if (this.powerBattle?.status === "voting") { if (this.battleTimer) { clearTimeout(this.battleTimer); this.battleTimer = null; } }
  }

  resumeGame() {
    if (this.state.status === "paused" && this.state.currentQuestion) { this.state.status = "question"; this.startQuestionTimer(this.state.timeRemaining); this.emitState(); }
    if (this.imageChallenge?.status === "active" && !this.imageTimer) this.startImageTimer(this.imageChallenge.timeRemaining);
    if (this.powerBattle?.status === "voting" && !this.battleTimer) this.startBattleTimer(this.powerBattle.timeRemaining);
  }

  skipQuestion() { if (this.questionTimer) { clearTimeout(this.questionTimer); this.questionTimer = null; } this.timeUp(); }
  addPoints(username: string, points: number) { const p = this.players.get(username); if (p) { p.points += points; p.title = this.getTitle(p.points); this.emitState(); } }
  banPlayer(username: string) { this.players.delete(username); this.emitState(); }

  resetGame() {
    [this.questionTimer, this.imageTimer, this.battleTimer].forEach(t => { if (t) clearTimeout(t); });
    if (this.revealInterval) clearInterval(this.revealInterval);
    this.questionTimer = null; this.imageTimer = null; this.battleTimer = null; this.revealInterval = null;
    this.players.clear(); this.antiCheat.clear(); this.answeredThisQuestion.clear();
    this.answerDistribution = { A: 0, B: 0, C: 0, D: 0 }; this.correctAnswerers = [];
    this.gameMode = "quiz"; this.imageChallenge = null; this.powerBattle = null;
    this.state = this.getInitialState(); this.emitState();
  }

  endGame() {
    [this.questionTimer, this.imageTimer, this.battleTimer].forEach(t => { if (t) clearTimeout(t); });
    if (this.revealInterval) clearInterval(this.revealInterval);
    this.state.status = "completed"; this.emitState();
    const top3 = this.getLeaderboard().slice(0, 3);
    this.emitEvent("game_complete", { winners: top3, round: this.currentRound });
    this.emitEvent("sound", "game_complete");
    if (top3.length >= 1) this.emitEvent("mascot", this.msg("winner", `🏆 ROUND ${this.currentRound} CHAMPION: ${top3[0].displayName} with ${top3[0].points} pts! 👑`));
  }

  // Stop image challenge early / reveal answer
  revealImageAnswer() {
    if (this.imageTimer) { clearTimeout(this.imageTimer); this.imageTimer = null; }
    this.endImageChallenge();
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
    const e: Record<string, string> = { question:"❓", correct:"✅", streak:"🔥", boss:"⚔️", winner:"🏆", motivational:"💪", info:"📢" };
    return { text, emoji: e[type] || "🎮", type };
  }
}

// Singleton survives HMR
const g = globalThis as typeof globalThis & { __animeWizGameEngine?: GameEngine };
export function getGameEngine(): GameEngine { if (!g.__animeWizGameEngine) g.__animeWizGameEngine = new GameEngine(); return g.__animeWizGameEngine; }
