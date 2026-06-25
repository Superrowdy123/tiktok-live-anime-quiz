import { chromium } from "playwright";
import { fileURLToPath } from "url";
import path from "path";

const BASE = "http://localhost:3000";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1600, height: 1000 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  // 1. Start the game and load a question
  console.log("Starting game...");
  await page.goto(`${BASE}/api/game`, { waitUntil: "networkidle" });

  await page.evaluate(async () => {
    await fetch("/api/game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "start", round: 1 }),
    });
  });
  console.log("Game started");

  await page.waitForTimeout(300);

  await page.evaluate(async () => {
    await fetch("/api/game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "next_question" }),
    });
  });
  console.log("Question loaded");

  // Verify state
  const state = await page.evaluate(async () => {
    const res = await fetch("/api/game");
    return await res.json();
  });
  console.log("Game state:", JSON.stringify({ status: state.status, hasQuestion: !!state.currentQuestion }));

  await page.waitForTimeout(300);

  // 2. Navigate directly to the overlay with phone frame
  console.log("Opening overlay with phone frame...");
  await page.goto(`${BASE}/overlay?mobile=1&phoneframe=1`, {
    waitUntil: "networkidle",
    timeout: 30000,
  });

  // Wait for the content to render (polls every 400ms)
  await page.waitForTimeout(3000);

  // Wait for the question text to appear (confirms game state is loaded)
  try {
    await page.waitForSelector("text=What", { timeout: 10000 });
    console.log("Question text found on page");
  } catch {
    console.log("No question text found, checking for waiting state...");
    // Check what's on the page
    const text = await page.locator("body").innerText();
    console.log("Page text snippet:", text.substring(0, 200));
  }

  // 3. Take screenshot
  const outputPath = path.join(__dirname, "public", "phone-mockup-screenshot.png");
  await page.screenshot({
    path: outputPath,
    fullPage: false,
  });
  console.log(`Screenshot saved to ${outputPath}`);

  await browser.close();
  console.log("Done!");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
