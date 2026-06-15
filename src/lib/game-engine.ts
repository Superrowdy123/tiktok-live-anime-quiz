import type { Player, GameState, MascotMessage, PowerUpType } from "./types";
import allQuestions, { getQuestionsForRound, getTotalRounds, type Question } from "@/data/questions";

const DIFFICULTY_POINTS: Record<string, number> = {
  easy: 10,
  medium: 20,
  hard: 30,
};

const STREAK_BONUSES: Record<number, number> = {
  1: 5,
  3: 15,
  5: 30,
  10: 100,
};

const TITLES: { minPoints: number; title: string }[] = [
  { minPoints: 0, title: "Anime Rookie" },
  { minPoints: 100, title: "Otaku Apprentice" },
  { minPoints: 300, title: "Otaku" },
  { minPoints: 500, title: "Anime Expert" },
  { minPoints: 1000, title: "Anime Sage" },
  { minPoints: 2000, title: "Legendary Weeb" },
  { minPoints: 5000, title: "Anime God" },
];

const TEAMS = ["Team Shonen", "Team Seinen", "Team Isekai", "Team Romance"];

// Mascot messages for different situations
const MASCOT_MESSAGES = {
  correct: [
    "Sugoi! {name} nailed it! 🎯",
    "{name} is on fire! 🔥",
    "Sasuga {name}! Perfect answer! ✨",
    "{name} knows their anime! 📚",
    "That's the power of a true otaku, {name}! 💪",
    "Yatta! {name} got it! 🎉",
    "{name} answered in {time}s! Speed demon! ⚡",
  ],
  streak3: [
    "🔥 {name} is heating up with a 3-streak!",
    "⚡ Triple combo! {name} is unstoppable!",
    "🌟 {name} hat-trick! 3 in a row!",
  ],
  streak5: [
    "🔥🔥 {name} is ON FIRE! 5-streak!",
    "⚡⚡ PENTAKILL! {name} with 5 correct!",
    "🌟🌟 {name} is a quiz MACHINE! 5 streak!",
  ],
  streak10: [
    "🔥🔥🔥 LEGENDARY! {name} with 10 in a row!",
    "⚡⚡⚡ {name} is ASCENDED! 10-STREAK!",
    "👑 BOW DOWN! {name} has 10 consecutive wins!",
  ],
  newLeader: [
    "👑 {name} takes the throne with {points} points!",
    "🏆 New leader alert! {name} is #1!",
    "📈 {name} climbs to the top! {points} pts!",
  ],
  encouragement: [
    "Keep going everyone! 💪",
    "The next question is coming! 🎮",
    "Who will answer first? 🤔",
    "Get ready, otakus! ⚡",
    "This is getting intense! 🔥",
  ],
  phaseChange: {
    easy: "📗 EASY ROUND starting! 10 questions worth 10 points each!",
    medium: "📙 MEDIUM ROUND! Difficulty increased! 20 points each!",
    hard: "📕 HARD ROUND! Final stretch! 30 points each! 🔥",
  },
  timeWarning: [
    "⏰ 10 seconds left!",
    "⚠️ Hurry! Time running out!",
    "🏃 Quick! Only 10 seconds!",
  ],
  noAnswer: [
    "😅 No one got it! The answer was {answer}",
    "🤔 Tough one! It was {answer}",
    "📚 Time to study! Answer: {answer}",
  ],
};

