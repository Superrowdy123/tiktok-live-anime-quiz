import { NextRequest, NextResponse } from "next/server";
import { connectToTikTok, disconnectTikTok, getTikTokState } from "@/lib/tiktok-connector";

export const dynamic = "force-dynamic";

export async function GET() {
  const state = getTikTokState();
  return NextResponse.json(state);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, username } = body;

    switch (action) {
      case "connect": {
        if (!username) {
          return NextResponse.json({ success: false, error: "Username required" }, { status: 400 });
        }

        const result = await connectToTikTok(username);
        
        if (result.success) {
          const state = getTikTokState();
          return NextResponse.json({ success: true, ...state });
        } else {
          return NextResponse.json({ success: false, error: result.error }, { status: 400 });
        }
      }

      case "disconnect": {
        disconnectTikTok();
        return NextResponse.json({ success: true, connected: false });
      }

      case "status": {
        const state = getTikTokState();
        return NextResponse.json(state);
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    console.error("TikTok API error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
