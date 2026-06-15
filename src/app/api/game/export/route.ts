import { NextRequest, NextResponse } from "next/server";
import { getGameEngine } from "@/lib/game-engine";

export async function GET(req: NextRequest) {
  const format = req.nextUrl.searchParams.get("format") || "json";
  const engine = getGameEngine();
  const data = engine.getExportData();

  if (format === "csv") {
    const lines = [
      "Rank,Username,Display Name,Points,Streak,Best Streak,Correct,Total,Fastest,Team,Title",
    ];
    for (const p of data.leaderboard) {
      lines.push(
        `${p.rank},"${p.displayName}","${p.tiktokUsername}",${p.points},${p.streak},${p.bestStreak},${p.correctAnswers},${p.totalAnswers},${p.fastestAnswer ?? "N/A"},"${p.team ?? "N/A"}","${p.title}"`
      );
    }

    return new NextResponse(lines.join("\n"), {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="anime-wiz-results-${Date.now()}.csv"`,
      },
    });
  }

  return NextResponse.json(data);
}
