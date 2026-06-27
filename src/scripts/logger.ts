import * as fs from "fs";
import * as path from "path";

const LOGS_DIR = path.resolve(process.cwd(), "logs");

const streams: Record<string, fs.WriteStream> = {};

function getStream(filename: string): fs.WriteStream {
  if (!streams[filename]) {
    const fp = path.join(LOGS_DIR, filename);
    streams[filename] = fs.createWriteStream(fp, { flags: "a" });
  }
  return streams[filename];
}

function log(filename: string, message: string) {
  const ts = new Date().toISOString();
  const line = `[${ts}] ${message}\n`;
  getStream(filename).write(line);
  if (filename === "errors.log") {
    console.error(line.trim());
  }
}

export const logger = {
  questionsCreated(msg: string) { log("questions_created.log", msg); },
  duplicates(msg: string) { log("duplicates.log", msg); },
  validation(msg: string) { log("validation.log", msg); },
  error(msg: string) { log("errors.log", msg); },
  missingImages(msg: string) { log("missing_images.log", msg); },
  summary(msg: string) { log("summary.log", msg); },
  closeAll() {
    for (const s of Object.values(streams)) { s.end(); }
  },
};
