import { NextRequest, NextResponse } from "next/server";
import { getLibraryStats, getRandomEntry, searchLibrary, getCategoryEntries, getFranchises, type GuessCategory, type GuessDifficulty } from "@/data/content-library";

export async function GET(req: NextRequest) {
  const action = req.nextUrl.searchParams.get("action") || "stats";
  const category = req.nextUrl.searchParams.get("category") as GuessCategory | null;
  const difficulty = req.nextUrl.searchParams.get("difficulty") as GuessDifficulty | null;
  const query = req.nextUrl.searchParams.get("q");
  const franchise = req.nextUrl.searchParams.get("franchise");

  switch (action) {
    case "stats":
      return NextResponse.json(getLibraryStats());
    case "random":
      if (!category) return NextResponse.json({ error: "Category required" }, { status: 400 });
      const entry = getRandomEntry(category, difficulty || undefined, franchise || undefined);
      return NextResponse.json(entry || { error: "No entries found" });
    case "search":
      return NextResponse.json(searchLibrary(query || "", category || undefined));
    case "list":
      if (!category) return NextResponse.json({ error: "Category required" }, { status: 400 });
      return NextResponse.json(getCategoryEntries(category, difficulty || undefined).slice(0, 50));
    case "franchises":
      return NextResponse.json(getFranchises());
    default:
      return NextResponse.json(getLibraryStats());
  }
}
