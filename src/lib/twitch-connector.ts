// ═══════════════════════════════════════════════════════════════
// ANIME WIZ — Twitch Chat Connector
// ═══════════════════════════════════════════════════════════════

import { getGameEngine } from "./game-engine";

interface TwitchState {
  connected: boolean;
  channel: string | null;
  startedAt: number | null;
  messageCount: number;
  answerCount: number;
  lastError: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: any;
}

const state: TwitchState = {
  connected: false,
  channel: null,
  startedAt: null,
  messageCount: 0,
  answerCount: 0,
  lastError: null,
  client: null,
};

export function getTwitchState() {
  return {
    connected: state.connected,
    channel: state.channel,
    startedAt: state.startedAt,
    messageCount: state.messageCount,
    answerCount: state.answerCount,
    lastError: state.lastError,
  };
}

export async function connectToTwitch(channel: string): Promise<{ success: boolean; error?: string }> {
  if (state.client) {
    try { await state.client.disconnect(); } catch { /* ignore */ }
  }

  try {
    const cleanChannel = channel.replace(/^[#@]/, "").trim().toLowerCase();
    if (!cleanChannel) return { success: false, error: "Channel name is required" };

    console.log(`[Twitch] Connecting to #${cleanChannel}...`);

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const tmi = require("tmi.js");
    const TmiClient = tmi.Client || tmi.default?.Client;

    const client = new TmiClient({
      connection: { secure: true, reconnect: true },
      channels: [cleanChannel],
    });

    await client.connect();

    console.log(`[Twitch] Connected to #${cleanChannel}`);

    state.connected = true;
    state.channel = cleanChannel;
    state.startedAt = Date.now();
    state.client = client;
    state.messageCount = 0;
    state.answerCount = 0;
    state.lastError = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client.on("message", (_channel: string, userstate: any, message: string, self: boolean) => {
      if (self) return;
      state.messageCount++;

      const username = userstate.username || userstate["display-name"] || "unknown";
      const displayName = userstate["display-name"] || username;
      const msg = message.trim();

      console.log(`[Twitch Chat] ${displayName}: ${msg}`);

      // Try arena first (if active)
      try {
        const { getArenaEngine } = require("./arena-engine");
        const arena = getArenaEngine();
        const arenaState = arena.getState();
        if (arenaState.status === "voting" || arenaState.status === "event") {
          arena.processVote(username, displayName, msg);
        }
      } catch { /* arena not loaded */ }

      // Try image quiz engine (if active)
      try {
        const { getNewImageQuizEngine } = require("./new-image-quiz-engine");
        const iqEngine = getNewImageQuizEngine();
        const iqSession = iqEngine.getSession();
        if (iqSession && iqSession.status === "active") {
          const iqResult = iqEngine.processAnswer(username, displayName, msg);
          if (iqResult.correct) {
            state.answerCount++;
            console.log(`[Twitch] ✅ ${displayName} answered image quiz correctly!`);
          }
          return;
        }
      } catch { /* image quiz engine not loaded */ }

      // Fall back to normal quiz engine
      const engine = getGameEngine();
      const result = engine.processAnswer(username, displayName, msg);

      if (result.correct) {
        state.answerCount++;
        console.log(`[Twitch] ${displayName} answered correctly!`);
      }
    });

    client.on("disconnected", (reason: string) => {
      console.log(`[Twitch] Disconnected: ${reason}`);
      state.connected = false;
      state.lastError = reason || "Disconnected";
    });

    return { success: true };

  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Failed to connect";
    console.error("[Twitch] Connection failed:", errMsg);
    state.connected = false;
    state.lastError = errMsg;
    state.client = null;
    return { success: false, error: errMsg };
  }
}

export async function disconnectTwitch(): Promise<void> {
  if (state.client) {
    try { await state.client.disconnect(); } catch { /* ignore */ }
  }
  state.connected = false;
  state.channel = null;
  state.startedAt = null;
  state.client = null;
  state.lastError = null;
  console.log("[Twitch] Disconnected");
}
