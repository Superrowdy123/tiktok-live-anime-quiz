import { NextRequest, NextResponse } from "next/server";
import { getGameEngine } from "@/lib/game-engine";

// Try to save to database, but don't fail if DB isn't available
async function saveToDatabase(action: string, engine: ReturnType<typeof getGameEngine>) {
  try {
    const { db } = await import("@/db");
    const { gameSessions, sessionScores, users } = await import("@/db/schema");
    const { eq } = await import("drizzle-orm");
    
    const state = engine.getPublicState();
    
    if (action === "start") {
      const [session] = await db
        .insert(gameSessions)
        .values({
          status: "active",
          totalQuestions: state.totalQuestions,
          difficulty: state.difficulty,
          season: state.season,
          startedAt: new Date(),
        })
        .returning();
      return session.id;
    }
    
    if (action === "end" && state.sessionId) {
      await db
        .update(gameSessions)
        .set({
          status: "completed",
          questionsAsked: state.questionsAsked,
          totalPlayers: state.totalPlayers,
          endedAt: new Date(),
        })
        .where(eq(gameSessions.id, state.sessionId));

      // Save player scores
      const leaderboard = engine.getLeaderboard();
      for (const player of leaderboard) {
        await db.insert(sessionScores).values({
          sessionId: state.sessionId,
          tiktokUsername: player.tiktokUsername,
          displayName: player.displayName,
          points: player.points,
          streak: player.streak,
          bestStreak: player.bestStreak,
          correctAnswers: player.correctAnswers,
          totalAnswers: player.totalAnswers,
          fastestAnswer: player.fastestAnswer,
          team: player.team,
        });

        // Upsert user totals
        const existingUsers = await db
          .select()
          .from(users)
          .where(eq(users.tiktokUsername, player.tiktokUsername));

        if (existingUsers.length > 0) {
          const existing = existingUsers[0];
          await db
            .update(users)
            .set({
              totalPoints: existing.totalPoints + player.points,
              gamesPlayed: existing.gamesPlayed + 1,
              questionsAnswered: existing.questionsAnswered + player.totalAnswers,
              correctAnswers: existing.correctAnswers + player.correctAnswers,
              bestStreak: Math.max(existing.bestStreak, player.bestStreak),
              updatedAt: new Date(),
            })
            .where(eq(users.tiktokUsername, player.tiktokUsername));
        } else {
          await db.insert(users).values({
            tiktokUsername: player.tiktokUsername,
            displayName: player.displayName,
            totalPoints: player.points,
            gamesPlayed: 1,
            questionsAnswered: player.totalAnswers,
            correctAnswers: player.correctAnswers,
            bestStreak: player.bestStreak,
          });
        }
      }
    }
    
    return null;
  } catch (error) {
    console.warn("Database not available, running in memory-only mode:", error);
    return null;
  }
}

export async function GET() {
  try {
    const engine = getGameEngine();
    const state = engine.getPublicState();

    return NextResponse.json({
      status: state.status,
      currentQuestion: state.currentQuestion
        ? {
            id: state.currentQuestion.id,
            type: state.currentQuestion.type,
            difficulty: state.currentQuestion.difficulty,
            question: state.currentQuestion.question,
            options: state.currentQuestion.options,
            answer: state.currentQuestion.answer,
            timeLimit: state.currentQuestion.timeLimit,
          }
        : null,
      currentQuestionIndex: state.currentQuestionIndex,
      totalQuestions: state.totalQuestions,
      timeRemaining: state.timeRemaining,
      leaderboard: state.leaderboard.slice(0, 10).map((p) => ({
        rank: p.rank,
        username: p.tiktokUsername,
        displayName: p.displayName,
        points: p.points,
        streak: p.streak,
        team: p.team,
        title: p.title,
      })),
      correctAnswer: state.correctAnswer,
      winner: state.winner,
      winnerDisplayName: state.winnerDisplayName,
      bossRound: state.bossRound,
      questionsAsked: state.questionsAsked,
      totalPlayers: state.totalPlayers,
      stats: state.stats,
      sessionId: state.sessionId,
      currentRound: engine.getCurrentRound(),
      totalRounds: engine.getTotalRounds(),
      answerDistribution: engine.getAnswerDistribution(),
      correctAnswerers: engine.getCorrectAnswerers(),
    });
  } catch (error) {
    console.error("GET /api/game error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;
    const engine = getGameEngine();

    switch (action) {
      case "start": {
        const { round = 1 } = body;

        // Try to create session in DB, get ID or use timestamp
        const sessionId = await saveToDatabase("start", engine) || Date.now();

        engine.startGame({
          round,
          sessionId: typeof sessionId === 'number' ? sessionId : Date.now(),
        });

        return NextResponse.json({ 
          success: true, 
          sessionId,
          round: engine.getCurrentRound(),
          totalRounds: engine.getTotalRounds(),
        });
      }

      case "next_question": {
        engine.nextQuestion();
        return NextResponse.json({ success: true });
      }

      case "pause": {
        engine.pauseGame();
        return NextResponse.json({ success: true });
      }

      case "resume": {
        engine.resumeGame();
        return NextResponse.json({ success: true });
      }

      case "skip": {
        engine.skipQuestion();
        return NextResponse.json({ success: true });
      }

      case "add_points": {
        const { username, points } = body;
        engine.addPoints(username, points);
        return NextResponse.json({ success: true });
      }

      case "ban": {
        const { username } = body;
        engine.banPlayer(username);
        return NextResponse.json({ success: true });
      }

      case "reset": {
        engine.resetGame();
        return NextResponse.json({ success: true });
      }

      case "end": {
        engine.endGame();
        await saveToDatabase("end", engine);
        return NextResponse.json({ success: true, winners: engine.getWinners() });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    console.error("POST /api/game error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
