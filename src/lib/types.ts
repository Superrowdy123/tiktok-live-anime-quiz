export interface Question {
  id: number;
  round: number;
  type: "multiple_choice";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: string[];
  answer: "A" | "B" | "C" | "D";
  timeLimit: number;
}

export interface Player {
  tiktokUsername: string;
  displayName: string;
  points: number;
  streak: number;
  bestStreak: number;
  correctAnswers: number;
  totalAnswers: number;
  fastestAnswer: number | null;
  team: string | null;
  powerUps: Record<string, number>;
  rank: number;
  title: string;
  lastAnswerTime: number;
}

export interface GameState {
  status: "waiting" | "active" | "paused" | "question" | "revealing" | "completed";
  sessionId: number | null;
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
  questionStartTime: number | null;
  timeRemaining: number;
  leaderboard: Player[];
  answeredPlayers: Set<string>;
  correctAnswer: string | null;
  winner: string | null;
  winnerDisplayName: string | null;
  bossRound: boolean;
  difficulty: string;
  season: string | null;
  questionsAsked: number;
  totalPlayers: number;
  stats: GameStats;
}

export interface GameStats {
  totalPlayers: number;
  questionsAnswered: number;
  totalAnswers: number;
  correctAnswers: number;
  fastestAnswer: number | null;
  fastestPlayer: string | null;
  mostActivePlayer: string | null;
  sessionDuration: number;
  startTime: number | null;
}

export interface ChatMessage {
  username: string;
  displayName: string;
  message: string;
  timestamp: number;
}

export interface AntiCheatRecord {
  lastMessageTime: number;
  messageCount: number;
  cooldownUntil: number;
  warnings: number;
}

export interface MascotMessage {
  text: string;
  emoji: string;
  type: "question" | "correct" | "streak" | "boss" | "winner" | "motivational" | "info";
}

export type PowerUpType = "double" | "shield" | "steal";

export interface LeaderboardEntry {
  rank: number;
  username: string;
  displayName: string;
  points: number;
  streak: number;
  team: string | null;
  title: string;
}

export interface GameEvent {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  timestamp: number;
}
