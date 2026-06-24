import { NextRequest, NextResponse } from "next/server";
import { connectToTwitch, disconnectTwitch, getTwitchState } from "@/lib/twitch-connector";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getTwitchState());
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, channel } = body;

    switch (action) {
      case "connect": {
        if (!channel) return NextResponse.json({ success: false, error: "Channel required" }, { status: 400 });
        const result = await connectToTwitch(channel);
        if (result.success) {
          const state = getTwitchState();
          return NextResponse.json({ success: true, ...state });
        }
        return NextResponse.json({ success: false, error: result.error }, { status: 400 });
      }
      case "disconnect": {
        await disconnectTwitch();
        return NextResponse.json({ success: true, connected: false });
      }
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Twitch API error:", error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
