import "dotenv/config";
import { initializeGenerator, generateQuestionBatch } from "./question-generator";
import { DuplicateDetector } from "./dedup";
import { logger } from "./logger";
import { countExistingQuestions, getExistingRecords, insertAllBatches } from "./batch-inserter";

const TARGET_TOTAL = 5000;

export async function seedAnimeDatabase(target: number = TARGET_TOTAL) {
  const startTime = Date.now();

  console.log("=== ANIME WIZ DATABASE SEEDER ===");
  console.log(`Target total questions: ${target}`);

  initializeGenerator();

  let existingCount = 0;
  let existingRecords: { question: string; anime: string; correctAnswer: string; choices: string[]; category: string; tags: string[]; difficulty: string }[] = [];

  try {
    existingCount = await countExistingQuestions();
    console.log(`Existing questions in database: ${existingCount}`);

    if (existingCount >= target) {
      console.log(`Target already reached (${existingCount} >= ${target}). Nothing to do.`);
      logger.summary(`Seeder skipped: already ${existingCount} questions (target: ${target})`);
      return { existing: existingCount, generated: 0, total: existingCount };
    }

    existingRecords = await getExistingRecords();
    console.log(`Loaded ${existingRecords.length} existing records for dedup`);
  } catch (e) {
    console.log("Could not read existing database. Will start fresh.");
    logger.error(`Seed start error: ${e instanceof Error ? e.message : String(e)}`);
  }

  const needed = target - existingCount;
  console.log(`Need to generate: ${needed} questions`);
  logger.summary(`Need to generate: ${needed} questions (existing: ${existingCount}, target: ${target})`);

  const detector = new DuplicateDetector();
  const BATCH_SIZE = 250;
  const batches = Math.ceil(needed / BATCH_SIZE);
  let totalGenerated = 0;
  let totalErrors = 0;

  for (let batch = 0; batch < batches; batch++) {
    const batchNeeded = Math.min(BATCH_SIZE, needed - totalGenerated);
    console.log(`\n--- Batch ${batch + 1}/${batches} ---`);
    console.log(`Generating ${batchNeeded} questions...`);

    const questions = generateQuestionBatch(batchNeeded, detector, existingRecords);

    if (questions.length === 0) {
      console.log("WARNING: No questions generated in this batch. Generator may be exhausted.");
      logger.error(`Batch ${batch + 1}: No questions generated`);
      break;
    }

    console.log(`Validated: ${questions.length}`);

    const toInsert = questions.map(q => ({
      question: q.question,
      correctAnswer: q.correctAnswer,
      choices: q.choices,
      explanation: q.explanation,
      category: q.category,
      anime: q.anime,
      difficulty: q.difficulty,
      tags: q.tags,
      points: q.difficulty === "hard" ? 30 : q.difficulty === "medium" ? 20 : 10,
      imageUrl: null as string | null,
      hint: q.hint,
    }));

    const result = await insertAllBatches(toInsert);
    totalGenerated += result.totalInserted;
    totalErrors += result.totalErrors;

    // Add newly inserted questions to existing records for dedup
    for (const q of questions) {
      existingRecords.push({
        question: q.question,
        anime: q.anime,
        correctAnswer: q.correctAnswer,
        choices: q.choices,
        category: q.category,
        tags: q.tags,
        difficulty: q.difficulty,
      });
    }

    console.log(`Progress: ${totalGenerated} / ${needed} generated and inserted`);

    if (totalGenerated >= needed) break;
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const finalCount = await countExistingQuestions().catch(() => existingCount + totalGenerated);

  const summary = {
    existing: existingCount,
    generated: totalGenerated,
    errors: totalErrors,
    final: Math.max(finalCount, existingCount + totalGenerated),
    elapsed: `${elapsed}s`,
    target,
  };

  console.log("\n=== SEED COMPLETE ===");
  console.log(` Existing: ${summary.existing}`);
  console.log(` Generated: ${summary.generated}`);
  console.log(` Errors: ${summary.errors}`);
  console.log(` Final total: ${summary.final}`);
  console.log(` Target: ${summary.target}`);
  console.log(` Time: ${summary.elapsed}`);

  logger.summary(`=== SEED COMPLETE ===`);
  logger.summary(`Existing: ${summary.existing}`);
  logger.summary(`Generated: ${summary.generated}`);
  logger.summary(`Errors: ${summary.errors}`);
  logger.summary(`Final total: ${summary.final}`);
  logger.summary(`Target: ${summary.target}`);
  logger.summary(`Time: ${summary.elapsed}`);

  logger.closeAll();

  return summary;
}

const isMain = process.argv[1]?.endsWith("seed.ts") || process.argv[1]?.endsWith("seed.js");
if (isMain) {
  seedAnimeDatabase().catch(console.error);
}
