import { initializeGenerator, generateQuestionBatch } from "./src/scripts/question-generator";
import { DuplicateDetector } from "./src/scripts/dedup";
import { validateQuestion } from "./src/scripts/validator";

console.log("starting");
initializeGenerator();
console.log("init done");
const d = new DuplicateDetector();
console.log("detector ready");
const qs = generateQuestionBatch(10, d, []);
console.log("got", qs.length, "questions");
qs.forEach((q,i) => console.log(i+1, q.category, q.difficulty, q.question.substring(0,60)));
