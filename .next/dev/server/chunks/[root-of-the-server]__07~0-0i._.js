module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/db/index.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "db",
    ()=>db,
    "pool",
    ()=>pool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/node-postgres/driver.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
}
const globalForDb = globalThis;
const pool = globalForDb.__arenaNextJsPostgresqlPool ?? new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["Pool"]({
    connectionString: databaseUrl
});
if ("TURBOPACK compile-time truthy", 1) {
    globalForDb.__arenaNextJsPostgresqlPool = pool;
}
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["drizzle"])(pool);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/db/schema.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "answerLog",
    ()=>answerLog,
    "gameSessions",
    ()=>gameSessions,
    "sessionScores",
    ()=>sessionScores,
    "statistics",
    ()=>statistics,
    "users",
    ()=>users
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/table.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/serial.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/text.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/integer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/boolean.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/timestamp.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/jsonb.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/real.js [app-route] (ecmascript)");
;
const users = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("users", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    tiktokUsername: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("tiktok_username").notNull().unique(),
    displayName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("display_name").notNull(),
    totalPoints: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("total_points").notNull().default(0),
    gamesPlayed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("games_played").notNull().default(0),
    questionsAnswered: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("questions_answered").notNull().default(0),
    correctAnswers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("correct_answers").notNull().default(0),
    bestStreak: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("best_streak").notNull().default(0),
    level: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("level").notNull().default(1),
    xp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("xp").notNull().default(0),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("title").notNull().default("Anime Rookie"),
    coins: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("coins").notNull().default(0),
    achievements: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("achievements").$type().default([]),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").defaultNow().notNull(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").defaultNow().notNull()
});
const gameSessions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("game_sessions", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("status").notNull().default("waiting"),
    totalQuestions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("total_questions").notNull().default(0),
    questionsAsked: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("questions_asked").notNull().default(0),
    totalPlayers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("total_players").notNull().default(0),
    season: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("season"),
    difficulty: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("difficulty").notNull().default("mixed"),
    startedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("started_at"),
    endedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("ended_at"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").defaultNow().notNull()
});
const sessionScores = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("session_scores", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    sessionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("session_id").notNull(),
    tiktokUsername: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("tiktok_username").notNull(),
    displayName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("display_name").notNull(),
    points: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("points").notNull().default(0),
    streak: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("streak").notNull().default(0),
    bestStreak: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("best_streak").notNull().default(0),
    correctAnswers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("correct_answers").notNull().default(0),
    totalAnswers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("total_answers").notNull().default(0),
    fastestAnswer: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])("fastest_answer"),
    team: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("team"),
    powerUps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("power_ups").$type().default({})
});
const answerLog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("answer_log", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    sessionId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("session_id").notNull(),
    questionIndex: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("question_index").notNull(),
    tiktokUsername: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("tiktok_username").notNull(),
    answer: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("answer").notNull(),
    correct: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("correct").notNull().default(false),
    pointsAwarded: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("points_awarded").notNull().default(0),
    answerTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])("answer_time"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").defaultNow().notNull()
});
const statistics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("statistics", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("key").notNull().unique(),
    value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("value").notNull(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").defaultNow().notNull()
});
}),
"[project]/src/data/questions.json.[json].cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = JSON.parse("[{\"id\":1,\"type\":\"multiple_choice\",\"difficulty\":\"easy\",\"category\":\"general\",\"question\":\"What is the name of the main character in Naruto?\",\"options\":[\"A) Sasuke Uchiha\",\"B) Naruto Uzumaki\",\"C) Kakashi Hatake\",\"D) Sakura Haruno\"],\"answer\":\"B\",\"aliases\":[\"naruto\",\"naruto uzumaki\",\"b\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":2,\"type\":\"multiple_choice\",\"difficulty\":\"easy\",\"category\":\"general\",\"question\":\"Which anime features a boy who finds a notebook that can kill anyone?\",\"options\":[\"A) Death Note\",\"B) Tokyo Ghoul\",\"C) Bleach\",\"D) Psycho-Pass\"],\"answer\":\"A\",\"aliases\":[\"death note\",\"a\",\"deathnote\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":3,\"type\":\"guess_the_anime\",\"difficulty\":\"easy\",\"category\":\"general\",\"question\":\"Which anime features pirates searching for the One Piece treasure?\",\"options\":[],\"answer\":\"One Piece\",\"aliases\":[\"one piece\",\"onepiece\",\"op\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":4,\"type\":\"true_or_false\",\"difficulty\":\"easy\",\"category\":\"general\",\"question\":\"True or False: Goku is from the anime Dragon Ball Z.\",\"options\":[\"True\",\"False\"],\"answer\":\"True\",\"aliases\":[\"true\",\"t\",\"yes\"],\"image\":null,\"audio\":null,\"timeLimit\":10},{\"id\":5,\"type\":\"guess_the_character\",\"difficulty\":\"easy\",\"category\":\"characters\",\"question\":\"Which character is known as the 'Pirate King' in One Piece?\",\"options\":[],\"answer\":\"Gol D. Roger\",\"aliases\":[\"gol d roger\",\"gol d. roger\",\"roger\",\"gold roger\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":6,\"type\":\"multiple_choice\",\"difficulty\":\"easy\",\"category\":\"general\",\"question\":\"What type of creature is Pikachu?\",\"options\":[\"A) Fire type\",\"B) Water type\",\"C) Electric type\",\"D) Grass type\"],\"answer\":\"C\",\"aliases\":[\"electric\",\"electric type\",\"c\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":7,\"type\":\"guess_the_anime\",\"difficulty\":\"easy\",\"category\":\"general\",\"question\":\"Which anime is about a boy who becomes a Soul Reaper to protect his family?\",\"options\":[],\"answer\":\"Bleach\",\"aliases\":[\"bleach\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":8,\"type\":\"multiple_choice\",\"difficulty\":\"easy\",\"category\":\"general\",\"question\":\"What is the name of the giant walls in Attack on Titan?\",\"options\":[\"A) Wall Maria, Rose, Sina\",\"B) Wall Alpha, Beta, Gamma\",\"C) Wall North, South, East\",\"D) Wall Fire, Water, Earth\"],\"answer\":\"A\",\"aliases\":[\"wall maria\",\"maria rose sina\",\"a\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":9,\"type\":\"true_or_false\",\"difficulty\":\"easy\",\"category\":\"general\",\"question\":\"True or False: Luffy ate the Gum-Gum Fruit (Gomu Gomu no Mi).\",\"options\":[\"True\",\"False\"],\"answer\":\"True\",\"aliases\":[\"true\",\"t\",\"yes\"],\"image\":null,\"audio\":null,\"timeLimit\":10},{\"id\":10,\"type\":\"guess_the_character\",\"difficulty\":\"easy\",\"category\":\"characters\",\"question\":\"Who is Naruto's sensei in Team 7?\",\"options\":[],\"answer\":\"Kakashi\",\"aliases\":[\"kakashi\",\"kakashi hatake\",\"kakashi sensei\",\"copy ninja kakashi\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":11,\"type\":\"multiple_choice\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"What is the name of the Titan that Eren Yeager transforms into?\",\"options\":[\"A) Colossal Titan\",\"B) Attack Titan\",\"C) Armored Titan\",\"D) Beast Titan\"],\"answer\":\"B\",\"aliases\":[\"attack titan\",\"b\",\"shingeki no kyojin\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":12,\"type\":\"guess_the_anime\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"Which anime features Alchemy and two brothers trying to restore their bodies?\",\"options\":[],\"answer\":\"Fullmetal Alchemist\",\"aliases\":[\"fullmetal alchemist\",\"fma\",\"fullmetal alchemist brotherhood\",\"fmab\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":13,\"type\":\"multiple_choice\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"What is Zoro's dream in One Piece?\",\"options\":[\"A) Find the One Piece\",\"B) Become the greatest swordsman\",\"C) Become a Marine Admiral\",\"D) Find the All Blue\"],\"answer\":\"B\",\"aliases\":[\"greatest swordsman\",\"b\",\"world's greatest swordsman\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":14,\"type\":\"guess_the_character\",\"difficulty\":\"medium\",\"category\":\"characters\",\"question\":\"Which character in Demon Slayer uses Water Breathing?\",\"options\":[],\"answer\":\"Tanjiro\",\"aliases\":[\"tanjiro\",\"tanjiro kamado\",\"kamado tanjiro\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":15,\"type\":\"true_or_false\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"True or False: In My Hero Academia, All Might's real name is Toshinori Yagi.\",\"options\":[\"True\",\"False\"],\"answer\":\"True\",\"aliases\":[\"true\",\"t\",\"yes\"],\"image\":null,\"audio\":null,\"timeLimit\":10},{\"id\":16,\"type\":\"multiple_choice\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"Which Stand does Jotaro Kujo use in JoJo's Bizarre Adventure?\",\"options\":[\"A) The World\",\"B) Star Platinum\",\"C) Crazy Diamond\",\"D) Gold Experience\"],\"answer\":\"B\",\"aliases\":[\"star platinum\",\"b\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":17,\"type\":\"guess_the_anime\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"Which anime features a genius detective named 'L' fighting against a killer named 'Kira'?\",\"options\":[],\"answer\":\"Death Note\",\"aliases\":[\"death note\",\"deathnote\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":18,\"type\":\"multiple_choice\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"What is the name of Gon's father in Hunter x Hunter?\",\"options\":[\"A) Ging Freecss\",\"B) Kite\",\"C) Hisoka\",\"D) Leorio\"],\"answer\":\"A\",\"aliases\":[\"ging\",\"ging freecss\",\"a\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":19,\"type\":\"guess_the_character\",\"difficulty\":\"medium\",\"category\":\"characters\",\"question\":\"Who is the strongest hero in One Punch Man?\",\"options\":[],\"answer\":\"Saitama\",\"aliases\":[\"saitama\",\"one punch man\",\"caped baldy\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":20,\"type\":\"true_or_false\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"True or False: Vegeta is the prince of all Saiyans.\",\"options\":[\"True\",\"False\"],\"answer\":\"True\",\"aliases\":[\"true\",\"t\",\"yes\"],\"image\":null,\"audio\":null,\"timeLimit\":10},{\"id\":21,\"type\":\"multiple_choice\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"In which anime does the main character have a notebook that kills people?\",\"options\":[\"A) Code Geass\",\"B) Death Note\",\"C) Parasyte\",\"D) Another\"],\"answer\":\"B\",\"aliases\":[\"death note\",\"b\",\"deathnote\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":22,\"type\":\"guess_the_anime\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"In which anime do humans fight giant humanoid creatures called Titans?\",\"options\":[],\"answer\":\"Attack on Titan\",\"aliases\":[\"attack on titan\",\"aot\",\"shingeki no kyojin\",\"snk\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":23,\"type\":\"multiple_choice\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"What is the name of Light Yagami's Shinigami in Death Note?\",\"options\":[\"A) Rem\",\"B) Ryuk\",\"C) Misa\",\"D) Near\"],\"answer\":\"B\",\"aliases\":[\"ryuk\",\"b\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":24,\"type\":\"guess_the_character\",\"difficulty\":\"medium\",\"category\":\"characters\",\"question\":\"Who is the main antagonist of Dragon Ball Z's Frieza Saga?\",\"options\":[],\"answer\":\"Frieza\",\"aliases\":[\"frieza\",\"freeza\",\"freezer\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":25,\"type\":\"true_or_false\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"True or False: Sailor Moon's real name is Usagi Tsukino.\",\"options\":[\"True\",\"False\"],\"answer\":\"True\",\"aliases\":[\"true\",\"t\",\"yes\"],\"image\":null,\"audio\":null,\"timeLimit\":10},{\"id\":26,\"type\":\"multiple_choice\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"What is the name of the organization that Itachi Uchiha belongs to?\",\"options\":[\"A) Anbu\",\"B) Akatsuki\",\"C) Sound Four\",\"D) Seven Swordsmen\"],\"answer\":\"B\",\"aliases\":[\"akatsuki\",\"b\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":27,\"type\":\"guess_the_anime\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"Which anime features a virtual reality MMORPG where players are trapped and death in-game means death in real life?\",\"options\":[],\"answer\":\"Sword Art Online\",\"aliases\":[\"sword art online\",\"sao\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":28,\"type\":\"multiple_choice\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"What is the Bankai of Ichigo Kurosaki in Bleach?\",\"options\":[\"A) Senbonzakura Kageyoshi\",\"B) Tensa Zangetsu\",\"C) Ryujin Jakka\",\"D) Hyorinmaru\"],\"answer\":\"B\",\"aliases\":[\"tensa zangetsu\",\"b\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":29,\"type\":\"guess_the_character\",\"difficulty\":\"hard\",\"category\":\"characters\",\"question\":\"Who is the captain of the 10th Division in Bleach?\",\"options\":[],\"answer\":\"Toshiro Hitsugaya\",\"aliases\":[\"toshiro\",\"hitsugaya\",\"toshiro hitsugaya\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":30,\"type\":\"true_or_false\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"True or False: In Code Geass, Lelouch's Geass power allows him to control time.\",\"options\":[\"True\",\"False\"],\"answer\":\"False\",\"aliases\":[\"false\",\"f\",\"no\"],\"image\":null,\"audio\":null,\"timeLimit\":10},{\"id\":31,\"type\":\"multiple_choice\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"What is the name of the demon inside Naruto?\",\"options\":[\"A) Shukaku\",\"B) Matatabi\",\"C) Kurama\",\"D) Gyuki\"],\"answer\":\"C\",\"aliases\":[\"kurama\",\"nine tails\",\"nine-tails\",\"kyuubi\",\"c\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":32,\"type\":\"guess_the_anime\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"Which anime features a boy named Edward who lost his arm and leg in a failed transmutation?\",\"options\":[],\"answer\":\"Fullmetal Alchemist\",\"aliases\":[\"fullmetal alchemist\",\"fma\",\"fullmetal alchemist brotherhood\",\"fmab\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":33,\"type\":\"multiple_choice\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"In Hunter x Hunter, what is Killua's family known as?\",\"options\":[\"A) Zoldyck Family\",\"B) Freecss Family\",\"C) Phantom Troupe\",\"D) Kurta Clan\"],\"answer\":\"A\",\"aliases\":[\"zoldyck\",\"zoldyck family\",\"a\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":34,\"type\":\"guess_the_character\",\"difficulty\":\"hard\",\"category\":\"characters\",\"question\":\"Who created the Homunculi in Fullmetal Alchemist: Brotherhood?\",\"options\":[],\"answer\":\"Father\",\"aliases\":[\"father\",\"the dwarf in the flask\",\"dwarf in the flask\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":35,\"type\":\"true_or_false\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"True or False: In Steins;Gate, the main character's real name is Rintaro Okabe.\",\"options\":[\"True\",\"False\"],\"answer\":\"True\",\"aliases\":[\"true\",\"t\",\"yes\"],\"image\":null,\"audio\":null,\"timeLimit\":10},{\"id\":36,\"type\":\"multiple_choice\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"What is the highest rank a Hunter can achieve in Hunter x Hunter?\",\"options\":[\"A) Single Star\",\"B) Double Star\",\"C) Triple Star\",\"D) Four Star\"],\"answer\":\"C\",\"aliases\":[\"triple star\",\"c\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":37,\"type\":\"guess_the_anime\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"Which anime features a contract between humans and Shinigami for eyes that can see anyone's name and lifespan?\",\"options\":[],\"answer\":\"Death Note\",\"aliases\":[\"death note\",\"deathnote\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":38,\"type\":\"multiple_choice\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"What is the name of Gojo's Domain Expansion in Jujutsu Kaisen?\",\"options\":[\"A) Chimera Shadow Garden\",\"B) Malevolent Shrine\",\"C) Infinite Void\",\"D) Coffin of the Iron Mountain\"],\"answer\":\"C\",\"aliases\":[\"infinite void\",\"c\",\"unlimited void\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":39,\"type\":\"guess_the_character\",\"difficulty\":\"hard\",\"category\":\"characters\",\"question\":\"Who is the leader of the Phantom Troupe in Hunter x Hunter?\",\"options\":[],\"answer\":\"Chrollo Lucilfer\",\"aliases\":[\"chrollo\",\"chrollo lucilfer\",\"danchou\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":40,\"type\":\"true_or_false\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"True or False: In Demon Slayer, Muzan Kibutsuji is the first demon ever created.\",\"options\":[\"True\",\"False\"],\"answer\":\"True\",\"aliases\":[\"true\",\"t\",\"yes\"],\"image\":null,\"audio\":null,\"timeLimit\":10},{\"id\":41,\"type\":\"multiple_choice\",\"difficulty\":\"legendary\",\"category\":\"general\",\"question\":\"What year was the first episode of Neon Genesis Evangelion aired?\",\"options\":[\"A) 1993\",\"B) 1995\",\"C) 1997\",\"D) 1999\"],\"answer\":\"B\",\"aliases\":[\"1995\",\"b\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":42,\"type\":\"guess_the_anime\",\"difficulty\":\"legendary\",\"category\":\"general\",\"question\":\"Which 1998 anime features a crew aboard the spaceship Bebop hunting bounties across the solar system?\",\"options\":[],\"answer\":\"Cowboy Bebop\",\"aliases\":[\"cowboy bebop\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":43,\"type\":\"multiple_choice\",\"difficulty\":\"legendary\",\"category\":\"general\",\"question\":\"In Berserk, what is the name of the demonic ritual that transforms a human into an Apostle?\",\"options\":[\"A) The Eclipse\",\"B) The Ceremony\",\"C) The Invocation\",\"D) The Offering\"],\"answer\":\"A\",\"aliases\":[\"eclipse\",\"the eclipse\",\"a\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":44,\"type\":\"guess_the_character\",\"difficulty\":\"legendary\",\"category\":\"characters\",\"question\":\"Who is the original creator and mangaka of One Piece?\",\"options\":[],\"answer\":\"Eiichiro Oda\",\"aliases\":[\"oda\",\"eiichiro oda\",\"eichiro oda\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":45,\"type\":\"true_or_false\",\"difficulty\":\"legendary\",\"category\":\"general\",\"question\":\"True or False: The anime 'Monster' was created by Naoki Urasawa.\",\"options\":[\"True\",\"False\"],\"answer\":\"True\",\"aliases\":[\"true\",\"t\",\"yes\"],\"image\":null,\"audio\":null,\"timeLimit\":10},{\"id\":46,\"type\":\"multiple_choice\",\"difficulty\":\"easy\",\"category\":\"general\",\"question\":\"What is the name of Ash Ketchum's first Pokémon?\",\"options\":[\"A) Charmander\",\"B) Squirtle\",\"C) Bulbasaur\",\"D) Pikachu\"],\"answer\":\"D\",\"aliases\":[\"pikachu\",\"d\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":47,\"type\":\"multiple_choice\",\"difficulty\":\"easy\",\"category\":\"general\",\"question\":\"What is the Super Saiyan transformation color in Dragon Ball Z?\",\"options\":[\"A) Blue\",\"B) Red\",\"C) Gold/Yellow\",\"D) Green\"],\"answer\":\"C\",\"aliases\":[\"gold\",\"yellow\",\"c\",\"gold/yellow\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":48,\"type\":\"guess_the_anime\",\"difficulty\":\"easy\",\"category\":\"general\",\"question\":\"Which anime features a boy with a straw hat who wants to become the Pirate King?\",\"options\":[],\"answer\":\"One Piece\",\"aliases\":[\"one piece\",\"onepiece\",\"op\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":49,\"type\":\"true_or_false\",\"difficulty\":\"easy\",\"category\":\"general\",\"question\":\"True or False: Inuyasha is half-human and half-demon.\",\"options\":[\"True\",\"False\"],\"answer\":\"True\",\"aliases\":[\"true\",\"t\",\"yes\"],\"image\":null,\"audio\":null,\"timeLimit\":10},{\"id\":50,\"type\":\"guess_the_character\",\"difficulty\":\"easy\",\"category\":\"characters\",\"question\":\"Who is the main character of My Hero Academia?\",\"options\":[],\"answer\":\"Izuku Midoriya\",\"aliases\":[\"izuku\",\"midoriya\",\"deku\",\"izuku midoriya\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":51,\"type\":\"multiple_choice\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"What is the name of the Survey Corps commander in Attack on Titan Season 1?\",\"options\":[\"A) Levi Ackerman\",\"B) Erwin Smith\",\"C) Hange Zoe\",\"D) Keith Shadis\"],\"answer\":\"B\",\"aliases\":[\"erwin\",\"erwin smith\",\"b\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":52,\"type\":\"guess_the_anime\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"Which anime involves a group called the Straw Hat Pirates?\",\"options\":[],\"answer\":\"One Piece\",\"aliases\":[\"one piece\",\"onepiece\",\"op\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":53,\"type\":\"multiple_choice\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"In Demon Slayer, what is the name of Tanjiro's sister?\",\"options\":[\"A) Kanao\",\"B) Nezuko\",\"C) Shinobu\",\"D) Mitsuri\"],\"answer\":\"B\",\"aliases\":[\"nezuko\",\"nezuko kamado\",\"b\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":54,\"type\":\"guess_the_character\",\"difficulty\":\"medium\",\"category\":\"characters\",\"question\":\"Which character has the Sharingan and is Naruto's rival?\",\"options\":[],\"answer\":\"Sasuke\",\"aliases\":[\"sasuke\",\"sasuke uchiha\",\"uchiha sasuke\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":55,\"type\":\"true_or_false\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"True or False: The anime 'Spy x Family' features a telepath named Anya.\",\"options\":[\"True\",\"False\"],\"answer\":\"True\",\"aliases\":[\"true\",\"t\",\"yes\"],\"image\":null,\"audio\":null,\"timeLimit\":10},{\"id\":56,\"type\":\"multiple_choice\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"What is the name of the school in My Hero Academia?\",\"options\":[\"A) Shiketsu High\",\"B) U.A. High School\",\"C) Ketsubutsu Academy\",\"D) Isamu Academy\"],\"answer\":\"B\",\"aliases\":[\"ua\",\"u.a.\",\"ua high\",\"b\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":57,\"type\":\"guess_the_anime\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"Which anime is set in a world where 80% of people have superpowers called 'Quirks'?\",\"options\":[],\"answer\":\"My Hero Academia\",\"aliases\":[\"my hero academia\",\"mha\",\"boku no hero academia\",\"bnha\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":58,\"type\":\"multiple_choice\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"What is Luffy's Devil Fruit power?\",\"options\":[\"A) Fire\",\"B) Rubber\",\"C) Ice\",\"D) Lightning\"],\"answer\":\"B\",\"aliases\":[\"rubber\",\"gomu gomu\",\"b\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":59,\"type\":\"guess_the_character\",\"difficulty\":\"medium\",\"category\":\"characters\",\"question\":\"Who is the main character of Jujutsu Kaisen?\",\"options\":[],\"answer\":\"Yuji Itadori\",\"aliases\":[\"yuji\",\"itadori\",\"yuji itadori\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":60,\"type\":\"true_or_false\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"True or False: In Chainsaw Man, Denji's dream is to live a normal life with a girlfriend.\",\"options\":[\"True\",\"False\"],\"answer\":\"True\",\"aliases\":[\"true\",\"t\",\"yes\"],\"image\":null,\"audio\":null,\"timeLimit\":10},{\"id\":61,\"type\":\"multiple_choice\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"In Vinland Saga, what is Thorfinn's ultimate goal?\",\"options\":[\"A) Become King\",\"B) Avenge his father\",\"C) Find Vinland\",\"D) Conquer England\"],\"answer\":\"C\",\"aliases\":[\"find vinland\",\"vinland\",\"c\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":62,\"type\":\"guess_the_anime\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"Which anime features a game called 'Greed Island' within its story?\",\"options\":[],\"answer\":\"Hunter x Hunter\",\"aliases\":[\"hunter x hunter\",\"hxh\",\"hunter hunter\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":63,\"type\":\"multiple_choice\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"What is the name of the technique Gojo Satoru uses to manipulate space?\",\"options\":[\"A) Blue\",\"B) Red\",\"C) Purple\",\"D) Infinity\"],\"answer\":\"D\",\"aliases\":[\"infinity\",\"d\",\"limitless\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":64,\"type\":\"guess_the_character\",\"difficulty\":\"hard\",\"category\":\"characters\",\"question\":\"Who is known as 'Humanity's Strongest Soldier' in Attack on Titan?\",\"options\":[],\"answer\":\"Levi Ackerman\",\"aliases\":[\"levi\",\"levi ackerman\",\"captain levi\",\"rivaille\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":65,\"type\":\"true_or_false\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"True or False: The anime 'Made in Abyss' is a lighthearted children's show.\",\"options\":[\"True\",\"False\"],\"answer\":\"False\",\"aliases\":[\"false\",\"f\",\"no\"],\"image\":null,\"audio\":null,\"timeLimit\":10},{\"id\":66,\"type\":\"multiple_choice\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"In One Piece, what type of Devil Fruit did Trafalgar Law eat?\",\"options\":[\"A) Paramecia - Ope Ope no Mi\",\"B) Logia - Yami Yami no Mi\",\"C) Zoan - Hito Hito no Mi\",\"D) Paramecia - Gura Gura no Mi\"],\"answer\":\"A\",\"aliases\":[\"ope ope\",\"ope ope no mi\",\"a\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":67,\"type\":\"guess_the_anime\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"Which anime features a time-traveling microwave called the 'Phone Microwave'?\",\"options\":[],\"answer\":\"Steins;Gate\",\"aliases\":[\"steins gate\",\"steins;gate\",\"steinsgate\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":68,\"type\":\"multiple_choice\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"What is the name of Sukuna's Domain Expansion in Jujutsu Kaisen?\",\"options\":[\"A) Infinite Void\",\"B) Chimera Shadow Garden\",\"C) Malevolent Shrine\",\"D) Horizon of the Captivating Skandha\"],\"answer\":\"C\",\"aliases\":[\"malevolent shrine\",\"c\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":69,\"type\":\"guess_the_character\",\"difficulty\":\"hard\",\"category\":\"characters\",\"question\":\"In Naruto, who possesses the Rinnegan first?\",\"options\":[],\"answer\":\"Nagato\",\"aliases\":[\"nagato\",\"pain\",\"nagato uzumaki\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":70,\"type\":\"true_or_false\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"True or False: In Mob Psycho 100, Reigen Arataka is actually a powerful psychic.\",\"options\":[\"True\",\"False\"],\"answer\":\"False\",\"aliases\":[\"false\",\"f\",\"no\"],\"image\":null,\"audio\":null,\"timeLimit\":10},{\"id\":71,\"type\":\"multiple_choice\",\"difficulty\":\"legendary\",\"category\":\"general\",\"question\":\"What is the name of the forbidden jutsu used by the 4th Hokage to seal the Nine-Tails?\",\"options\":[\"A) Edo Tensei\",\"B) Reaper Death Seal\",\"C) Infinite Tsukuyomi\",\"D) Chibaku Tensei\"],\"answer\":\"B\",\"aliases\":[\"reaper death seal\",\"shiki fujin\",\"b\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":72,\"type\":\"guess_the_anime\",\"difficulty\":\"legendary\",\"category\":\"general\",\"question\":\"Which 1988 anime film is set in Neo-Tokyo and features a character named Kaneda?\",\"options\":[],\"answer\":\"Akira\",\"aliases\":[\"akira\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":73,\"type\":\"multiple_choice\",\"difficulty\":\"legendary\",\"category\":\"general\",\"question\":\"In the original Yu Yu Hakusho, what is Yusuke Urameshi's Spirit Gun powered by?\",\"options\":[\"A) Demon Energy\",\"B) Spirit Energy (Reiki)\",\"C) Nen\",\"D) Chakra\"],\"answer\":\"B\",\"aliases\":[\"spirit energy\",\"reiki\",\"b\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":74,\"type\":\"guess_the_character\",\"difficulty\":\"legendary\",\"category\":\"characters\",\"question\":\"Who is the antagonist known as 'The White Demon' in Gintama?\",\"options\":[],\"answer\":\"Gintoki Sakata\",\"aliases\":[\"gintoki\",\"gintoki sakata\",\"sakata gintoki\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":75,\"type\":\"true_or_false\",\"difficulty\":\"legendary\",\"category\":\"general\",\"question\":\"True or False: Studio Ghibli's 'Spirited Away' won the Academy Award for Best Animated Feature in 2003.\",\"options\":[\"True\",\"False\"],\"answer\":\"True\",\"aliases\":[\"true\",\"t\",\"yes\"],\"image\":null,\"audio\":null,\"timeLimit\":10},{\"id\":76,\"type\":\"multiple_choice\",\"difficulty\":\"easy\",\"category\":\"general\",\"question\":\"In Dragon Ball, what do you need to collect to summon Shenron?\",\"options\":[\"A) 5 Dragon Balls\",\"B) 6 Dragon Balls\",\"C) 7 Dragon Balls\",\"D) 8 Dragon Balls\"],\"answer\":\"C\",\"aliases\":[\"7\",\"seven\",\"7 dragon balls\",\"c\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":77,\"type\":\"guess_the_anime\",\"difficulty\":\"easy\",\"category\":\"general\",\"question\":\"Which anime features a detective boy named Conan who was shrunk by a poison?\",\"options\":[],\"answer\":\"Detective Conan\",\"aliases\":[\"detective conan\",\"case closed\",\"conan\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":78,\"type\":\"multiple_choice\",\"difficulty\":\"easy\",\"category\":\"general\",\"question\":\"What color is Goku's iconic outfit (gi) in Dragon Ball Z?\",\"options\":[\"A) Blue\",\"B) Orange\",\"C) Red\",\"D) Green\"],\"answer\":\"B\",\"aliases\":[\"orange\",\"b\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":79,\"type\":\"true_or_false\",\"difficulty\":\"easy\",\"category\":\"general\",\"question\":\"True or False: Totoro is a character from a Studio Ghibli film.\",\"options\":[\"True\",\"False\"],\"answer\":\"True\",\"aliases\":[\"true\",\"t\",\"yes\"],\"image\":null,\"audio\":null,\"timeLimit\":10},{\"id\":80,\"type\":\"guess_the_character\",\"difficulty\":\"easy\",\"category\":\"characters\",\"question\":\"Who is the main character of Demon Slayer?\",\"options\":[],\"answer\":\"Tanjiro Kamado\",\"aliases\":[\"tanjiro\",\"tanjiro kamado\",\"kamado tanjiro\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":81,\"type\":\"multiple_choice\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"In Tokyo Ghoul, what is the name of the coffee shop where ghouls gather?\",\"options\":[\"A) Anteiku\",\"B) Re:\",\"C) Aogiri\",\"D) CCG Cafe\"],\"answer\":\"A\",\"aliases\":[\"anteiku\",\"a\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":82,\"type\":\"guess_the_anime\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"Which anime features a notebook and Shinigami called Ryuk?\",\"options\":[],\"answer\":\"Death Note\",\"aliases\":[\"death note\",\"deathnote\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":83,\"type\":\"multiple_choice\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"What breathing style does Zenitsu use in Demon Slayer?\",\"options\":[\"A) Water Breathing\",\"B) Fire Breathing\",\"C) Thunder Breathing\",\"D) Wind Breathing\"],\"answer\":\"C\",\"aliases\":[\"thunder breathing\",\"thunder\",\"c\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":84,\"type\":\"guess_the_character\",\"difficulty\":\"medium\",\"category\":\"characters\",\"question\":\"Who is known as 'The Strongest Jujutsu Sorcerer' in Jujutsu Kaisen?\",\"options\":[],\"answer\":\"Gojo Satoru\",\"aliases\":[\"gojo\",\"satoru gojo\",\"gojo satoru\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":85,\"type\":\"true_or_false\",\"difficulty\":\"medium\",\"category\":\"general\",\"question\":\"True or False: In One Piece, Sanji's dream is to find the All Blue.\",\"options\":[\"True\",\"False\"],\"answer\":\"True\",\"aliases\":[\"true\",\"t\",\"yes\"],\"image\":null,\"audio\":null,\"timeLimit\":10},{\"id\":86,\"type\":\"multiple_choice\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"In Naruto Shippuden, what is the name of Madara Uchiha's ultimate plan?\",\"options\":[\"A) Eye of the Moon Plan\",\"B) Akatsuki Plan\",\"C) Sage Mode Plan\",\"D) Rinne Rebirth Plan\"],\"answer\":\"A\",\"aliases\":[\"eye of the moon\",\"eye of the moon plan\",\"infinite tsukuyomi\",\"a\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":87,\"type\":\"guess_the_anime\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"Which anime takes place in a world of curses and features finger-eating as a plot device?\",\"options\":[],\"answer\":\"Jujutsu Kaisen\",\"aliases\":[\"jujutsu kaisen\",\"jjk\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":88,\"type\":\"multiple_choice\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"What is the name of the power system in Hunter x Hunter?\",\"options\":[\"A) Haki\",\"B) Quirk\",\"C) Nen\",\"D) Chakra\"],\"answer\":\"C\",\"aliases\":[\"nen\",\"c\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":89,\"type\":\"guess_the_character\",\"difficulty\":\"hard\",\"category\":\"characters\",\"question\":\"In Bleach, who is the captain of the 6th Division known for his cherry blossom Zanpakuto?\",\"options\":[],\"answer\":\"Byakuya Kuchiki\",\"aliases\":[\"byakuya\",\"byakuya kuchiki\",\"kuchiki byakuya\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":90,\"type\":\"true_or_false\",\"difficulty\":\"hard\",\"category\":\"general\",\"question\":\"True or False: In Tokyo Revengers, Takemichi can travel back in time exactly 12 years.\",\"options\":[\"True\",\"False\"],\"answer\":\"True\",\"aliases\":[\"true\",\"t\",\"yes\"],\"image\":null,\"audio\":null,\"timeLimit\":10},{\"id\":91,\"type\":\"multiple_choice\",\"difficulty\":\"legendary\",\"category\":\"general\",\"question\":\"Which studio animated the original 1997 Berserk anime?\",\"options\":[\"A) Madhouse\",\"B) OLM\",\"C) GEMBA\",\"D) Studio Ghibli\"],\"answer\":\"B\",\"aliases\":[\"olm\",\"b\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":92,\"type\":\"guess_the_anime\",\"difficulty\":\"legendary\",\"category\":\"general\",\"question\":\"Which 2006 anime features a mecha pilot with a drill that can pierce the heavens?\",\"options\":[],\"answer\":\"Gurren Lagann\",\"aliases\":[\"gurren lagann\",\"tengen toppa gurren lagann\",\"ttgl\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":93,\"type\":\"multiple_choice\",\"difficulty\":\"legendary\",\"category\":\"general\",\"question\":\"In Legend of the Galactic Heroes, who leads the Free Planets Alliance?\",\"options\":[\"A) Reinhard von Lohengramm\",\"B) Yang Wen-li\",\"C) Oskar von Reuenthal\",\"D) Wolfgang Mittermeyer\"],\"answer\":\"B\",\"aliases\":[\"yang wen-li\",\"yang\",\"b\"],\"image\":null,\"audio\":null,\"timeLimit\":20},{\"id\":94,\"type\":\"guess_the_character\",\"difficulty\":\"legendary\",\"category\":\"characters\",\"question\":\"In Serial Experiments Lain, what is the name of the interconnected network similar to the internet?\",\"options\":[],\"answer\":\"The Wired\",\"aliases\":[\"the wired\",\"wired\"],\"image\":null,\"audio\":null,\"timeLimit\":15},{\"id\":95,\"type\":\"true_or_false\",\"difficulty\":\"legendary\",\"category\":\"general\",\"question\":\"True or False: The anime 'Ghost in the Shell: Stand Alone Complex' was inspired by the manga by Masamune Shirow.\",\"options\":[\"True\",\"False\"],\"answer\":\"True\",\"aliases\":[\"true\",\"t\",\"yes\"],\"image\":null,\"audio\":null,\"timeLimit\":10},{\"id\":96,\"type\":\"boss_round\",\"difficulty\":\"legendary\",\"category\":\"boss\",\"question\":\"🔥 BOSS ROUND 🔥 Name ALL three legendary Sannin from Naruto!\",\"options\":[],\"answer\":\"Jiraiya, Tsunade, Orochimaru\",\"aliases\":[\"jiraiya tsunade orochimaru\",\"tsunade jiraiya orochimaru\",\"orochimaru jiraiya tsunade\",\"all three sannin\"],\"image\":null,\"audio\":null,\"timeLimit\":30},{\"id\":97,\"type\":\"boss_round\",\"difficulty\":\"legendary\",\"category\":\"boss\",\"question\":\"🔥 BOSS ROUND 🔥 What is the real name of the 'Going Merry' replacement ship in One Piece?\",\"options\":[],\"answer\":\"Thousand Sunny\",\"aliases\":[\"thousand sunny\",\"sunny\",\"the thousand sunny\"],\"image\":null,\"audio\":null,\"timeLimit\":30},{\"id\":98,\"type\":\"boss_round\",\"difficulty\":\"legendary\",\"category\":\"boss\",\"question\":\"🔥 BOSS ROUND 🔥 In Evangelion, what is the true purpose of the Human Instrumentality Project?\",\"options\":[\"A) Destroy all Angels\",\"B) Merge all human souls into one\",\"C) Create a new Earth\",\"D) Build the ultimate Eva\"],\"answer\":\"B\",\"aliases\":[\"merge all human souls\",\"merge humanity\",\"b\"],\"image\":null,\"audio\":null,\"timeLimit\":30},{\"id\":99,\"type\":\"boss_round\",\"difficulty\":\"legendary\",\"category\":\"boss\",\"question\":\"🔥 BOSS ROUND 🔥 What is the name of the cursed technique Toji Fushiguro's son (Megumi) uses in JJK?\",\"options\":[],\"answer\":\"Ten Shadows Technique\",\"aliases\":[\"ten shadows\",\"ten shadows technique\",\"10 shadows\"],\"image\":null,\"audio\":null,\"timeLimit\":30},{\"id\":100,\"type\":\"boss_round\",\"difficulty\":\"legendary\",\"category\":\"boss\",\"question\":\"🔥 FINAL BOSS 🔥 In One Piece, what is the name of the ancient weapons? Name at least TWO!\",\"options\":[],\"answer\":\"Pluton, Poseidon, Uranus\",\"aliases\":[\"pluton poseidon\",\"pluton uranus\",\"poseidon uranus\",\"pluton poseidon uranus\",\"all three\"],\"image\":null,\"audio\":null,\"timeLimit\":30}]");
}),
"[project]/src/lib/game-engine.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GameEngine",
    ()=>GameEngine,
    "getGameEngine",
    ()=>getGameEngine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$questions$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/questions.json.[json].cjs [app-route] (ecmascript)");
