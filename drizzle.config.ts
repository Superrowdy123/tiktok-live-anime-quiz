import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "postgresql://postgres:Hashimsql2018*@127.0.0.1:5432/app_db",
  },
} satisfies Config;
