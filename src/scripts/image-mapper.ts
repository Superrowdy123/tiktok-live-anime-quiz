import * as fs from "fs";
import * as path from "path";

const SEARCH_DIRS = [
  path.resolve(process.cwd(), "public", "uploads"),
  path.resolve(process.cwd(), "public", "images"),
  path.resolve(process.cwd(), "public", "characters"),
  path.resolve(process.cwd(), "public", "anime"),
  path.resolve(process.cwd(), "assets"),
];

export function mapImageForCharacter(characterName: string): string | null {
  const normalized = characterName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .replace(/\s+/g, "");

  for (const dir of SEARCH_DIRS) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const base = path.parse(file).name.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (base.includes(normalized) || normalized.includes(base)) {
        return `/uploads/${file}`;
      }
    }
  }
  return null;
}

export function mapImageForAnime(animeName: string): string | null {
  const normalized = animeName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .replace(/\s+/g, "");

  for (const dir of SEARCH_DIRS) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const base = path.parse(file).name.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (base.includes(normalized) || normalized.includes(base)) {
        return `/uploads/${file}`;
      }
    }
  }
  return null;
}

export function scanAvailableImages(): Map<string, string> {
  const result = new Map<string, string>();
  for (const dir of SEARCH_DIRS) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const base = path.parse(file).name.toLowerCase().replace(/[^a-z0-9]/g, "");
      result.set(base, `/uploads/${file}`);
    }
  }
  return result;
}
