import { NextRequest, NextResponse } from "next/server";
import { getArenaEngine } from "@/lib/arena-engine";
import { generateWhoWins, generateHotTake, generateTierListCharacter, generateTournamentBracket, CHARACTERS } from "@/data/game-modes-data";

function clampTimeLimitSeconds(input: unknown, fallback: number) {
  const n = typeof input === "number" ? input : typeof input === "string" ? Number(input) : fallback;
  if (!Number.isFinite(n)) return fallback;
  // Arena-engine expects seconds; allow up to 1 hour.
  return Math.max(0, Math.min(3600, Math.floor(n)));
}


// Persistent state for special modes
const gState = globalThis as typeof globalThis & {
  __modeState?: {
    mode: string;
    hotTake: { statement: string; category: string } | null;
    tierCharacter: { name: string; anime: string; tier: string } | null;
    tournament: { bracket: string[][]; round: number; results: { matchup: string; winner: string }[] } | null;
  };
};
if (!gState.__modeState) {
  gState.__modeState = { mode: "idle", hotTake: null, tierCharacter: null, tournament: null };
}

export async function GET() {
  const arena = getArenaEngine();
  const state = arena.getState();
  return NextResponse.json({
    arenaStatus: state.status,
    arenaMode: state.mode,
    modeState: gState.__modeState,
    timeRemaining: state.timeRemaining,
    totalVotes: state.totalVotes,
    hypeScore: state.hypeScore,
    fighters: state.fighters.map(f => ({
      label: f.label, name: f.name, anime: f.anime,
      votes: f.votes, percentage: f.percentage, hp: f.hp, maxHp: f.maxHp,
    })),
    activeEvent: state.activeEvent ? { name: state.activeEvent.name, active: state.activeEvent.active } : null,
    attackLog: state.attackLog.slice(-5),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;
    const arena = getArenaEngine();
    const ms = gState.__modeState!;

    switch (action) {
      // ── WHO WINS? ──
      case "who_wins": {
        const { tag, count = 4 } = body;
        const timeLimit = clampTimeLimitSeconds(body.timeLimit, 15);
        const chars = generateWhoWins(count, tag);
        if (chars.length < 2) return NextResponse.json({ error: "Not enough characters" }, { status: 400 });
        ms.mode = "who_wins";
        arena.startBattle(
          chars.map(c => ({ name: c.name, anime: c.anime })),
          timeLimit, "vote"
        );
        return NextResponse.json({ success: true, fighters: chars.map(c => ({ name: c.name, anime: c.anime, power: c.power, tags: c.tags })) });
      }


      // ── HOT TAKE ──
      case "hot_take": {
        const timeLimit = clampTimeLimitSeconds(body.timeLimit, 15);
        const take = body.statement ? { statement: body.statement, category: "custom" } : generateHotTake();
        ms.mode = "hot_take";
        ms.hotTake = take;
        arena.startBattle(
          [{ name: "AGREE 👍", anime: "" }, { name: "DISAGREE 👎", anime: "" }],
          timeLimit, "vote"
        );
        return NextResponse.json({ success: true, hotTake: take });
      }


      // ── TIER LIST ──
      case "tier_list": {
        const { characterName } = body;
        const timeLimit = clampTimeLimitSeconds(body.timeLimit, 15);
        const char = characterName
          ? CHARACTERS.find(c => c.name.toLowerCase().includes(characterName.toLowerCase())) || generateTierListCharacter()
          : generateTierListCharacter();
        ms.mode = "tier_list";
        ms.tierCharacter = { name: char.name, anime: char.anime, tier: char.tier };
        arena.startBattle(
          [{ name: "S Tier", anime: "🏆" }, { name: "A Tier", anime: "⭐" }, { name: "B Tier", anime: "👍" }, { name: "C/D Tier", anime: "👎" }],
          timeLimit, "vote"
        );
        return NextResponse.json({ success: true, character: char });
      }


      // ── TOURNAMENT ──
      case "start_tournament": {
        const { size = 16 } = body;
        const timeLimit = clampTimeLimitSeconds(body.timeLimit, 15);
        const bracket = generateTournamentBracket(size as 8 | 16 | 32);
        ms.mode = "tournament";
        ms.tournament = { bracket, round: 0, results: [] };
        // Start first matchup
        if (bracket[0]) {
          arena.startBattle(
            bracket[0].map(name => ({ name, anime: "" })),
            timeLimit, "vote"
          );
        }
        return NextResponse.json({ success: true, bracket, totalMatchups: bracket.length });
      }


      case "tournament_next": {
        const timeLimit = clampTimeLimitSeconds(body.timeLimit, 15);
        if (!ms.tournament) return NextResponse.json({ error: "No tournament" }, { status: 400 });
        // Record result of current matchup
        const arenaState = arena.getState();

        const sorted = [...arenaState.fighters].sort((a, b) => b.votes - a.votes);
        if (sorted[0]) {
          ms.tournament.results.push({
            matchup: `${arenaState.fighters.map(f => f.name).join(" vs ")}`,
            winner: sorted[0].name,
          });
        }
        ms.tournament.round++;
        const nextMatchup = ms.tournament.bracket[ms.tournament.round];
        if (nextMatchup) {
          arena.startBattle(
            nextMatchup.map(name => ({ name, anime: "" })),
            timeLimit, "vote"
          );
          return NextResponse.json({ success: true, round: ms.tournament.round, matchup: nextMatchup, results: ms.tournament.results });
        } else {
          // Tournament complete: overall winner is the last matchup winner
          const champion = ms.tournament.results[ms.tournament.results.length - 1]?.winner;
          ms.mode = "idle";
          return NextResponse.json({
            success: true,
            tournamentComplete: true,
            winner: champion,
            results: ms.tournament.results,
          });
        }
      }


      // ── CONTROLS ──
      case "end_vote": { arena.endBattle(); return NextResponse.json({ success: true }); }
      case "pause": { arena.pause(); return NextResponse.json({ success: true }); }
      case "resume": { arena.resume(); return NextResponse.json({ success: true }); }
      case "reset": { arena.cleanup(); ms.mode = "idle"; return NextResponse.json({ success: true }); }
      case "trigger_event": { arena.triggerEventManually(); return NextResponse.json({ success: true }); }

      default: return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Modes API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
