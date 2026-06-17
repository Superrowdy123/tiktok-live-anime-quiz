// ═══════════════════════════════════════════════════════════════
// ANIME WIZ — Sound Effects Engine (Web Audio API)
// No external files needed — generates all sounds procedurally
// ═══════════════════════════════════════════════════════════════

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// ── Correct Answer — bright ascending chime ──
export function playCorrect() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, now + i * 0.08);
    gain.gain.linearRampToValueAtTime(0.25, now + i * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + i * 0.08);
    osc.stop(now + i * 0.08 + 0.4);
  });

  // Sparkle layer
  for (let i = 0; i < 3; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = 1800 + i * 400;
    gain.gain.setValueAtTime(0, now + 0.3 + i * 0.05);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.32 + i * 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5 + i * 0.05);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + 0.3 + i * 0.05);
    osc.stop(now + 0.6 + i * 0.05);
  }
}

// ── Wrong / Time Up — descending buzzer ──
export function playTimeUp() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.linearRampToValueAtTime(150, now + 0.5);
  gain.gain.setValueAtTime(0.2, now);
  gain.gain.linearRampToValueAtTime(0.15, now + 0.3);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.7);

  // Low thud
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = "sine";
  osc2.frequency.value = 80;
  gain2.gain.setValueAtTime(0.3, now);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
  osc2.connect(gain2).connect(ctx.destination);
  osc2.start(now);
  osc2.stop(now + 0.5);
}

// ── New Question — attention ding ──
export function playNewQuestion() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(880, now);
  osc.frequency.setValueAtTime(1100, now + 0.1);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.2, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.5);

  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = "triangle";
  osc2.frequency.value = 1320;
  gain2.gain.setValueAtTime(0, now + 0.1);
  gain2.gain.linearRampToValueAtTime(0.12, now + 0.12);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
  osc2.connect(gain2).connect(ctx.destination);
  osc2.start(now + 0.1);
  osc2.stop(now + 0.6);
}

// ── Streak — power-up ascending ──
export function playStreak() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51]; // A4-E6 scale up
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, now + i * 0.06);
    gain.gain.linearRampToValueAtTime(0.12, now + i * 0.06 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.2);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + i * 0.06);
    osc.stop(now + i * 0.06 + 0.25);
  });
}

// ── Tick Warning (10 seconds) — heartbeat ──
export function playTickWarning() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  for (let i = 0; i < 2; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 220;
    gain.gain.setValueAtTime(0, now + i * 0.15);
    gain.gain.linearRampToValueAtTime(0.2, now + i * 0.15 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + i * 0.15);
    osc.stop(now + i * 0.15 + 0.15);
  }
}

// ── Countdown Tick (5 seconds) — urgent beep ──
export function playCountdownTick() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.value = 800;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.15, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.1);
}

// ── Game Start — fanfare ──
export function playGameStart() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  const melody = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50, 1318.51];
  melody.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = i < 4 ? "sine" : "triangle";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, now + i * 0.12);
    gain.gain.linearRampToValueAtTime(0.2, now + i * 0.12 + 0.02);
    gain.gain.setValueAtTime(0.18, now + i * 0.12 + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.3);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + i * 0.12);
    osc.stop(now + i * 0.12 + 0.35);
  });
}

// ── Game Complete — victory fanfare ──
export function playVictory() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  // Triumphant chord progression
  const chords = [
    [523.25, 659.25, 783.99],  // C major
    [587.33, 739.99, 880.00],  // D major
    [659.25, 783.99, 987.77],  // E minor-ish
    [523.25, 659.25, 783.99, 1046.50], // C major octave
  ];

  chords.forEach((chord, ci) => {
    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + ci * 0.3);
      gain.gain.linearRampToValueAtTime(0.12, now + ci * 0.3 + 0.03);
      gain.gain.setValueAtTime(0.1, now + ci * 0.3 + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + ci * 0.3 + 0.5);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + ci * 0.3);
      osc.stop(now + ci * 0.3 + 0.55);
    });
  });

  // Sparkle finish
  for (let i = 0; i < 6; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = 2000 + i * 300;
    gain.gain.setValueAtTime(0, now + 1.2 + i * 0.04);
    gain.gain.linearRampToValueAtTime(0.06, now + 1.22 + i * 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5 + i * 0.04);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + 1.2 + i * 0.04);
    osc.stop(now + 1.6 + i * 0.04);
  }
}

// ── Phase Change — level up ──
export function playPhaseChange() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  const notes = [440, 554.37, 659.25, 880];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, now + i * 0.1);
    gain.gain.linearRampToValueAtTime(0.18, now + i * 0.1 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.25);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + i * 0.1);
    osc.stop(now + i * 0.1 + 0.3);
  });
}

// ── New Leader — dramatic reveal ──
export function playNewLeader() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  // Drum roll simulation
  for (let i = 0; i < 8; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = 150 + i * 20;
    gain.gain.setValueAtTime(0, now + i * 0.04);
    gain.gain.linearRampToValueAtTime(0.1 + i * 0.02, now + i * 0.04 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.06);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + i * 0.04);
    osc.stop(now + i * 0.04 + 0.08);
  }

  // Crown sound
  setTimeout(() => {
    playCorrect();
  }, 350);
}

// Initialize audio context on first user interaction
export function initAudio() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}
