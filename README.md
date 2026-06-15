# 🎮 Anime Wiz Live Arena

> Interactive anime trivia game for TikTok Live streams — powered by Next.js, PostgreSQL, and real-time chat detection.

![Anime Wiz](public/images/hero-bg.jpg)

## ✨ Features

### Core Game Features
- **🎯 100 Anime Questions** — Multiple Choice, Guess The Anime, Guess The Character, True or False, Boss Rounds
- **⚡ Real-Time Answer Detection** — Monitors chat, detects correct answers with alias support
- **🏆 Live Leaderboard** — Animated, ranked leaderboard with points, streaks, and titles
- **⚔️ Boss Battle Rounds** — Every 10 questions, special 100-point boss challenges
- **🔥 Streak System** — Bonus points for consecutive correct answers (+5, +15, +30, +100)
- **🎮 Power-Ups** — `!double`, `!shield`, `!steal` commands for strategic gameplay
- **👥 Team Battles** — Auto-assigned teams: Shonen, Seinen, Isekai, Romance
- **🧙 Anime Wiz Mascot** — AI-style anime host that announces questions and celebrates winners

### Difficulty & Scoring
| Difficulty | Points | Color |
|-----------|--------|-------|
| Easy | 10 pts | 🔵 Cyan |
| Medium | 20 pts | 🟡 Yellow |
| Hard | 30 pts | 🟠 Orange |
| Legendary | 50 pts | 🔴 Red |
| Boss Round | 100 pts | ⚔️ Gold |

### Streak Bonuses
| Streak | Bonus |
|--------|-------|
| 1 correct | +5 |
| 3 in a row | +15 |
| 5 in a row | +30 |
| 10 in a row | +100 |

### Title System
| Points Required | Title |
|----------------|-------|
| 0 | Anime Rookie |
| 100 | Otaku Apprentice |
| 300 | Otaku |
| 500 | Anime Expert |
| 1000 | Anime Sage |
| 2000 | Legendary Weeb |
| 5000 | Anime God |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Installation

```bash
# Clone the project
git clone <repository-url>
cd anime-wiz-live-arena

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your DATABASE_URL

# Push database schema
npx drizzle-kit push

# Start development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db
```

---

## 🖥️ Pages

### Admin Dashboard — `/`
The main control panel for managing the quiz game:
- **Control Tab** — Start/pause/skip/end games, set difficulty and question count
- **Leaderboard Tab** — View live rankings
- **Stats Tab** — Track players, accuracy, fastest answers, session duration
- **TikTok Tab** — Connect to TikTok Live stream
- **Simulate Tab** — Test the game locally without TikTok

### OBS Overlay — `/overlay`
Beautiful browser source overlay for OBS:
- Anime-inspired neon UI
- Animated question transitions
- Live leaderboard sidebar
- Winner celebrations with confetti
- Mascot messages
- Boss round special effects
- Victory screen with top 3

---

## 📱 TikTok Live Integration

### How It Works
1. Start your TikTok Live stream
2. Go to the **TikTok tab** in the admin panel
3. Enter your TikTok username
4. Click **Connect to TikTok Live**
5. Chat messages are automatically monitored for answers

### Answer Aliases
Players can answer using multiple formats:
```
"Attack on Titan" → ✅
"AOT" → ✅
"Shingeki no Kyojin" → ✅
```

### Production TikTok Setup
For production, install tiktok-live-connector:
```bash
npm install tiktok-live-connector
```

Then update `/api/tiktok/route.ts` to use the real connector:
```javascript
import { WebcastPushConnection } from 'tiktok-live-connector';

const tiktok = new WebcastPushConnection(username);
await tiktok.connect();

tiktok.on('chat', (data) => {
  // Process answer via /api/game/answer
  fetch('/api/game/answer', {
    method: 'POST',
    body: JSON.stringify({
      username: data.uniqueId,
      displayName: data.nickname,
      message: data.comment,
    }),
  });
});
```

---

## 🖥️ OBS Setup Instructions

### Adding Browser Source
1. Open **OBS Studio**
2. Click **+** under Sources
3. Select **Browser**
4. Name it "Anime Wiz Overlay"
5. Set URL to: `http://localhost:3000/overlay`
6. Set Width: **1920**
7. Set Height: **1080**
8. Check **"Shutdown source when not visible"**
9. Click **OK**

