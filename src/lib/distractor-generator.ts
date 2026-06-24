import { generateMCFromAnswer, searchLibrary, type LibraryEntry } from "@/data/content-library";
import type { QuizMode } from "./image-quiz-types";

const FALLBACK_DISTRACTORS: Record<QuizMode, string[]> = {
  character: ["Sasuke Uchiha", "Goku", "Luffy"],
  anime: ["Naruto", "One Piece", "Dragon Ball Z"],
  hair: ["Goku", "Sasuke Uchiha", "Ichigo Kurosaki"],
  weapon: ["Zangetsu", "Death Note", "Nichirin Blade"],
  symbol: ["Sharingan", "Akatsuki Cloud", "Straw Hat Jolly Roger"],
  outfit: ["Naruto Uzumaki", "Goku", "Monkey D. Luffy"],
};

export interface DistractorResult {
  options: [string, string, string, string];
  correctOptionIndex: number;
  anime?: string;
}

function normalize(str: string): string {
  return str.toLowerCase().trim().replace(/[^a-z0-9\s]/g, "");
}

function findLibraryEntry(answer: string, quizMode: QuizMode): LibraryEntry | null {
  const clean = normalize(answer);
  if (!clean) return null;

  const categoryMap: Record<QuizMode, string> = {
    character: "character",
    anime: "anime",
    hair: "character",
    weapon: "weapon",
    symbol: "symbol",
    outfit: "character",
  };

  const category = categoryMap[quizMode];
  const results = searchLibrary(answer, category as import("@/data/content-library").GuessCategory);
  return results.find(e =>
    normalize(e.answer) === clean ||
    e.aliases.some(a => normalize(a) === clean) ||
    normalize(e.answer).includes(clean) ||
    clean.includes(normalize(e.answer))
  ) || results[0] || null;
}

export function generateDistractors(
  correctAnswer: string,
  quizMode: QuizMode,
): DistractorResult {
  const entry = findLibraryEntry(correctAnswer, quizMode);

  if (entry) {
    const mcResult = generateMCFromAnswer(entry.answer, entry.category as import("@/data/content-library").GuessCategory);
    if (mcResult) {
      const correctIndex = mcResult.options.indexOf(entry.answer);
      if (correctIndex >= 0 && mcResult.options.every(o => o && o.trim())) {
        return {
          options: mcResult.options,
          correctOptionIndex: correctIndex,
          anime: entry.franchise,
        };
      }
    }
  }

  const fallbacks = FALLBACK_DISTRACTORS[quizMode] || FALLBACK_DISTRACTORS.character;
  const shuffled = [...fallbacks].sort(() => Math.random() - 0.5);
  const correctIndex = Math.floor(Math.random() * 4);
  const options: string[] = [];
  let added = 0;
  for (let i = 0; i < 4; i++) {
    if (i === correctIndex) {
      options.push(correctAnswer);
    } else {
      const fb = shuffled[added % shuffled.length];
      options.push(fb === correctAnswer ? `${fb} (alt)` : fb);
      added++;
    }
  }

  return {
    options: options as [string, string, string, string],
    correctOptionIndex: correctIndex,
    anime: entry?.franchise,
  };
}

export function regenerateOption(
  options: [string, string, string, string],
  correctAnswer: string,
  quizMode: QuizMode,
  targetIndex: number,
): string {
  const entry = findLibraryEntry(correctAnswer, quizMode);
  const used = new Set(options.map(o => normalize(o)));

  if (entry) {
    const sameFranchise = searchLibrary("", entry.category as import("@/data/content-library").GuessCategory)
      .filter(e =>
        e.franchise === entry.franchise &&
        normalize(e.answer) !== normalize(correctAnswer) &&
        !used.has(normalize(e.answer)) &&
        !e.aliases.some(a => used.has(normalize(a)))
      );
    if (sameFranchise.length > 0) {
      return sameFranchise[Math.floor(Math.random() * sameFranchise.length)].answer;
    }

    const others = searchLibrary("", entry.category as import("@/data/content-library").GuessCategory)
      .filter(e =>
        normalize(e.answer) !== normalize(correctAnswer) &&
        !used.has(normalize(e.answer))
      );
    if (others.length > 0) {
      return others[Math.floor(Math.random() * others.length)].answer;
    }
  }

  const fallbacks = FALLBACK_DISTRACTORS[quizMode] || FALLBACK_DISTRACTORS.character;
  const available = fallbacks.filter(f => !used.has(normalize(f)));
  if (available.length > 0) return available[Math.floor(Math.random() * available.length)];

  return `Option ${targetIndex + 1}`;
}
