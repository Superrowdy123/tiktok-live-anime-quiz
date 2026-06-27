export interface QuestionFingerprint {
  text: string;
  anime: string;
  correctAnswer: string;
  category: string;
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[?.!,'"-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractKeywords(s: string): Set<string> {
  const ignored = new Set([
    "the", "a", "an", "in", "of", "to", "is", "was", "are", "were",
    "who", "what", "which", "where", "how", "does", "did", "do",
    "has", "have", "had", "this", "that", "these", "those", "from",
    "by", "with", "for", "on", "at", "be", "been", "being",
  ]);
  return new Set(
    normalize(s)
      .split(/\s+/)
      .filter(w => w.length > 2 && !ignored.has(w))
  );
}

function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  const intersection = new Set([...a].filter(x => b.has(x)));
  const union = new Set([...a, ...b]);
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

interface ExistingRecord {
  question: string;
  anime: string;
  correctAnswer: string;
  choices: string[];
  category: string;
  tags: string[];
  difficulty: string;
}

export class DuplicateDetector {
  private existing: ExistingRecord[] = [];
  private fingerprints: QuestionFingerprint[] = [];

  loadExisting(records: ExistingRecord[]) {
    this.existing = records;
    this.fingerprints = records.map(r => ({
      text: normalize(r.question),
      anime: normalize(r.anime),
      correctAnswer: normalize(r.correctAnswer),
      category: normalize(r.category),
    }));
  }

  addExisting(record: ExistingRecord) {
    this.existing.push(record);
    this.fingerprints.push({
      text: normalize(record.question),
      anime: normalize(record.anime),
      correctAnswer: normalize(record.correctAnswer),
      category: normalize(record.category),
    });
  }

  isDuplicate(
    question: string,
    anime: string,
    correctAnswer: string,
    choices: string[],
    category: string,
  ): { duplicate: boolean; reason?: string; matchType?: "exact" | "fuzzy" | "answer" | "qa" } {
    const nq = normalize(question);
    const na = normalize(anime);
    const nc = normalize(correctAnswer);
    const ncat = normalize(category);

    // 1. Exact text match
    for (const f of this.fingerprints) {
      if (f.text === nq) {
        return { duplicate: true, reason: `Exact duplicate question text`, matchType: "exact" };
      }
    }

    // 2. Same anime + same question keywords (fuzzy)
    const qKeywords = extractKeywords(question);
    for (const f of this.fingerprints) {
      if (f.anime === na) {
        const fKeywords = extractKeywords(f.text);
        const sim = jaccardSimilarity(qKeywords, fKeywords);
        if (sim > 0.7) {
          return { duplicate: true, reason: `Fuzzy match (similarity=${sim.toFixed(2)}) with existing question in ${anime}`, matchType: "fuzzy" };
        }
        // 3. Same anime + same correct answer
        if (f.correctAnswer === nc && sim > 0.3) {
          return { duplicate: true, reason: `Same anime + same answer + similar wording`, matchType: "qa" };
        }
      }
    }

    // 4. Check for very similar questions across anime (e.g. all "Who is X?")
    for (const f of this.fingerprints) {
      if (f.correctAnswer === nc && f.text.includes(nq.slice(0, 20))) {
        return { duplicate: true, reason: `Same answer with overlapping text`, matchType: "answer" };
      }
    }

    // 5. Check choices overlap - same Q&A with different wording
    const normChoices = new Set(choices.map(c => normalize(c)));
    for (const existing of this.existing) {
      const existingChoices = new Set(existing.choices.map(c => normalize(c)));
      if (existing.anime.toLowerCase() === anime.toLowerCase() && nc === normalize(existing.correctAnswer)) {
        const overlap = [...normChoices].filter(c => existingChoices.has(c)).length;
        if (overlap >= 3) {
          return { duplicate: true, reason: `Same anime, same answer, 3+ overlapping choices`, matchType: "fuzzy" };
        }
      }
    }

    return { duplicate: false };
  }
}
