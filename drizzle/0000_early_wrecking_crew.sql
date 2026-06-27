CREATE TABLE "answer_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer NOT NULL,
	"question_index" integer NOT NULL,
	"tiktok_username" text NOT NULL,
	"answer" text NOT NULL,
	"correct" boolean DEFAULT false NOT NULL,
	"points_awarded" integer DEFAULT 0 NOT NULL,
	"answer_time" real,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "game_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" text DEFAULT 'waiting' NOT NULL,
	"total_questions" integer DEFAULT 0 NOT NULL,
	"questions_asked" integer DEFAULT 0 NOT NULL,
	"total_players" integer DEFAULT 0 NOT NULL,
	"season" text,
	"difficulty" text DEFAULT 'mixed' NOT NULL,
	"started_at" timestamp,
	"ended_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"correct_answer" text NOT NULL,
	"choices" text[] NOT NULL,
	"explanation" text NOT NULL,
	"category" text NOT NULL,
	"anime" text NOT NULL,
	"difficulty" text NOT NULL,
	"tags" text[] DEFAULT '{}',
	"points" integer DEFAULT 10 NOT NULL,
	"image_url" text,
	"hint" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session_scores" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer NOT NULL,
	"tiktok_username" text NOT NULL,
	"display_name" text NOT NULL,
	"points" integer DEFAULT 0 NOT NULL,
	"streak" integer DEFAULT 0 NOT NULL,
	"best_streak" integer DEFAULT 0 NOT NULL,
	"correct_answers" integer DEFAULT 0 NOT NULL,
	"total_answers" integer DEFAULT 0 NOT NULL,
	"fastest_answer" real,
	"team" text,
	"power_ups" jsonb DEFAULT '{}'::jsonb
);
--> statement-breakpoint
CREATE TABLE "statistics" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"value" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "statistics_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"tiktok_username" text NOT NULL,
	"display_name" text NOT NULL,
	"total_points" integer DEFAULT 0 NOT NULL,
	"games_played" integer DEFAULT 0 NOT NULL,
	"questions_answered" integer DEFAULT 0 NOT NULL,
	"correct_answers" integer DEFAULT 0 NOT NULL,
	"best_streak" integer DEFAULT 0 NOT NULL,
	"level" integer DEFAULT 1 NOT NULL,
	"xp" integer DEFAULT 0 NOT NULL,
	"title" text DEFAULT 'Anime Rookie' NOT NULL,
	"coins" integer DEFAULT 0 NOT NULL,
	"achievements" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_tiktok_username_unique" UNIQUE("tiktok_username")
);
