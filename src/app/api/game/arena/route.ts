import { NextRequest, NextResponse } from "next/server";
import { getArenaEngine } from "@/lib/arena-engine";

export async function GET() {
  const arena = getArenaEngine();
  const state = arena.getState();
  return NextResponse.json({
    mode: state.mode, status: state.status, totalVotes: state.totalVotes,
    timeRemaining: state.timeRemaining, timeLimit: state.timeLimit,
    tugPosition: state.tugPosition, hypeScore: state.hypeScore, hypeLevel: state.hypeLevel,
    messagesPerSecond: state.messagesPerSecond,
    bossHp: state.bossHp, bossMaxHp: state.bossMaxHp, bossName: state.bossName,
    bossPhase: state.bossPhase, comboDamage: state.comboDamage, comboCount: state.comboCount,
    activeEvent: state.activeEvent ? { name: state.activeEvent.name, description: state.activeEvent.description, active: state.activeEvent.active } : null,
    mvp: state.mvp,
    attackLog: state.attackLog.slice(-5),
    fighters: state.fighters.map(f => ({
      label: f.label, name: f.name, anime: f.anime, votes: f.votes,
      hp: f.hp, maxHp: f.maxHp, percentage: f.percentage,
      attacks: f.attacks.filter(a => a.triggered).map(a => a.name),
    })),
    tournamentRound: state.tournamentRound,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action } = body;
  const arena = getArenaEngine();

  switch (action) {
    case "start_battle": {
      const { fighters, timeLimit = 30, mode = "vote" } = body;
      arena.startBattle(fighters, timeLimit, mode);
      return NextResponse.json({ success: true });
    }
    case "start_tug_of_war": {
      const { fighters, timeLimit = 30 } = body;
      if (!fighters || fighters.length !== 2) return NextResponse.json({ error: "Exactly 2 fighters needed" }, { status: 400 });
      arena.startBattle(fighters, timeLimit, "tug_of_war");
      return NextResponse.json({ success: true });
    }
    case "start_boss_raid": {
      const { bossName, bossHp = 1000, timeLimit = 60 } = body;
      arena.startBossRaid(bossName, bossHp, timeLimit);
      return NextResponse.json({ success: true });
    }
    case "vote": {
      const { username, displayName, message } = body;
      const result = arena.processVote(username, displayName, message);
      return NextResponse.json(result);
    }
    case "predict": {
      const { username, fighter } = body;
      const ok = arena.addPrediction(username, fighter);
      return NextResponse.json({ success: ok });
    }
    case "trigger_event": {
      arena.triggerEventManually(body.eventName);
      return NextResponse.json({ success: true });
    }
    case "end": {
      arena.endBattle();
      return NextResponse.json({ success: true, predictions: arena.getPredictionResults() });
    }
    case "reset_votes": {
      arena.resetVotes();
      return NextResponse.json({ success: true });
    }
    case "pause": {
      arena.pause();
      return NextResponse.json({ success: true });
    }
    case "resume": {
      arena.resume();
      return NextResponse.json({ success: true });
    }
    case "cleanup": {
      arena.cleanup();
      return NextResponse.json({ success: true });
    }
    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
}