;
const DIFFICULTY_POINTS = {
    easy: 10,
    medium: 20,
    hard: 30,
    legendary: 50
};
const STREAK_BONUSES = {
    1: 5,
    3: 15,
    5: 30,
    10: 100
};
const BOSS_POINTS = 100;
const TITLES = [
    {
        minPoints: 0,
        title: "Anime Rookie"
    },
    {
        minPoints: 100,
        title: "Otaku Apprentice"
    },
    {
        minPoints: 300,
        title: "Otaku"
    },
    {
        minPoints: 500,
        title: "Anime Expert"
    },
    {
        minPoints: 1000,
        title: "Anime Sage"
    },
    {
        minPoints: 2000,
        title: "Legendary Weeb"
    },
    {
        minPoints: 5000,
        title: "Anime God"
    }
];
const TEAMS = [
    "Team Shonen",
    "Team Seinen",
    "Team Isekai",
    "Team Romance"
];
class GameEngine {
    questions = [];
    shuffledQuestions = [];
    players = new Map();
    antiCheat = new Map();
    answeredThisQuestion = new Set();
    questionTimer = null;
    state;
    onStateChange = null;
    onEvent = null;
    constructor(){
        this.questions = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$questions$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"];
        this.state = this.getInitialState();
    }
    getInitialState() {
        return {
            status: "waiting",
            sessionId: null,
            currentQuestion: null,
            currentQuestionIndex: -1,
            totalQuestions: 0,
            questionStartTime: null,
            timeRemaining: 0,
            leaderboard: [],
            answeredPlayers: new Set(),
            correctAnswer: null,
            winner: null,
            winnerDisplayName: null,
            bossRound: false,
            difficulty: "mixed",
            season: null,
            questionsAsked: 0,
            totalPlayers: 0,
            stats: {
                totalPlayers: 0,
                questionsAnswered: 0,
                totalAnswers: 0,
                correctAnswers: 0,
                fastestAnswer: null,
                fastestPlayer: null,
                mostActivePlayer: null,
                sessionDuration: 0,
                startTime: null
            }
        };
    }
    setOnStateChange(cb) {
        this.onStateChange = cb;
    }
    setOnEvent(cb) {
        this.onEvent = cb;
    }
    emitState() {
        if (this.onStateChange) {
            this.onStateChange(this.getPublicState());
        }
    }
    emitEvent(type, data) {
        if (this.onEvent) {
            this.onEvent({
                type,
                data
            });
        }
    }
    getPublicState() {
        return {
            ...this.state,
            leaderboard: this.getLeaderboard(),
            totalPlayers: this.players.size,
            answeredPlayers: new Set(this.answeredThisQuestion),
            stats: {
                ...this.state.stats,
                totalPlayers: this.players.size,
                sessionDuration: this.state.stats.startTime ? Date.now() - this.state.stats.startTime : 0
            }
        };
    }
    startGame(options) {
        const { questionCount = 20, difficulty = "mixed", season = null, sessionId } = options;
        let filtered = [
            ...this.questions
        ];
        if (difficulty !== "mixed") {
            filtered = filtered.filter((q)=>q.difficulty === difficulty);
        }
        // Shuffle
        for(let i = filtered.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [filtered[i], filtered[j]] = [
                filtered[j],
                filtered[i]
            ];
        }
        this.shuffledQuestions = filtered.slice(0, Math.min(questionCount, filtered.length));
        this.players.clear();
        this.antiCheat.clear();
        this.state = {
            ...this.getInitialState(),
            status: "active",
            sessionId,
            totalQuestions: this.shuffledQuestions.length,
            difficulty,
            season,
            stats: {
                ...this.getInitialState().stats,
                startTime: Date.now()
            }
        };
        this.emitState();
        this.emitEvent("game_start", {
            totalQuestions: this.shuffledQuestions.length
        });
        this.emitEvent("mascot", this.getMascotMessage("info", "Welcome to Anime Wiz Live Arena! 🎮 Get ready for some anime trivia!"));
    }
    nextQuestion() {
        if (this.state.status === "completed") return;
        const nextIndex = this.state.currentQuestionIndex + 1;
        if (nextIndex >= this.shuffledQuestions.length) {
            this.endGame();
            return;
        }
        const question = this.shuffledQuestions[nextIndex];
        const isBoss = question.type === "boss_round" || nextIndex > 0 && nextIndex % 10 === 0;
        this.answeredThisQuestion.clear();
        this.state = {
            ...this.state,
            status: "question",
            currentQuestion: question,
            currentQuestionIndex: nextIndex,
            questionStartTime: Date.now(),
            timeRemaining: question.timeLimit,
            correctAnswer: null,
            winner: null,
            winnerDisplayName: null,
            bossRound: isBoss,
            questionsAsked: nextIndex + 1
        };
        this.emitState();
        if (isBoss) {
            this.emitEvent("boss_round", {
                question: question.question
            });
            this.emitEvent("mascot", this.getMascotMessage("boss", "⚔️ BOSS ROUND! This one is worth BIG points! ⚔️"));
            this.emitEvent("sound", "boss_round");
        } else {
            this.emitEvent("new_question", {
                questionNumber: nextIndex + 1,
                total: this.shuffledQuestions.length,
                difficulty: question.difficulty,
                type: question.type
            });
        }
        // Start timer
        this.startQuestionTimer(question.timeLimit);
    }
    startQuestionTimer(seconds) {
        if (this.questionTimer) clearTimeout(this.questionTimer);
        let remaining = seconds;
        const tick = ()=>{
            remaining--;
            this.state.timeRemaining = remaining;
            this.emitState();
            if (remaining <= 0) {
                this.timeUp();
            } else {
                this.questionTimer = setTimeout(tick, 1000);
            }
        };
        this.questionTimer = setTimeout(tick, 1000);
    }
    timeUp() {
        if (this.state.status !== "question") return;
        this.state.status = "revealing";
        this.state.correctAnswer = this.state.currentQuestion?.answer ?? null;
        this.state.stats.questionsAnswered++;
        this.emitState();
        this.emitEvent("time_up", {
            answer: this.state.correctAnswer
        });
        this.emitEvent("mascot", this.getMascotMessage("info", `⏰ Time's up! The answer was: ${this.state.correctAnswer}`));
    }
    processAnswer(username, displayName, message) {
        if (this.state.status !== "question" || !this.state.currentQuestion) return false;
        // Anti-cheat
        if (!this.passAntiCheat(username)) return false;
        // Already answered
        if (this.answeredThisQuestion.has(username)) return false;
        const question = this.state.currentQuestion;
        const normalizedMsg = message.toLowerCase().trim();
        // Check if correct
        const isCorrect = question.aliases.some((alias)=>normalizedMsg === alias.toLowerCase());
        // Register player if new
        if (!this.players.has(username)) {
            this.players.set(username, {
                tiktokUsername: username,
                displayName,
                points: 0,
                streak: 0,
                bestStreak: 0,
                correctAnswers: 0,
                totalAnswers: 0,
                fastestAnswer: null,
                team: TEAMS[Math.floor(Math.random() * TEAMS.length)],
                powerUps: {
                    double: 1,
                    shield: 1,
                    steal: 1
                },
                rank: 0,
                title: "Anime Rookie",
                lastAnswerTime: 0
            });
        }
        const player = this.players.get(username);
        this.answeredThisQuestion.add(username);
        player.totalAnswers++;
        this.state.stats.totalAnswers++;
        if (isCorrect) {
            const answerTime = this.state.questionStartTime ? (Date.now() - this.state.questionStartTime) / 1000 : 0;
            // Calculate points
            let points = this.state.bossRound ? BOSS_POINTS : DIFFICULTY_POINTS[question.difficulty] || 10;
            // Check for double power-up
            if (player.powerUps.double && player.powerUps.double > 0) {
            // Don't auto-use, only use if they typed !double before
            }
            // Streak
            player.streak++;
            if (player.streak > player.bestStreak) {
                player.bestStreak = player.streak;
            }
            // Streak bonus
            const streakBonus = STREAK_BONUSES[player.streak] || 0;
            points += streakBonus;
            player.points += points;
            player.correctAnswers++;
            if (!player.fastestAnswer || answerTime < player.fastestAnswer) {
                player.fastestAnswer = answerTime;
            }
            player.lastAnswerTime = answerTime;
            // Update title
            player.title = this.getTitle(player.points);
            // Stats
            this.state.stats.correctAnswers++;
            if (!this.state.stats.fastestAnswer || answerTime < this.state.stats.fastestAnswer) {
                this.state.stats.fastestAnswer = answerTime;
                this.state.stats.fastestPlayer = displayName;
            }
            // First correct answer wins - reveal
            if (!this.state.winner) {
                this.state.winner = username;
                this.state.winnerDisplayName = displayName;
                this.state.correctAnswer = question.answer;
                this.state.status = "revealing";
                this.state.stats.questionsAnswered++;
                if (this.questionTimer) {
                    clearTimeout(this.questionTimer);
                    this.questionTimer = null;
                }
                this.emitEvent("correct_answer", {
                    username,
                    displayName,
                    points,
                    streak: player.streak,
                    answerTime: answerTime.toFixed(1)
                });
                this.emitEvent("sound", "correct");
                // Streak messages
                if (player.streak >= 10) {
                    this.emitEvent("mascot", this.getMascotMessage("streak", `🔥🔥🔥 ${displayName} is on a ${player.streak}-question LEGENDARY STREAK! +${streakBonus} bonus!`));
                    this.emitEvent("sound", "streak");
                } else if (player.streak >= 5) {
                    this.emitEvent("mascot", this.getMascotMessage("streak", `🔥 ${displayName} is on a ${player.streak}-question streak! +${streakBonus} bonus!`));
                    this.emitEvent("sound", "streak");
                } else if (player.streak >= 3) {
                    this.emitEvent("mascot", this.getMascotMessage("streak", `⚡ ${displayName} has a ${player.streak}-question streak! +${streakBonus} bonus!`));
                }
                // Check for new leader
                const leaderboard = this.getLeaderboard();
                if (leaderboard.length > 0 && leaderboard[0].tiktokUsername === username && this.state.questionsAsked > 1) {
                    this.emitEvent("mascot", this.getMascotMessage("correct", `👑 ${displayName} takes the LEAD with ${player.points} points!`));
                    this.emitEvent("sound", "new_leader");
                } else {
                    this.emitEvent("mascot", this.getMascotMessage("correct", `✅ ${displayName} got it right! +${points} points! (${answerTime.toFixed(1)}s)`));
                }
            }
            this.emitState();
            return true;
        } else {
            // Wrong answer - break streak
            player.streak = 0;
        }
        return false;
    }
    processPowerUp(username, powerUp) {
        const player = this.players.get(username);
        if (!player) return false;
        const count = player.powerUps[powerUp] || 0;
        if (count <= 0) return false;
        switch(powerUp){
            case "double":
                // Next correct answer worth double
                player.powerUps.double = (player.powerUps.double || 1) - 1;
                this.emitEvent("power_up", {
                    username,
                    displayName: player.displayName,
                    type: "double"
                });
                return true;
            case "shield":
                player.powerUps.shield = (player.powerUps.shield || 1) - 1;
                this.emitEvent("power_up", {
                    username,
                    displayName: player.displayName,
                    type: "shield"
                });
                return true;
            case "steal":
                {
                    player.powerUps.steal = (player.powerUps.steal || 1) - 1;
                    // Steal random points from random player
                    const otherPlayers = Array.from(this.players.values()).filter((p)=>p.tiktokUsername !== username && p.points > 0);
                    if (otherPlayers.length > 0) {
                        const victim = otherPlayers[Math.floor(Math.random() * otherPlayers.length)];
                        const stolen = Math.min(10, victim.points);
                        victim.points -= stolen;
                        player.points += stolen;
                        this.emitEvent("power_up", {
                            username,
                            displayName: player.displayName,
                            type: "steal",
                            victim: victim.displayName,
                            amount: stolen
                        });
                    }
                    return true;
                }
        }
        return false;
    }
    pauseGame() {
        if (this.state.status === "question") {
            if (this.questionTimer) {
                clearTimeout(this.questionTimer);
                this.questionTimer = null;
            }
            this.state.status = "paused";
            this.emitState();
        }
    }
    resumeGame() {
        if (this.state.status === "paused" && this.state.currentQuestion) {
            this.state.status = "question";
            this.startQuestionTimer(this.state.timeRemaining);
            this.emitState();
        }
    }
    skipQuestion() {
        if (this.questionTimer) {
            clearTimeout(this.questionTimer);
            this.questionTimer = null;
        }
        this.timeUp();
    }
    addPoints(username, points) {
        const player = this.players.get(username);
        if (player) {
            player.points += points;
            player.title = this.getTitle(player.points);
            this.emitState();
        }
    }
    banPlayer(username) {
        this.players.delete(username);
        this.emitState();
    }
    resetGame() {
        if (this.questionTimer) {
            clearTimeout(this.questionTimer);
            this.questionTimer = null;
        }
        this.players.clear();
        this.antiCheat.clear();
        this.answeredThisQuestion.clear();
        this.state = this.getInitialState();
        this.emitState();
    }
    endGame() {
        if (this.questionTimer) {
            clearTimeout(this.questionTimer);
            this.questionTimer = null;
        }
        this.state.status = "completed";
        this.emitState();
        const top3 = this.getLeaderboard().slice(0, 3);
        this.emitEvent("game_complete", {
            winners: top3
        });
        this.emitEvent("sound", "game_complete");
        if (top3.length >= 1) {
            this.emitEvent("mascot", this.getMascotMessage("winner", `🏆 CHAMPION: ${top3[0].displayName} with ${top3[0].points} points!`));
        }
    }
    getLeaderboard() {
        const players = Array.from(this.players.values());
        players.sort((a, b)=>b.points - a.points || (a.fastestAnswer ?? 999) - (b.fastestAnswer ?? 999));
        return players.map((p, i)=>({
                ...p,
                rank: i + 1
            }));
    }
    getWinners() {
        return this.getLeaderboard().slice(0, 3);
    }
    getFullStats() {
        const players = Array.from(this.players.values());
        let mostActive = null;
        for (const p of players){
            if (!mostActive || p.totalAnswers > mostActive.totalAnswers) {
                mostActive = p;
            }
        }
        return {
            ...this.state.stats,
            totalPlayers: players.length,
            mostActivePlayer: mostActive?.displayName ?? null,
            sessionDuration: this.state.stats.startTime ? Date.now() - this.state.stats.startTime : 0
        };
    }
    getExportData() {
        return {
            session: {
                id: this.state.sessionId,
                status: this.state.status,
                totalQuestions: this.state.totalQuestions,
                questionsAsked: this.state.questionsAsked,
                difficulty: this.state.difficulty
            },
            leaderboard: this.getLeaderboard(),
            stats: this.getFullStats()
        };
    }
    passAntiCheat(username) {
        const now = Date.now();
        let record = this.antiCheat.get(username);
        if (!record) {
            record = {
                lastMessageTime: 0,
                messageCount: 0,
                cooldownUntil: 0,
                warnings: 0
            };
            this.antiCheat.set(username, record);
        }
        // Cooldown check
        if (now < record.cooldownUntil) return false;
        // Rate limiting - max 3 messages per 2 seconds
        if (now - record.lastMessageTime < 2000) {
            record.messageCount++;
            if (record.messageCount > 3) {
                record.warnings++;
                record.cooldownUntil = now + 5000; // 5 second cooldown
                return false;
            }
        } else {
            record.messageCount = 1;
        }
        record.lastMessageTime = now;
        return true;
    }
    getTitle(points) {
        let title = "Anime Rookie";
        for (const t of TITLES){
            if (points >= t.minPoints) {
                title = t.title;
            }
        }
        return title;
    }
    getMascotMessage(type, text) {
        const emojis = {
            question: "❓",
            correct: "✅",
            streak: "🔥",
            boss: "⚔️",
            winner: "🏆",
            motivational: "💪",
            info: "📢"
        };
        return {
            text,
            emoji: emojis[type] || "🎮",
            type
        };
    }
}
// Singleton
let gameEngine = null;
function getGameEngine() {
    if (!gameEngine) {
        gameEngine = new GameEngine();
    }
    return gameEngine;
}
}),
"[project]/src/app/api/game/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2d$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/game-engine.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
async function GET() {
    const engine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2d$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getGameEngine"])();
    const state = engine.getPublicState();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        status: state.status,
        currentQuestion: state.currentQuestion ? {
            id: state.currentQuestion.id,
            type: state.currentQuestion.type,
            difficulty: state.currentQuestion.difficulty,
            question: state.currentQuestion.question,
            options: state.currentQuestion.options,
            timeLimit: state.currentQuestion.timeLimit,
            image: state.currentQuestion.image
        } : null,
        currentQuestionIndex: state.currentQuestionIndex,
        totalQuestions: state.totalQuestions,
        timeRemaining: state.timeRemaining,
        leaderboard: state.leaderboard.slice(0, 10).map((p)=>({
                rank: p.rank,
                username: p.tiktokUsername,
                displayName: p.displayName,
                points: p.points,
                streak: p.streak,
                team: p.team,
                title: p.title
            })),
        correctAnswer: state.correctAnswer,
        winner: state.winner,
        winnerDisplayName: state.winnerDisplayName,
        bossRound: state.bossRound,
        questionsAsked: state.questionsAsked,
        totalPlayers: state.totalPlayers,
        stats: state.stats,
        sessionId: state.sessionId
    });
}
async function POST(req) {
    const body = await req.json();
    const { action } = body;
    const engine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$game$2d$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getGameEngine"])();
    switch(action){
        case "start":
            {
                const { questionCount = 20, difficulty = "mixed", season = null } = body;
                // Create session in DB
                const [session] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["gameSessions"]).values({
                    status: "active",
                    totalQuestions: questionCount,
                    difficulty,
                    season,
                    startedAt: new Date()
                }).returning();
                engine.startGame({
                    questionCount,
                    difficulty,
                    season,
                    sessionId: session.id
                });
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    sessionId: session.id
                });
            }
        case "next_question":
            {
                engine.nextQuestion();
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true
                });
            }
        case "pause":
            {
                engine.pauseGame();
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true
                });
            }
        case "resume":
            {
                engine.resumeGame();
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true
                });
            }
        case "skip":
            {
                engine.skipQuestion();
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true
                });
            }
        case "add_points":
            {
                const { username, points } = body;
                engine.addPoints(username, points);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true
                });
            }
        case "ban":
            {
                const { username } = body;
                engine.banPlayer(username);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true
                });
            }
        case "reset":
            {
                engine.resetGame();
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true
                });
            }
        case "end":
            {
                engine.endGame();
                // Save to DB
                const state = engine.getPublicState();
                if (state.sessionId) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["gameSessions"]).set({
                        status: "completed",
                        questionsAsked: state.questionsAsked,
                        totalPlayers: state.totalPlayers,
                        endedAt: new Date()
                    }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["gameSessions"].id, state.sessionId));
                    // Save player scores
                    const leaderboard = engine.getLeaderboard();
                    for (const player of leaderboard){
                        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sessionScores"]).values({
                            sessionId: state.sessionId,
                            tiktokUsername: player.tiktokUsername,
                            displayName: player.displayName,
                            points: player.points,
                            streak: player.streak,
                            bestStreak: player.bestStreak,
                            correctAnswers: player.correctAnswers,
                            totalAnswers: player.totalAnswers,
                            fastestAnswer: player.fastestAnswer,
                            team: player.team
                        });
                        // Upsert user totals
                        const existingUsers = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].tiktokUsername, player.tiktokUsername));
                        if (existingUsers.length > 0) {
                            const existing = existingUsers[0];
                            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"]).set({
                                totalPoints: existing.totalPoints + player.points,
                                gamesPlayed: existing.gamesPlayed + 1,
                                questionsAnswered: existing.questionsAnswered + player.totalAnswers,
                                correctAnswers: existing.correctAnswers + player.correctAnswers,
                                bestStreak: Math.max(existing.bestStreak, player.bestStreak),
                                updatedAt: new Date()
                            }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].tiktokUsername, player.tiktokUsername));
                        } else {
                            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"]).values({
                                tiktokUsername: player.tiktokUsername,
                                displayName: player.displayName,
                                totalPoints: player.points,
                                gamesPlayed: 1,
                                questionsAnswered: player.totalAnswers,
                                correctAnswers: player.correctAnswers,
                                bestStreak: player.bestStreak
                            });
                        }
                    }
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    winners: engine.getWinners()
                });
            }
        default:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Unknown action"
            }, {
                status: 400
            });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__07~0-0i._.js.map