function getRandomMessage(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Simple answer matching - just A, B, C, or D (case insensitive)
function isCorrectAnswer(userMessage: string, correctAnswer: "A" | "B" | "C" | "D"): boolean {
  const cleaned = userMessage.trim().toUpperCase();
  return cleaned === correctAnswer;
}

export interface AnswerDistribution {
  A: number;
  B: number;
  C: number;
  D: number;
}

export class GameEngine {
  private currentRound: number = 1;
  private roundQuestions: Question[] = [];
  private players: Map<string, Player> = new Map();
  private antiCheat: Map<string, { lastMessageTime: number; messageCount: number; cooldownUntil: number; warnings: number }> = new Map();
  private answeredThisQuestion: Set<string> = new Set();
  private questionTimer: ReturnType<typeof setTimeout> | null = null;
  private state: GameState;
  private answerDistribution: AnswerDistribution = { A: 0, B: 0, C: 0, D: 0 };
  private correctAnswerers: { username: string; displayName: string; time: number }[] = [];
  private timeWarningShown: boolean = false;
  private onStateChange: ((state: GameState) => void) | null = null;
  private onEvent: ((event: { type: string; data: unknown }) => void) | null = null;

  constructor() {
    this.state = this.getInitialState();
  }

  private getInitialState(): GameState {
    return {
      status: "waiting",
      sessionId: null,
      currentQuestion: null,
      currentQuestionIndex: -1,
      totalQuestions: 30,
      questionStartTime: null,
      timeRemaining: 0,
      leaderboard: [],
      answeredPlayers: new Set(),
      correctAnswer: null,
      winner: null,
      winnerDisplayName: null,
      bossRound: false,
      difficulty: "mixed",
      season: null,
      questionsAsked: 0,
      totalPlayers: 0,
      stats: {
        totalPlayers: 0,
        questionsAnswered: 0,
        totalAnswers: 0,
        correctAnswers: 0,
        fastestAnswer: null,
        fastestPlayer: null,
        mostActivePlayer: null,
        sessionDuration: 0,
        startTime: null,
      },
    };
  }

  setOnStateChange(cb: (state: GameState) => void) {
    this.onStateChange = cb;
  }

  setOnEvent(cb: (event: { type: string; data: unknown }) => void) {
    this.onEvent = cb;
  }

  private emitState() {
    if (this.onStateChange) {
      this.onStateChange(this.getPublicState());
    }
  }

  private emitEvent(type: string, data: unknown) {
    if (this.onEvent) {
      this.onEvent({ type, data });
    }
  }

  getPublicState(): GameState {
    return {
      ...this.state,
      leaderboard: this.getLeaderboard(),
      totalPlayers: this.players.size,
      answeredPlayers: new Set(this.answeredThisQuestion),
      stats: {
        ...this.state.stats,
        totalPlayers: this.players.size,
        sessionDuration: this.state.stats.startTime
          ? Date.now() - this.state.stats.startTime
          : 0,
      },
    };
  }

  getCurrentRound(): number {
    return this.currentRound;
  }

  getTotalRounds(): number {
    return getTotalRounds();
  }

  getAnswerDistribution(): AnswerDistribution {
    return { ...this.answerDistribution };
  }

  getCorrectAnswerers(): { username: string; displayName: string; time: number }[] {
    return [...this.correctAnswerers];
  }

  startGame(options: {
    round?: number;
    sessionId: number;
  }) {
    const { round = 1, sessionId } = options;

    this.currentRound = Math.max(1, Math.min(round, getTotalRounds()));
    this.roundQuestions = getQuestionsForRound(this.currentRound);
    
    this.players.clear();
    this.antiCheat.clear();
    this.answerDistribution = { A: 0, B: 0, C: 0, D: 0 };
    this.correctAnswerers = [];

    this.state = {
      ...this.getInitialState(),
      status: "active",
      sessionId,
      totalQuestions: this.roundQuestions.length,
      difficulty: "mixed",
      stats: {
        ...this.getInitialState().stats,
        startTime: Date.now(),
      },
    };

    this.emitState();
    this.emitEvent("game_start", { 
      round: this.currentRound, 
      totalQuestions: this.roundQuestions.length,
      totalRounds: getTotalRounds()
    });
    this.emitEvent("sound", "game_start");
    this.emitEvent("mascot", this.getMascotMessage("info", `🎮 Round ${this.currentRound} begins! 30 questions await. Answer with A, B, C, or D!`));
  }

  nextQuestion() {
    if (this.state.status === "completed") return;

    const nextIndex = this.state.currentQuestionIndex + 1;
    if (nextIndex >= this.roundQuestions.length) {
      this.endGame();
      return;
    }

    const question = this.roundQuestions[nextIndex];

    if (this.questionTimer) {
      clearTimeout(this.questionTimer);
      this.questionTimer = null;
    }

    this.answeredThisQuestion.clear();
    this.answerDistribution = { A: 0, B: 0, C: 0, D: 0 };
    this.correctAnswerers = [];
    this.timeWarningShown = false;
    
    const gameQuestion = {
      id: question.id,
      type: question.type as string,
      difficulty: question.difficulty as string,
      question: question.question,
      options: question.options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`),
      answer: question.answer,
      timeLimit: question.timeLimit,
    };

    this.state = {
      ...this.state,
      status: "question",
      currentQuestion: gameQuestion,
      currentQuestionIndex: nextIndex,
      questionStartTime: Date.now(),
      timeRemaining: question.timeLimit,
      correctAnswer: null,
      winner: null,
      winnerDisplayName: null,
      bossRound: false,
      questionsAsked: nextIndex + 1,
    };

    this.emitState();

    // Phase change announcements
    if (nextIndex === 0) {
      this.emitEvent("mascot", this.getMascotMessage("info", MASCOT_MESSAGES.phaseChange.easy));
      this.emitEvent("phase_change", { phase: "easy" });
    } else if (nextIndex === 10) {
      this.emitEvent("mascot", this.getMascotMessage("info", MASCOT_MESSAGES.phaseChange.medium));
      this.emitEvent("phase_change", { phase: "medium" });
      this.emitEvent("sound", "phase_change");
    } else if (nextIndex === 20) {
      this.emitEvent("mascot", this.getMascotMessage("info", MASCOT_MESSAGES.phaseChange.hard));
      this.emitEvent("phase_change", { phase: "hard" });
      this.emitEvent("sound", "phase_change");
    }

    this.emitEvent("new_question", {
      questionNumber: nextIndex + 1,
      total: this.roundQuestions.length,
      difficulty: question.difficulty,
      round: this.currentRound,
    });
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

      // Time warning at 10 seconds
      if (remaining === 10 && !this.timeWarningShown) {
        this.timeWarningShown = true;
        this.emitEvent("time_warning", { seconds: 10 });
        this.emitEvent("sound", "time_warning");
      }

      // Critical time at 5 seconds
      if (remaining === 5) {
        this.emitEvent("time_critical", { seconds: 5 });
      }

      if (remaining <= 0) {
        this.timeUp();
      } else {
        this.questionTimer = setTimeout(tick, 1000);
      }
    };
    this.questionTimer = setTimeout(tick, 1000);
  }

  private timeUp() {
    if (this.state.status !== "question") return;

    const currentQ = this.roundQuestions[this.state.currentQuestionIndex];
    
    this.state.status = "revealing";
    this.state.correctAnswer = currentQ?.answer ?? null;
    this.state.stats.questionsAnswered++;
    this.emitState();
    
    if (this.correctAnswerers.length === 0) {
      const msg = getRandomMessage(MASCOT_MESSAGES.noAnswer).replace("{answer}", currentQ?.answer || "?");
      this.emitEvent("mascot", this.getMascotMessage("info", msg));
    }
    
    this.emitEvent("time_up", { 
      answer: this.state.correctAnswer,
      distribution: this.answerDistribution,
      correctAnswerers: this.correctAnswerers,
    });
    this.emitEvent("sound", "time_up");
  }

  processAnswer(username: string, displayName: string, message: string): { correct: boolean; reason: string } {
    if (this.state.status !== "question") {
      return { correct: false, reason: `Game not in question mode (status: ${this.state.status})` };
    }
    
    const currentQ = this.roundQuestions[this.state.currentQuestionIndex];
    if (!currentQ) {
      return { correct: false, reason: "No active question" };
    }

    if (!this.passAntiCheat(username)) {
      return { correct: false, reason: "Rate limited (anti-cheat)" };
    }

    if (this.answeredThisQuestion.has(username)) {
      return { correct: false, reason: "Already answered this question" };
    }

    const cleaned = message.trim().toUpperCase();
    if (!["A", "B", "C", "D"].includes(cleaned)) {
      return { correct: false, reason: `Invalid answer. Type A, B, C, or D. You typed: "${message}"` };
    }

    // Track answer distribution
    this.answerDistribution[cleaned as "A" | "B" | "C" | "D"]++;

    const isCorrect = isCorrectAnswer(message, currentQ.answer);

    if (!this.players.has(username)) {
      this.players.set(username, {
        tiktokUsername: username,
        displayName,
        points: 0,
        streak: 0,
        bestStreak: 0,
        correctAnswers: 0,
        totalAnswers: 0,
        fastestAnswer: null,
        team: TEAMS[Math.floor(Math.random() * TEAMS.length)],
        powerUps: { double: 1, shield: 1, steal: 1 },
        rank: 0,
        title: "Anime Rookie",
        lastAnswerTime: 0,
      });
      this.emitEvent("new_player", { username, displayName });
    }

    const player = this.players.get(username)!;

    this.answeredThisQuestion.add(username);
    player.totalAnswers++;
    this.state.stats.totalAnswers++;

    if (isCorrect) {
      const answerTime = this.state.questionStartTime
        ? (Date.now() - this.state.questionStartTime) / 1000
        : 0;

      // Track all correct answerers
      this.correctAnswerers.push({ username, displayName, time: answerTime });

      let points = DIFFICULTY_POINTS[currentQ.difficulty] || 10;

      player.streak++;
      if (player.streak > player.bestStreak) {
        player.bestStreak = player.streak;
      }

      const streakBonus = STREAK_BONUSES[player.streak] || 0;
      points += streakBonus;

      player.points += points;
      player.correctAnswers++;
      if (!player.fastestAnswer || answerTime < player.fastestAnswer) {
        player.fastestAnswer = answerTime;
      }
      player.lastAnswerTime = answerTime;
      player.title = this.getTitle(player.points);

      this.state.stats.correctAnswers++;
      if (!this.state.stats.fastestAnswer || answerTime < this.state.stats.fastestAnswer) {
        this.state.stats.fastestAnswer = answerTime;
        this.state.stats.fastestPlayer = displayName;
      }

      // First correct answer wins
      if (!this.state.winner) {
        this.state.winner = username;
        this.state.winnerDisplayName = displayName;
        this.state.correctAnswer = currentQ.answer;
        this.state.status = "revealing";
        this.state.stats.questionsAnswered++;

        if (this.questionTimer) {
          clearTimeout(this.questionTimer);
          this.questionTimer = null;
        }

        this.emitEvent("correct_answer", {
          username,
          displayName,
          points,
          streak: player.streak,
          answerTime: answerTime.toFixed(1),
          answer: currentQ.answer,
          distribution: this.answerDistribution,
        });
        this.emitEvent("sound", "correct");

        // Dynamic mascot messages
        if (player.streak >= 10) {
          const msg = getRandomMessage(MASCOT_MESSAGES.streak10).replace("{name}", displayName);
          this.emitEvent("mascot", this.getMascotMessage("streak", msg));
          this.emitEvent("sound", "streak_legendary");
        } else if (player.streak >= 5) {
          const msg = getRandomMessage(MASCOT_MESSAGES.streak5).replace("{name}", displayName);
          this.emitEvent("mascot", this.getMascotMessage("streak", msg));
          this.emitEvent("sound", "streak");
        } else if (player.streak >= 3) {
          const msg = getRandomMessage(MASCOT_MESSAGES.streak3).replace("{name}", displayName);
          this.emitEvent("mascot", this.getMascotMessage("streak", msg));
          this.emitEvent("sound", "streak");
        } else {
          // Check for new leader
          const leaderboard = this.getLeaderboard();
          if (leaderboard.length > 0 && leaderboard[0].tiktokUsername === username && this.state.questionsAsked > 1) {
            const msg = getRandomMessage(MASCOT_MESSAGES.newLeader)
              .replace("{name}", displayName)
              .replace("{points}", player.points.toString());
            this.emitEvent("mascot", this.getMascotMessage("winner", msg));
            this.emitEvent("sound", "new_leader");
          } else {
            const msg = getRandomMessage(MASCOT_MESSAGES.correct)
              .replace("{name}", displayName)
              .replace("{time}", answerTime.toFixed(1));
            this.emitEvent("mascot", this.getMascotMessage("correct", msg));
          }
        }
      }

      this.emitState();
      return { correct: true, reason: `Correct! Answer was ${currentQ.answer}. +${points} points` };
    } else {
      player.streak = 0;
      return { correct: false, reason: `Wrong! You answered ${cleaned}, correct was ${currentQ.answer}` };
    }
  }

  processPowerUp(username: string, powerUp: PowerUpType): boolean {
    const player = this.players.get(username);
    if (!player) return false;

    const count = player.powerUps[powerUp] || 0;
    if (count <= 0) return false;

    switch (powerUp) {
      case "double":
        player.powerUps.double = (player.powerUps.double || 1) - 1;
        this.emitEvent("power_up", { username, displayName: player.displayName, type: "double" });
        return true;
      case "shield":
        player.powerUps.shield = (player.powerUps.shield || 1) - 1;
        this.emitEvent("power_up", { username, displayName: player.displayName, type: "shield" });
        return true;
      case "steal": {
        player.powerUps.steal = (player.powerUps.steal || 1) - 1;
        const otherPlayers = Array.from(this.players.values()).filter(
          (p) => p.tiktokUsername !== username && p.points > 0
        );
        if (otherPlayers.length > 0) {
          const victim = otherPlayers[Math.floor(Math.random() * otherPlayers.length)];
          const stolen = Math.min(10, victim.points);
          victim.points -= stolen;
          player.points += stolen;
          this.emitEvent("power_up", {
            username,
            displayName: player.displayName,
            type: "steal",
            victim: victim.displayName,
            amount: stolen,
          });
        }
        return true;
      }
    }
    return false;
  }

  pauseGame() {
    if (this.state.status === "question") {
      if (this.questionTimer) {
        clearTimeout(this.questionTimer);
        this.questionTimer = null;
      }
      this.state.status = "paused";
      this.emitState();
      this.emitEvent("game_paused", {});
    }
  }

  resumeGame() {
    if (this.state.status === "paused" && this.state.currentQuestion) {
      this.state.status = "question";
      this.startQuestionTimer(this.state.timeRemaining);
      this.emitState();
      this.emitEvent("game_resumed", {});
    }
  }

  skipQuestion() {
    if (this.questionTimer) {
      clearTimeout(this.questionTimer);
      this.questionTimer = null;
    }
    this.timeUp();
  }

  addPoints(username: string, points: number) {
    const player = this.players.get(username);
    if (player) {
      player.points += points;
      player.title = this.getTitle(player.points);
      this.emitState();
    }
  }

  banPlayer(username: string) {
    this.players.delete(username);
    this.emitState();
  }

  resetGame() {
    if (this.questionTimer) {
      clearTimeout(this.questionTimer);
      this.questionTimer = null;
    }
    this.players.clear();
    this.antiCheat.clear();
    this.answeredThisQuestion.clear();
    this.answerDistribution = { A: 0, B: 0, C: 0, D: 0 };
    this.correctAnswerers = [];
    this.state = this.getInitialState();
    this.emitState();
  }

  endGame() {
    if (this.questionTimer) {
      clearTimeout(this.questionTimer);
      this.questionTimer = null;
    }
    this.state.status = "completed";
    this.emitState();

    const top3 = this.getLeaderboard().slice(0, 3);
    this.emitEvent("game_complete", { winners: top3, round: this.currentRound });
    this.emitEvent("sound", "game_complete");

    if (top3.length >= 1) {
      this.emitEvent("mascot", this.getMascotMessage("winner", `🏆 ROUND ${this.currentRound} CHAMPION: ${top3[0].displayName} with ${top3[0].points} points! 👑`));
    }
  }

  getLeaderboard(): Player[] {
    const players = Array.from(this.players.values());
    players.sort((a, b) => b.points - a.points || (a.fastestAnswer ?? 999) - (b.fastestAnswer ?? 999));
    return players.map((p, i) => ({ ...p, rank: i + 1 }));
  }

  getWinners(): Player[] {
    return this.getLeaderboard().slice(0, 3);
  }

  getFullStats() {
    const players = Array.from(this.players.values());
    let mostActive: Player | null = null;
    for (const p of players) {
      if (!mostActive || p.totalAnswers > mostActive.totalAnswers) {
        mostActive = p;
      }
    }
    return {
      ...this.state.stats,
      totalPlayers: players.length,
      mostActivePlayer: mostActive?.displayName ?? null,
      sessionDuration: this.state.stats.startTime
        ? Date.now() - this.state.stats.startTime
        : 0,
      currentRound: this.currentRound,
      totalRounds: getTotalRounds(),
    };
  }

  getExportData() {
    return {
      session: {
        id: this.state.sessionId,
        status: this.state.status,
        totalQuestions: this.state.totalQuestions,
        questionsAsked: this.state.questionsAsked,
        round: this.currentRound,
      },
      leaderboard: this.getLeaderboard(),
      stats: this.getFullStats(),
    };
  }

  private passAntiCheat(username: string): boolean {
    const now = Date.now();
    let record = this.antiCheat.get(username);

    if (!record) {
      record = { lastMessageTime: 0, messageCount: 0, cooldownUntil: 0, warnings: 0 };
      this.antiCheat.set(username, record);
    }

    if (now < record.cooldownUntil) return false;

    if (now - record.lastMessageTime < 2000) {
      record.messageCount++;
      if (record.messageCount > 3) {
        record.warnings++;
        record.cooldownUntil = now + 5000;
        return false;
      }
    } else {
      record.messageCount = 1;
    }

    record.lastMessageTime = now;
    return true;
  }

  private getTitle(points: number): string {
    let title = "Anime Rookie";
    for (const t of TITLES) {
      if (points >= t.minPoints) {
        title = t.title;
      }
    }
    return title;
  }

  private getMascotMessage(type: MascotMessage["type"], text: string): MascotMessage {
    const emojis: Record<string, string> = {
      question: "❓",
      correct: "✅",
      streak: "🔥",
      boss: "⚔️",
      winner: "🏆",
      motivational: "💪",
      info: "📢",
    };
    return { text, emoji: emojis[type] || "🎮", type };
  }
}

// Singleton that survives HMR
const globalForGame = globalThis as typeof globalThis & {
  __animeWizGameEngine?: GameEngine;
};

export function getGameEngine(): GameEngine {
  if (!globalForGame.__animeWizGameEngine) {
    globalForGame.__animeWizGameEngine = new GameEngine();
  }
  return globalForGame.__animeWizGameEngine;
}
