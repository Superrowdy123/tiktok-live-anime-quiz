import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  real,
} from "drizzle-orm/pg-core";

// ─── Users / Players ───
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  tiktokUsername: text("tiktok_username").notNull().unique(),
  displayName: text("display_name").notNull(),
  totalPoints: integer("total_points").notNull().default(0),
  gamesPlayed: integer("games_played").notNull().default(0),
  questionsAnswered: integer("questions_answered").notNull().default(0),
  correctAnswers: integer("correct_answers").notNull().default(0),
  bestStreak: integer("best_streak").notNull().default(0),
  level: integer("level").notNull().default(1),
  xp: integer("xp").notNull().default(0),
  title: text("title").notNull().default("Anime Rookie"),
  coins: integer("coins").notNull().default(0),
  achievements: jsonb("achievements").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Game Sessions ───
export const gameSessions = pgTable("game_sessions", {
  id: serial("id").primaryKey(),
  status: text("status").notNull().default("waiting"), // waiting, active, paused, completed
  totalQuestions: integer("total_questions").notNull().default(0),
  questionsAsked: integer("questions_asked").notNull().default(0),
  totalPlayers: integer("total_players").notNull().default(0),
  season: text("season"), // spring, summer, fall, winter
  difficulty: text("difficulty").notNull().default("mixed"),
  startedAt: timestamp("started_at"),
  endedAt: timestamp("ended_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Session Scores (per-session leaderboard) ───
export const sessionScores = pgTable("session_scores", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull(),
  tiktokUsername: text("tiktok_username").notNull(),
  displayName: text("display_name").notNull(),
  points: integer("points").notNull().default(0),
  streak: integer("streak").notNull().default(0),
  bestStreak: integer("best_streak").notNull().default(0),
  correctAnswers: integer("correct_answers").notNull().default(0),
  totalAnswers: integer("total_answers").notNull().default(0),
  fastestAnswer: real("fastest_answer"), // seconds
  team: text("team"), // shonen, seinen, isekai, romance
  powerUps: jsonb("power_ups").$type<Record<string, number>>().default({}),
});

// ─── Answer Log ───
export const answerLog = pgTable("answer_log", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull(),
  questionIndex: integer("question_index").notNull(),
  tiktokUsername: text("tiktok_username").notNull(),
  answer: text("answer").notNull(),
  correct: boolean("correct").notNull().default(false),
  pointsAwarded: integer("points_awarded").notNull().default(0),
  answerTime: real("answer_time"), // seconds from question shown
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Statistics ───
export const statistics = pgTable("statistics", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
