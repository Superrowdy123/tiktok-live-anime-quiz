import { NextRequest, NextResponse } from "next/server";
import { getGameEngine } from "@/lib/game-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, displayName, message } = body;

    if (!username || !message) {
      return NextResponse.json({ error: "Missing username or message" }, { status: 400 });
    }

    const engine = getGameEngine();

    // Check for power-up commands
    const lowerMsg = message.toLowerCase().trim();
    if (lowerMsg === "!double") {
      engine.processPowerUp(username, "double");
      return NextResponse.json({ success: true, correct: false, reason: "Power-up: double activated" });
    }
    if (lowerMsg === "!shield") {
      engine.processPowerUp(username, "shield");
      return NextResponse.json({ success: true, correct: false, reason: "Power-up: shield activated" });
    }
    if (lowerMsg === "!steal") {
      engine.processPowerUp(username, "steal");
      return NextResponse.json({ success: true, correct: false, reason: "Power-up: steal activated" });
    }

    const result = engine.processAnswer(
      username,
      displayName || username,
      message
    );

    return NextResponse.json({
      success: true,
      correct: result.correct,
      reason: result.reason,
    });
  } catch (error) {
    console.error("POST /api/game/answer error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
