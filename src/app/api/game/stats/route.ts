import { NextResponse } from "next/server";
import { getGameEngine } from "@/lib/game-engine";

export async function GET() {
  try {
    const engine = getGameEngine();
    const liveStats = engine.getFullStats();

    // Try to get all-time stats from DB, but don't fail if unavailable
    let allTimeStats = {
      totalSessions: 0,
      totalPlayers: 0,
      topPlayers: [] as {
        rank: number;
        username: string;
        displayName: string;
        totalPoints: number;
        gamesPlayed: number;
        correctAnswers: number;
        bestStreak: number;
        title: string;
        level: number;
      }[],
    };

    try {
      const { db } = await import("@/db");
      const { users, gameSessions } = await import("@/db/schema");
      const { desc, sql } = await import("drizzle-orm");

      const topPlayers = await db
        .select()
        .from(users)
        .orderBy(desc(users.totalPoints))
        .limit(20);

      const totalSessions = await db
        .select({ count: sql<number>`count(*)` })
        .from(gameSessions);

      const totalUsers = await db
        .select({ count: sql<number>`count(*)` })
        .from(users);

      allTimeStats = {
        totalSessions: Number(totalSessions[0]?.count ?? 0),
        totalPlayers: Number(totalUsers[0]?.count ?? 0),
        topPlayers: topPlayers.map((u, i) => ({
          rank: i + 1,
          username: u.tiktokUsername,
          displayName: u.displayName,
          totalPoints: u.totalPoints,
          gamesPlayed: u.gamesPlayed,
          correctAnswers: u.correctAnswers,
          bestStreak: u.bestStreak,
          title: u.title,
          level: u.level,
        })),
      };
    } catch {
      console.warn("Database not available for stats");
    }

    return NextResponse.json({
      live: liveStats,
      allTime: allTimeStats,
    });
  } catch (error) {
    console.error("GET /api/game/stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
