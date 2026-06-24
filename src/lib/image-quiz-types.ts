export type QuizMode = "character" | "anime" | "hair" | "weapon" | "symbol" | "outfit";
export type Difficulty = "easy" | "medium" | "hard";
export type RevealMode = "normal" | "blurred" | "pixelated" | "zoomed" | "silhouette" | "progressive";

export interface ImageQuestion {
  id: string;
  imageUrl: string;
  quizMode: QuizMode;
  correctAnswer: string;
  options: [string, string, string, string];
  correctOptionIndex: number;
  title: string;
  hint: string;
  difficulty: Difficulty;
  revealMode: RevealMode;
  timeLimit: number;
  anime: string;
  createdAt: number;
  locked: boolean;
}

export interface ImageQuizSession {
  question: ImageQuestion;
  status: "idle" | "active" | "revealing";
  startTime: number | null;
  timeRemaining: number;
  winners: { username: string; displayName: string; time: number }[];
  answerFeed: { username: string; displayName: string; answer: string; correct: boolean; time: number }[];
  revealProgress: number;
}

export interface QuizModeConfig {
  id: QuizMode;
  label: string;
  icon: string;
  description: string;
}

export const QUIZ_MODES: QuizModeConfig[] = [
  { id: "character", label: "Guess The Character", icon: "👤", description: "Identify the anime character shown" },
  { id: "anime", label: "Guess The Anime", icon: "🎌", description: "Identify which anime the image belongs to" },
  { id: "hair", label: "Guess The Hair", icon: "💇", description: "Identify the character based only on their hair" },
  { id: "weapon", label: "Guess The Weapon", icon: "⚔️", description: "Identify the weapon owner or weapon name" },
  { id: "symbol", label: "Guess The Symbol", icon: "🔣", description: "Identify organizations, clans, guilds, emblems" },
  { id: "outfit", label: "Guess The Outfit", icon: "👘", description: "Identify the character based on clothing" },
];

export const DIFFICULTIES: { id: Difficulty; label: string; points: number }[] = [
  { id: "easy", label: "Easy", points: 15 },
  { id: "medium", label: "Medium", points: 25 },
  { id: "hard", label: "Hard", points: 40 },
];

export const REVEAL_MODES: { id: RevealMode; label: string; description: string }[] = [
  { id: "normal", label: "Normal", description: "Show full image" },
  { id: "blurred", label: "Blurred", description: "Image starts blurred" },
  { id: "pixelated", label: "Pixelated", description: "Image starts heavily pixelated" },
  { id: "zoomed", label: "Zoomed", description: "Show only a portion of image" },
  { id: "silhouette", label: "Silhouette", description: "Convert image to silhouette" },
  { id: "progressive", label: "Progressive Reveal", description: "Image gradually becomes clearer over time" },
];

export const TIMER_PRESETS = [5, 10, 15, 30, 45, 60, 90, 120, 180, 300, 600, 900, 1800, 2700, 3600];

export function formatTimer(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function formatTimerLabel(seconds: number): string {
  if (seconds >= 3600) return `${seconds / 3600}h`;
  if (seconds >= 60) return `${seconds / 60}min`;
  return `${seconds}sec`;
}

export function generateId(): string {
  return `iq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