### Recommended Settings
- Width: 1920px
- Height: 1080px
- FPS: 60
- Custom CSS: (leave empty — styles are built-in)

### Tips
- The overlay has a transparent background — it layers perfectly over your stream
- Use Fullscreen Projector for standalone display
- The overlay auto-updates every 400ms for smooth real-time display

---

## 🎮 Localhost Testing

### Using the Simulator
1. Start the game from the **Control** tab
2. Click **Next Question** to display a question
3. Go to the **Simulate** tab
4. Enter a username and answer
5. Click **Send Answer** or press Enter

### Testing Flow
```
1. Start Game (20 questions, mixed difficulty)
2. Next Question → Question appears on overlay
3. Simulate tab → Enter "test_user" and the answer
4. Watch the leaderboard update in real-time
5. Try power-ups: !double, !shield, !steal
6. End Game → See victory screen
```

---

## 📊 API Reference

### `GET /api/game`
Returns current game state including question, leaderboard, and stats.

### `POST /api/game`
Game control actions:
```json
{ "action": "start", "questionCount": 20, "difficulty": "mixed" }
{ "action": "next_question" }
{ "action": "pause" }
{ "action": "resume" }
{ "action": "skip" }
{ "action": "end" }
{ "action": "reset" }
{ "action": "add_points", "username": "user1", "points": 50 }
{ "action": "ban", "username": "cheater" }
```

### `POST /api/game/answer`
Process a chat answer:
```json
{ "username": "user1", "displayName": "User One", "message": "naruto" }
```

### `GET /api/game/export?format=json`
Export results in JSON or CSV format.

### `GET /api/game/stats`
Get live + all-time statistics.

### `GET /api/health`
Health check endpoint.

---

## 📁 Project Structure

```
anime-wiz-live-arena/
├── public/
│   └── images/
│       ├── mascot.png          # Anime Wiz mascot
│       └── hero-bg.jpg         # Background image
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── game/
│   │   │   │   ├── route.ts        # Game control API
│   │   │   │   ├── answer/route.ts # Answer processing
│   │   │   │   ├── export/route.ts # Export results
│   │   │   │   └── stats/route.ts  # Statistics
│   │   │   ├── health/route.ts     # Health check
│   │   │   └── tiktok/route.ts     # TikTok connection
│   │   ├── overlay/
│   │   │   └── page.tsx            # OBS overlay page
│   │   ├── globals.css             # Full anime-themed styles
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Admin dashboard
│   ├── data/
│   │   └── questions.json          # 100 anime questions
│   ├── db/
│   │   ├── index.ts                # Database connection
│   │   └── schema.ts               # Drizzle ORM schema
│   └── lib/
│       ├── game-engine.ts          # Core game logic
│       └── types.ts                # TypeScript types
├── drizzle.config.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🎯 Question Types

| Type | Description | Example |
|------|-------------|---------|
| `multiple_choice` | A/B/C/D options | "What is Goku's race?" |
| `guess_the_anime` | Name the anime | "Pirates searching for treasure?" |
| `guess_the_character` | Name the character | "Who has the Sharingan?" |
| `true_or_false` | True/False question | "Luffy ate the Gum-Gum Fruit?" |
| `boss_round` | Extra hard, 100 pts | "Name ALL three Sannin!" |

### Adding Custom Questions
Edit `src/data/questions.json`:
```json
{
  "id": 101,
  "type": "guess_the_anime",
  "difficulty": "medium",
  "category": "general",
  "question": "Which anime features a boy with a Death Note?",
  "options": [],
  "answer": "Death Note",
  "aliases": ["death note", "deathnote"],
  "image": null,
  "audio": null,
  "timeLimit": 15
}
```

---

## 🛡️ Anti-Cheat System

- **Rate Limiting** — Max 3 messages per 2 seconds per user
- **Cooldown** — 5-second timeout for spammers
- **Duplicate Prevention** — One answer per question per user
- **First Correct Wins** — Only the first correct answer gets points

---

## 🔧 Production Deployment

### Build
```bash
npm run build
npm start
```

### Environment Setup
```env
DATABASE_URL=postgresql://user:pass@host:5432/dbname
NODE_ENV=production
```

### Health Check
```
GET /api/health → { "ok": true }
```

---

## 📄 License

MIT License — Built with ❤️ for anime fans worldwide.
