export interface Question {
  id: number; round: number; type: "multiple_choice";
  difficulty: "easy"|"medium"|"hard"; question: string;
  options: [string,string,string,string]; answer: "A"|"B"|"C"|"D"; timeLimit: number;
}

let cache: Question[] = [];
let totalRounds = 0;

async function loadFromDb(): Promise<void> {
  try {
    const { db } = await import("@/db");
    const { questions } = await import("@/db/schema");
    const rows = await db.select().from(questions);

    const mapped: Question[] = rows.map(r => {
      const opts = r.choices as [string, string, string, string];
      const correctIdx = opts.findIndex(c => c.toLowerCase() === r.correctAnswer.toLowerCase());
      const answer = (["A", "B", "C", "D"] as const)[correctIdx >= 0 ? correctIdx : 0];
      return {
        id: r.id,
        round: 0,
        type: "multiple_choice",
        difficulty: r.difficulty as "easy" | "medium" | "hard",
        question: r.question,
        options: opts,
        answer,
        timeLimit: 30,
      };
    });

    const easy = mapped.filter(q => q.difficulty === "easy");
    const medium = mapped.filter(q => q.difficulty === "medium");
    const hard = mapped.filter(q => q.difficulty === "hard");

    // Interleave: E, M, H, E, M, H, ... using all available questions
    const ordered: Question[] = [];
    let ei = 0, mi = 0, hi = 0;
    while (ei < easy.length || mi < medium.length || hi < hard.length) {
      if (ei < easy.length) ordered.push(easy[ei++]);
      if (mi < medium.length) ordered.push(medium[mi++]);
      if (hi < hard.length) ordered.push(hard[hi++]);
    }

    const ROUND_SIZE = 30;
    totalRounds = Math.ceil(ordered.length / ROUND_SIZE);
    ordered.forEach((q, i) => {
      q.round = Math.floor(i / ROUND_SIZE) + 1;
    });

    cache = ordered;

    cache = mapped;
  } catch (e) {
    console.warn("Failed to load questions from DB, using empty pool:", e);
    cache = [];
    totalRounds = 0;
  }
}

// Preload at module initialization
const initPromise = loadFromDb();

export function getQuestionsForRound(round: number): Question[] {
  return cache.filter(q => q.round === round);
}

export function getTotalRounds(): number {
  return totalRounds;
}

export function getInitPromise(): Promise<void> {
  return initPromise;
}

const allQuestions: Question[] = [];
export default allQuestions;
