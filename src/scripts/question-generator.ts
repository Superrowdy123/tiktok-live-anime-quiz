import { DuplicateDetector } from "./dedup";
import { validateQuestion, ValidatedQuestion, ValidationResult } from "./validator";
import { logger } from "./logger";
import { buildAnimeLibrary, AnimeEntry } from "../data/anime-knowledge-base";
import { scanAvailableImages } from "./image-mapper";

const VALID_CATEGORIES = [
  "Character", "Anime", "Transformation", "Weapon", "Power", "Technique",
  "Hair", "Eyes", "Quote", "Organization", "Family", "Location",
  "Villain", "Hero", "Movie", "Manga", "Arc", "Opening", "Ending",
  "Trivia", "Battle", "Symbol", "Logo", "Silhouette", "Emoji",
  "Image Guess", "Blurred Image", "Voice Actor", "Random Facts",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function removeRandom<T>(arr: T[], exclude: T[]): T {
  const pool = arr.filter(x => !exclude.includes(x));
  if (pool.length === 0) return arr[Math.floor(Math.random() * arr.length)];
  return pick(pool);
}

function shuffle<T>(arr: T[]): T[] {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

const DIFF_WEIGHTS = ["easy", "easy", "easy", "easy", "medium", "medium", "medium", "medium", "hard", "hard"] as const;

function pickDifficulty(): "easy" | "medium" | "hard" {
  return pick([...DIFF_WEIGHTS]);
}

function pointsForDifficulty(d: string): number {
  if (d === "hard") return 30;
  if (d === "medium") return 20;
  return 10;
}

interface RawQuestion {
  question: string;
  correctAnswer: string;
  choices: string[];
  explanation: string;
  category: string;
  anime: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  hint: string;
}

function makeChoices(correct: string, wrongPool: string[], count = 3): string[] {
  const filtered = wrongPool.filter(w => w.toLowerCase() !== correct.toLowerCase());
  const shuffled = shuffle(filtered);
  const distractors = shuffled.slice(0, count);
  while (distractors.length < count) {
    distractors.push(pick(wrongPool));
  }
  const all = shuffle([correct, ...distractors]);
  return all;
}

interface Template {
  category: string;
  generate: (anime: AnimeEntry) => RawQuestion | null;
}

const TEMPLATES: Template[] = [
  {
    category: "Character",
    generate: (a) => {
      if (a.characters.length < 4) return null;
      return {
        question: `Who is the main protagonist of ${a.title}?`,
        correctAnswer: a.protagonist,
        choices: makeChoices(a.protagonist, a.characters),
        explanation: `${a.protagonist} is the main protagonist of ${a.title}.`,
        category: "Character", anime: a.title,
        difficulty: "easy",
        tags: [a.id, "protagonist"],
        hint: `This character is the main hero of ${a.title}`,
      };
    },
  },
  {
    category: "Character",
    generate: (a) => {
      if (a.characters.length < 5) return null;
      const nonProtag = a.characters.filter(c => c.toLowerCase() !== a.protagonist.toLowerCase());
      if (nonProtag.length < 4) return null;
      const correct = pick(nonProtag);
      return {
        question: `Which anime does ${correct} belong to?`,
        correctAnswer: a.title,
        choices: makeChoices(a.title, [...lib.keys()].map(k => lib.get(k)!.title)),
        explanation: `${correct} is a character from ${a.title}.`,
        category: "Anime", anime: a.title,
        difficulty: "easy",
        tags: [a.id, "character"],
        hint: `This character appears in ${a.title}`,
      };
    },
  },
  {
    category: "Villain",
    generate: (a) => {
      if (a.villains.length < 2) return null;
      const correct = pick(a.villains);
      return {
        question: `Who is the main villain of ${a.title}?`,
        correctAnswer: correct,
        choices: makeChoices(correct, a.villains),
        explanation: `${correct} is one of the main antagonists in ${a.title}.`,
        category: "Villain", anime: a.title,
        difficulty: "easy",
        tags: [a.id, "villain"],
        hint: `This villain opposes the protagonist of ${a.title}`,
      };
    },
  },
  {
    category: "Power",
    generate: (a) => {
      if (!a.abilities || a.abilities.length < 4) return null;
      const correct = pick(a.abilities);
      return {
        question: `Which ability or power system is used in ${a.title}?`,
        correctAnswer: correct,
        choices: makeChoices(correct, a.abilities),
        explanation: `${correct} is one of the abilities featured in ${a.title}.`,
        category: "Power", anime: a.title,
        difficulty: "easy",
        tags: [a.id, "power", "ability"],
        hint: `This power is prominently featured in ${a.title}`,
      };
    },
  },
  {
    category: "Technique",
    generate: (a) => {
      if (!a.techniques || a.techniques.length < 4) return null;
      const correct = pick(a.techniques);
      return {
        question: `Which technique is associated with ${a.title}?`,
        correctAnswer: correct,
        choices: makeChoices(correct, a.techniques),
        explanation: `${correct} is a technique used in ${a.title}.`,
        category: "Technique", anime: a.title,
        difficulty: "medium",
        tags: [a.id, "technique"],
        hint: `This technique appears in ${a.title}`,
      };
    },
  },
  {
    category: "Weapon",
    generate: (a) => {
      if (!a.weapons || a.weapons.length < 4) return null;
      const correct = pick(a.weapons);
      return {
        question: `Which weapon is featured in ${a.title}?`,
        correctAnswer: correct,
        choices: makeChoices(correct, a.weapons),
        explanation: `${correct} is a weapon featured in ${a.title}.`,
        category: "Weapon", anime: a.title,
        difficulty: pickDifficulty(),
        tags: [a.id, "weapon"],
        hint: `This weapon is used by characters in ${a.title}`,
      };
    },
  },
  {
    category: "Location",
    generate: (a) => {
      if (!a.locations || a.locations.length < 4) return null;
      const correct = pick(a.locations);
      return {
        question: `Which location is significant in ${a.title}?`,
        correctAnswer: correct,
        choices: makeChoices(correct, a.locations),
        explanation: `${correct} is an important location in ${a.title}.`,
        category: "Location", anime: a.title,
        difficulty: "medium",
        tags: [a.id, "location"],
        hint: `This place is important to the story of ${a.title}`,
      };
    },
  },
  {
    category: "Organization",
    generate: (a) => {
      if (!a.organizations || a.organizations.length < 4) return null;
      const correct = pick(a.organizations);
      return {
        question: `Which organization exists in ${a.title}?`,
        correctAnswer: correct,
        choices: makeChoices(correct, a.organizations),
        explanation: `${correct} is an organization within ${a.title}.`,
        category: "Organization", anime: a.title,
        difficulty: pickDifficulty(),
        tags: [a.id, "organization"],
        hint: `This group plays a role in ${a.title}`,
      };
    },
  },
  {
    category: "Arc",
    generate: (a) => {
      if (!a.arcs || a.arcs.length < 4) return null;
      const correct = pick(a.arcs);
      return {
        question: `Which story arc is part of ${a.title}?`,
        correctAnswer: correct,
        choices: makeChoices(correct, a.arcs),
        explanation: `${correct} is a story arc in ${a.title}.`,
        category: "Arc", anime: a.title,
        difficulty: "hard",
        tags: [a.id, "arc"],
        hint: `This arc is a major storyline in ${a.title}`,
      };
    },
  },
  {
    category: "Hair",
    generate: (a) => {
      if (!a.hairColors || a.hairColors.length < 4) return null;
      const char = pick(a.characters);
      const color = pick(a.hairColors);
      return {
        question: `What hair color does ${char} from ${a.title} have?`,
        correctAnswer: color,
        choices: makeChoices(color, a.hairColors),
        explanation: `${char} from ${a.title} has ${color.toLowerCase()} hair.`,
        category: "Hair", anime: a.title,
        difficulty: pickDifficulty(),
        tags: [a.id, "hair", "appearance"],
        hint: `Think about the character's appearance in ${a.title}`,
      };
    },
  },
  {
    category: "Eyes",
    generate: (a) => {
      if (!a.eyeColors || a.eyeColors.length < 4) return null;
      const char = pick(a.characters);
      const color = pick(a.eyeColors);
      return {
        question: `What eye color does ${char} from ${a.title} have?`,
        correctAnswer: color,
        choices: makeChoices(color, a.eyeColors),
        explanation: `${char} from ${a.title} has ${color.toLowerCase()} eyes.`,
        category: "Eyes", anime: a.title,
        difficulty: pickDifficulty(),
        tags: [a.id, "eyes", "appearance"],
        hint: `Think about the character's eye color in ${a.title}`,
      };
    },
  },
  {
    category: "Anime",
    generate: (a) => {
      if (a.creator.length < 2) return null;
      return {
        question: `Who created the anime/manga ${a.title}?`,
        correctAnswer: a.creator,
        choices: makeChoices(a.creator, [...lib.keys()].map(k => lib.get(k)!.creator)),
        explanation: `${a.title} was created by ${a.creator}.`,
        category: "Anime", anime: a.title,
        difficulty: pickDifficulty(),
        tags: [a.id, "creator"],
        hint: `This person is the author of ${a.title}`,
      };
    },
  },
  {
    category: "Anime",
    generate: (a) => {
      return {
        question: `Which studio animated ${a.title}?`,
        correctAnswer: a.studio,
        choices: makeChoices(a.studio, [...lib.keys()].map(k => lib.get(k)!.studio)),
        explanation: `${a.title} was animated by ${a.studio}.`,
        category: "Anime", anime: a.title,
        difficulty: pickDifficulty(),
        tags: [a.id, "studio", "production"],
        hint: `This production company animated ${a.title}`,
      };
    },
  },
  {
    category: "Anime",
    generate: (a) => {
      return {
        question: `In what year did ${a.title} first air?`,
        correctAnswer: String(a.yearStarted),
        choices: makeChoices(String(a.yearStarted), [...lib.keys()].map(k => String(lib.get(k)!.yearStarted))),
        explanation: `${a.title} first aired in ${a.yearStarted}.`,
        category: "Anime", anime: a.title,
        difficulty: "hard",
        tags: [a.id, "year", "air date"],
        hint: `This series began in the ${Math.floor(a.yearStarted / 10) * 0}s`,
      };
    },
  },
  {
    category: "Anime",
    generate: (a) => {
      const correct = pick(a.genres);
      return {
        question: `What genre is ${a.title}?`,
        correctAnswer: correct,
        choices: makeChoices(correct, [...new Set([...lib.keys()].flatMap(k => lib.get(k)!.genres))]),
        explanation: `${a.title} is a ${correct} anime.`,
        category: "Anime", anime: a.title,
        difficulty: "easy",
        tags: [a.id, "genre"],
        hint: `Think about what category ${a.title} falls into`,
      };
    },
  },
  {
    category: "Family",
    generate: (a) => {
      if (a.families.length === 0) return null;
      const fam = pick(a.families);
      if (fam.length < 2) return null;
      const member = pick(fam);
      const relative = pick(fam.filter(r => r !== member));
      return {
        question: `In ${a.title}, how is ${member} related to ${relative}?`,
        correctAnswer: "Family member/Family",
        choices: ["Family member/Family", "Rivals", "Enemies", "Friends"],
        explanation: `${member} and ${relative} are family members in ${a.title}.`,
        category: "Family", anime: a.title,
        difficulty: "hard",
        tags: [a.id, "family", "relationship"],
        hint: `They share blood relations in ${a.title}`,
      };
    },
  },
  {
    category: "Trivia",
    generate: (a) => {
      if (!a.openings || a.openings.length === 0) return null;
      const opening = pick(a.openings);
      return {
        question: `Which opening theme is associated with ${a.title}?`,
        correctAnswer: opening,
        choices: makeChoices(opening, [...new Set([...lib.keys()].flatMap(k => lib.get(k)!.openings || []))]),
        explanation: `${opening} is one of the opening themes for ${a.title}.`,
        category: "Opening", anime: a.title,
        difficulty: pickDifficulty(),
        tags: [a.id, "opening", "music"],
        hint: `This song plays at the start of ${a.title} episodes`,
      };
    },
  },
];

let lib: Map<string, AnimeEntry>;
let imageMap: Map<string, string> = new Map();

export function initializeGenerator() {
  lib = buildAnimeLibrary();
  try { imageMap = scanAvailableImages(); } catch { imageMap = new Map(); }
}

function mapImage(animeName: string, correctAnswer: string): string | null {
  const animeKey = animeName.toLowerCase().replace(/[^a-z0-9]/g, "").replace(/\s+/g, "");
  if (imageMap.has(animeKey)) return imageMap.get(animeKey)!;
  const charKey = correctAnswer.toLowerCase().replace(/[^a-z0-9]/g, "").replace(/\s+/g, "");
  if (imageMap.has(charKey)) return imageMap.get(charKey)!;
  return null;
}

export function* generateQuestions(targetCount: number, detector: DuplicateDetector): Generator<RawQuestion> {
  if (!lib) initializeGenerator();
  const entries = [...lib.values()].filter(e => e.characters.length > 0);
  let generated = 0;
  const MAX_ATTEMPTS = targetCount * 10;
  let attempts = 0;

  while (generated < targetCount && attempts < MAX_ATTEMPTS) {
    attempts++;
    const anime = pick(entries);
    const template = pick(TEMPLATES);
    const raw = template.generate(anime);
    if (!raw) continue;

    const dup = detector.isDuplicate(raw.question, raw.anime, raw.correctAnswer, raw.choices, raw.category);
    if (dup.duplicate) {
      logger.duplicates(`Skipped duplicate: ${raw.question} (${dup.reason})`);
      continue;
    }

    const record = {
      question: raw.question,
      anime: raw.anime,
      correctAnswer: raw.correctAnswer,
      choices: raw.choices.map(c => String(c)),
      category: raw.category,
      tags: raw.tags,
      difficulty: raw.difficulty,
    };

    detector.addExisting(record);

    yield raw;
    generated++;
  }
}

export function generateQuestionBatch(
  count: number,
  detector: DuplicateDetector,
  existingRecords: { question: string; anime: string; correctAnswer: string; choices: string[]; category: string; tags: string[]; difficulty: string }[],
): RawQuestion[] {
  if (!lib) initializeGenerator();
  detector.loadExisting(existingRecords);

  const validQuestions: RawQuestion[] = [];
  const gen = generateQuestions(count, detector);

  for (const q of gen) {
    const raw = q;
    const payload = {
      question: raw.question,
      correctAnswer: raw.correctAnswer,
      choices: raw.choices,
      explanation: raw.explanation,
      category: raw.category,
      anime: raw.anime,
      difficulty: raw.difficulty,
      tags: raw.tags,
      points: pointsForDifficulty(raw.difficulty),
      imageUrl: mapImage(raw.anime, raw.correctAnswer),
      hint: raw.hint,
    };

    const validation = validateQuestion(payload);
    if (!validation.valid) {
      logger.validation(`Validation failed: ${raw.question} - ${(validation as ValidationResult).errors.join(", ")}`);
      continue;
    }

    validQuestions.push(raw);
    if (validQuestions.length >= count) break;
  }

  return validQuestions;
}
