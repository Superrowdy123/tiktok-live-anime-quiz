const VALID_CATEGORIES = [
  "Character", "Anime", "Transformation", "Weapon", "Power", "Technique",
  "Hair", "Eyes", "Quote", "Organization", "Family", "Location",
  "Villain", "Hero", "Movie", "Manga", "Arc", "Opening", "Ending",
  "Trivia", "Battle", "Symbol", "Logo", "Silhouette", "Emoji",
  "Image Guess", "Blurred Image", "Voice Actor", "Random Facts",
];

const VALID_DIFFICULTIES = ["easy", "medium", "hard"];

export interface ValidatedQuestion {
  question: string;
  correctAnswer: string;
  choices: string[];
  explanation: string;
  category: string;
  anime: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  points: number;
  imageUrl: string | null;
  hint: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  question: ValidatedQuestion | null;
}

export function validateQuestion(q: unknown): ValidationResult {
  const errors: string[] = [];
  if (!q || typeof q !== "object") return { valid: false, errors: ["Input is not an object"], question: null };

  const rec = q as Record<string, unknown>;

  if (!rec.question || typeof rec.question !== "string" || rec.question.trim().length < 5) {
    errors.push("Question text is missing or too short");
  }
  if (!rec.correctAnswer || typeof rec.correctAnswer !== "string" || rec.correctAnswer.trim().length === 0) {
    errors.push("Correct answer is missing");
  }
  if (!Array.isArray(rec.choices) || rec.choices.length !== 4) {
    errors.push("Choices must be an array of exactly 4 strings");
  }
  if (!rec.explanation || typeof rec.explanation !== "string" || rec.explanation.trim().length < 3) {
    errors.push("Explanation is missing or too short");
  }
  if (!rec.category || typeof rec.category !== "string" || !VALID_CATEGORIES.includes(rec.category)) {
    errors.push(`Invalid category. Must be one of: ${VALID_CATEGORIES.join(", ")}`);
  }
  if (!rec.anime || typeof rec.anime !== "string" || rec.anime.trim().length === 0) {
    errors.push("Anime field is missing");
  }
  if (!rec.difficulty || typeof rec.difficulty !== "string" || !VALID_DIFFICULTIES.includes(rec.difficulty)) {
    errors.push("Invalid difficulty. Must be easy, medium, or hard");
  }

  // Choices validation
  if (Array.isArray(rec.choices) && rec.choices.length === 4) {
    const choiceStrings = rec.choices.map(c => String(c).trim().toLowerCase());
    const unique = new Set(choiceStrings);
    if (unique.size !== 4) {
      errors.push("Choices contain duplicates");
    }
    if (typeof rec.correctAnswer === "string" && !choiceStrings.includes(rec.correctAnswer.trim().toLowerCase())) {
      errors.push("Correct answer must be one of the choices");
    }
  }

  if (rec.imageUrl !== null && rec.imageUrl !== undefined && typeof rec.imageUrl === "string") {
    if (rec.imageUrl.length > 0 && !rec.imageUrl.startsWith("/")) {
      errors.push("Image URL must be a valid path starting with /");
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors, question: null };
  }

  const choices = (rec.choices as string[]).map(c => String(c).trim());
  const question = String(rec.question).trim();
  const correctAnswer = String(rec.correctAnswer).trim();
  const explanation = String(rec.explanation).trim();
  const category = String(rec.category).trim();
  const anime = String(rec.anime).trim();
  const difficulty = String(rec.difficulty).trim() as "easy" | "medium" | "hard";
  const tags = Array.isArray(rec.tags) ? rec.tags.map(String) : [];
  const points = typeof rec.points === "number" ? rec.points : difficulty === "hard" ? 30 : difficulty === "medium" ? 20 : 10;
  const imageUrl = typeof rec.imageUrl === "string" && rec.imageUrl.length > 0 ? rec.imageUrl : null;
  const hint = typeof rec.hint === "string" ? rec.hint : "";

  return {
    valid: true,
    errors: [],
    question: { question, correctAnswer, choices, explanation, category, anime, difficulty, tags, points, imageUrl, hint },
  };
}
