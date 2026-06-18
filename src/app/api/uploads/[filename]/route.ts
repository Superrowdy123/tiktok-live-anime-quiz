import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    
    // Sanitize filename to prevent directory traversal
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "");
    if (!safeName || safeName.includes("..")) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }

    const filePath = join(process.cwd(), "public", "uploads", safeName);
    const fileBuffer = await readFile(filePath);

    // Determine content type
    const ext = safeName.split(".").pop()?.toLowerCase();
    const contentTypes: Record<string, string> = {
      jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png",
      gif: "image/gif", webp: "image/webp", svg: "image/svg+xml",
    };
    const contentType = contentTypes[ext || ""] || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
