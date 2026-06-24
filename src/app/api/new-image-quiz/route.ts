import { NextRequest, NextResponse } from "next/server";
import { getNewImageQuizEngine } from "@/lib/new-image-quiz-engine";
import type { ImageQuestion } from "@/lib/image-quiz-types";

export async function GET() {
  try {
    const engine = getNewImageQuizEngine();
    const session = engine.getSession();
    return NextResponse.json({ session });
  } catch (error) {
    console.error("GET /api/new-image-quiz:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;
    const engine = getNewImageQuizEngine();

    switch (action) {
      case "start": {
        const question = body.question as ImageQuestion;
        if (!question) {
          return NextResponse.json({ error: "Missing question" }, { status: 400 });
        }
        engine.startQuestion(question);
        return NextResponse.json({ success: true });
      }
      case "end": {
        engine.endQuestion();
        return NextResponse.json({ success: true });
      }
      case "stop": {
        engine.stop();
        return NextResponse.json({ success: true });
      }
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    console.error("POST /api/new-image-quiz:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
