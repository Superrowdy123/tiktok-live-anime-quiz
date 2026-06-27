import { db } from "../db";
import { questions } from "../db/schema";
import { logger } from "./logger";
import { sql } from "drizzle-orm";

const BATCH_SIZE = 250;

export interface InsertableQuestion {
  question: string;
  correctAnswer: string;
  choices: string[];
  explanation: string;
  category: string;
  anime: string;
  difficulty: string;
  tags: string[];
  points: number;
  imageUrl: string | null;
  hint: string;
}

export async function countExistingQuestions(): Promise<number> {
  try {
    const result = await db.select({ count: sql<number>`COUNT(*)` }).from(questions);
    return Number(result[0]?.count ?? 0);
  } catch {
    logger.error("Could not count existing questions. Database may not exist yet.");
    return 0;
  }
}

export async function getExistingRecords() {
  try {
    const rows = await db.select().from(questions);
    return rows.map(r => ({
      question: r.question,
      anime: r.anime,
      correctAnswer: r.correctAnswer,
      choices: r.choices as string[],
      category: r.category,
      tags: r.tags as string[],
      difficulty: r.difficulty,
    }));
  } catch {
    return [];
  }
}

export async function insertBatch(
  batch: InsertableQuestion[],
  batchIndex: number,
): Promise<{ inserted: number; errors: number }> {
  let inserted = 0;
  let errors = 0;

  try {
    await db.transaction(async (tx) => {
      for (const q of batch) {
        try {
          await tx.insert(questions).values({
            question: q.question,
            correctAnswer: q.correctAnswer,
            choices: q.choices,
            explanation: q.explanation,
            category: q.category,
            anime: q.anime,
            difficulty: q.difficulty,
            tags: q.tags,
            points: q.points,
            imageUrl: q.imageUrl,
            hint: q.hint,
          });
          inserted++;
        } catch (e) {
          errors++;
          logger.error(`Insert error in batch ${batchIndex}: ${e instanceof Error ? e.message : String(e)}`);
          if (errors > 10) {
            logger.error(`Too many errors in batch ${batchIndex}, rolling back`);
            throw e;
          }
        }
      }
    });
  } catch (e) {
    logger.error(`Batch ${batchIndex} failed entirely: ${e instanceof Error ? e.message : String(e)}`);
    return { inserted: 0, errors: batch.length };
  }

  return { inserted, errors };
}

export async function insertAllBatches(
  questionsToInsert: InsertableQuestion[],
): Promise<{ totalInserted: number; totalErrors: number }> {
  const totalBatches = Math.ceil(questionsToInsert.length / BATCH_SIZE);
  let totalInserted = 0;
  let totalErrors = 0;

  logger.summary(`Starting batch insertion: ${questionsToInsert.length} questions in ${totalBatches} batches of ${BATCH_SIZE}`);

  for (let i = 0; i < totalBatches; i++) {
    const start = i * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, questionsToInsert.length);
    const batch = questionsToInsert.slice(start, end);

    logger.summary(`Inserting batch ${i + 1}/${totalBatches} (${batch.length} questions)...`);
    const result = await insertBatch(batch, i + 1);
    totalInserted += result.inserted;
    totalErrors += result.errors;

    logger.questionsCreated(`Batch ${i + 1}/${totalBatches}: inserted ${result.inserted}, errors ${result.errors}`);
    console.log(`Inserted: ${totalInserted} / ${questionsToInsert.length} (batch ${i + 1}/${totalBatches})`);
  }

  return { totalInserted, totalErrors };
}
