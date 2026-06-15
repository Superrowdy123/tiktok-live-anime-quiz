// TikTok Live Connector - Real-time chat integration
// This connects to TikTok Live and forwards messages to the game engine

import { WebcastPushConnection } from "tiktok-live-connector";
import { getGameEngine } from "./game-engine";

interface TikTokState {
  connected: boolean;
  username: string | null;
  roomId: string | null;
  viewerCount: number;
  startedAt: number | null;
  connection: WebcastPushConnection | null;
  messageCount: number;
  answerCount: number;
  lastError: string | null;
}

const state: TikTokState = {
  connected: false,
  username: null,
  roomId: null,
  viewerCount: 0,
  startedAt: null,
  connection: null,
  messageCount: 0,
  answerCount: 0,
  lastError: null,
};

export function getTikTokState() {
  return {
    connected: state.connected,
    username: state.username,
    roomId: state.roomId,
    viewerCount: state.viewerCount,
    startedAt: state.startedAt,
    messageCount: state.messageCount,
    answerCount: state.answerCount,
    lastError: state.lastError,
  };
}

export async function connectToTikTok(username: string): Promise<{ success: boolean; error?: string }> {
  // Disconnect existing connection first
  if (state.connection) {
    try {
      state.connection.disconnect();
    } catch {
      // Ignore
    }
  }

  try {
    // Remove @ if present
    const cleanUsername = username.replace(/^@/, "").trim();
    
    if (!cleanUsername) {
      return { success: false, error: "Username is required" };
    }

    console.log(`[TikTok] Connecting to @${cleanUsername}...`);

    // Create new connection
    const connection = new WebcastPushConnection(cleanUsername, {
      processInitialData: true,
      enableExtendedGiftInfo: false,
      enableWebsocketUpgrade: true,
      requestPollingIntervalMs: 2000,
      sessionId: undefined,
      clientParams: {
        app_language: "en-US",
        device_platform: "web",
      },
    });

    // Connect to TikTok Live
    const roomState = await connection.connect();

    const roomInfo = roomState as { roomId?: string; viewerCount?: number };
    console.log(`[TikTok] Connected! Room ID: ${roomInfo.roomId}`);

    state.connected = true;
    state.username = cleanUsername;
    state.roomId = roomInfo.roomId || null;
    state.viewerCount = 0;
    state.startedAt = Date.now();
    state.connection = connection;
    state.messageCount = 0;
    state.answerCount = 0;
    state.lastError = null;

    // ─── Chat Message Handler ───
    connection.on("chat", (data) => {
      state.messageCount++;

      const username = data.uniqueId || data.userId?.toString() || "unknown";
      const displayName = data.nickname || username;
      const message = data.comment || "";

      console.log(`[TikTok Chat] ${displayName}: ${message}`);

      // Forward to game engine
      const engine = getGameEngine();
      const result = engine.processAnswer(username, displayName, message);

      if (result.correct) {
        state.answerCount++;
        console.log(`[TikTok] ✅ ${displayName} answered correctly!`);
      }
    });

    // ─── Viewer Count Update ───
    connection.on("roomUser", (data) => {
      state.viewerCount = data.viewerCount || 0;
    });

    // ─── Connection Events ───
    connection.on("streamEnd", () => {
      console.log("[TikTok] Stream ended");
      state.connected = false;
      state.lastError = "Stream ended";
    });

    connection.on("disconnected", () => {
      console.log("[TikTok] Disconnected");
      state.connected = false;
    });

    connection.on("error", (err) => {
      console.error("[TikTok] Error:", err);
      state.lastError = err.message || "Unknown error";
    });

    // ─── Gift Handler (optional - for future features) ───
    connection.on("gift", (data) => {
      console.log(`[TikTok Gift] ${data.nickname} sent ${data.giftName} x${data.repeatCount}`);
      // Could add power-ups for gifts in the future
    });

    // ─── Like Handler ───
    connection.on("like", (data) => {
      // Could track likes for engagement
    });

    return { success: true };

  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Failed to connect";
    console.error("[TikTok] Connection failed:", errMsg);
    
    state.connected = false;
    state.lastError = errMsg;
    state.connection = null;

    // Provide helpful error messages
    if (errMsg.includes("LIVE has ended") || errMsg.includes("not found")) {
      return { success: false, error: "This user is not currently live. Make sure they're streaming!" };
    }
    if (errMsg.includes("rate limit")) {
      return { success: false, error: "Rate limited. Wait a moment and try again." };
    }

    return { success: false, error: errMsg };
  }
}

export function disconnectTikTok(): void {
  if (state.connection) {
    try {
      state.connection.disconnect();
    } catch {
      // Ignore
    }
  }

  state.connected = false;
  state.username = null;
  state.roomId = null;
  state.viewerCount = 0;
  state.startedAt = null;
  state.connection = null;
  state.lastError = null;

  console.log("[TikTok] Disconnected");
}

// Singleton to survive HMR
const globalForTikTok = globalThis as typeof globalThis & {
  __tiktokConnectorInitialized?: boolean;
};

if (!globalForTikTok.__tiktokConnectorInitialized) {
  globalForTikTok.__tiktokConnectorInitialized = true;
  console.log("[TikTok] Connector module loaded");
}
