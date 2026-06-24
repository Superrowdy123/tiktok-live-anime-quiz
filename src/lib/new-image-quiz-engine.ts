import type { ImageQuestion, ImageQuizSession } from "./image-quiz-types";

export class NewImageQuizEngine {
  private session: ImageQuizSession | null = null;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private revealInterval: ReturnType<typeof setInterval> | null = null;
  private onStateChange: ((state: ImageQuizSession | null) => void) | null = null;

  setOnStateChange(cb: (state: ImageQuizSession | null) => void) {
    this.onStateChange = cb;
  }

  getSession(): ImageQuizSession | null {
    if (!this.session) return null;
    return {
      ...this.session,
      winners: [...this.session.winners],
      answerFeed: [...this.session.answerFeed],
    };
  }

  startQuestion(question: ImageQuestion) {
    this.stop();
    this.session = {
      question,
      status: "active",
      startTime: Date.now(),
      timeRemaining: question.timeLimit,
      winners: [],
      answerFeed: [],
      revealProgress: 0,
    };
    this.emitState();

    if (question.revealMode === "progressive") {
      this.revealInterval = setInterval(() => {
        if (this.session && this.session.status === "active") {
          const elapsed = (Date.now() - this.session.startTime!) / 1000;
          this.session.revealProgress = Math.min(100, (elapsed / question.timeLimit) * 100);
          this.emitState();
        }
      }, 200);
    }

    this.startTimer(question.timeLimit);
  }

  private startTimer(seconds: number) {
    let remaining = seconds;
    const tick = () => {
      remaining--;
      if (!this.session) return;
      this.session.timeRemaining = remaining;
      this.emitState();
      if (remaining <= 0) this.endQuestion();
      else this.timer = setTimeout(tick, 1000);
    };
    this.timer = setTimeout(tick, 1000);
  }

  endQuestion() {
    if (!this.session) return;
    this.session.status = "revealing";
    this.session.revealProgress = 100;
    this.stopTimer();
    this.emitState();
  }

  processAnswer(
    username: string,
    displayName: string,
    message: string,
  ): { correct: boolean; points: number } {
    if (!this.session || this.session.status !== "active") {
      return { correct: false, points: 0 };
    }

    const alreadyAnswered = this.session.answerFeed.some(a => a.username === username);
    if (alreadyAnswered) return { correct: false, points: 0 };

    const cleaned = message.trim().toUpperCase();
    const isCorrect =
      cleaned === ["A", "B", "C", "D"][this.session.question.correctOptionIndex];

    const answerTime = this.session.startTime
      ? (Date.now() - this.session.startTime) / 1000
      : 0;

    this.session.answerFeed.push({
      username,
      displayName,
      answer: message,
      correct: isCorrect,
      time: answerTime,
    });
    if (this.session.answerFeed.length > 50) {
      this.session.answerFeed.shift();
    }

    if (isCorrect) {
      const speedBonus = Math.max(1, 2 - answerTime / this.session.question.timeLimit);
      const basePoints = { easy: 15, medium: 25, hard: 40 }[this.session.question.difficulty] || 15;
      const points = Math.round(basePoints * speedBonus);
      this.session.winners.push({ username, displayName, time: answerTime });

      if (this.session.winners.length === 1) {
        this.endQuestion();
      }

      this.emitState();
      return { correct: true, points };
    }

    this.emitState();
    return { correct: false, points: 0 };
  }

  stop() {
    this.stopTimer();
    if (this.revealInterval) {
      clearInterval(this.revealInterval);
      this.revealInterval = null;
    }
    this.session = null;
    this.emitState();
  }

  private stopTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private emitState() {
    this.onStateChange?.(this.getSession());
  }
}

const g = globalThis as typeof globalThis & { __newImageQuizEngine?: NewImageQuizEngine };
export function getNewImageQuizEngine(): NewImageQuizEngine {
  if (!g.__newImageQuizEngine) g.__newImageQuizEngine = new NewImageQuizEngine();
  return g.__newImageQuizEngine;
}
