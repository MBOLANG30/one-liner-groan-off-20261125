// The One-Liner Groan-Off — make.fun entry
// Writes one original one-line dad joke (max 140 characters) to
// /output/entry.txt for the judge to read.
//
// The joke was picked by candidate selection in the build session:
// ten original one-liners were written, then ranked head-to-head by a
// free review model on the competition's own criteria (dad-joke landing,
// punchline speed, freshness, tightness, groan quality). This line won.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The winning one-liner — 49 characters, one line, no trailing newline
// inside the text itself (the file holds exactly this string).
const JOKE = "My dad bod isn't a dad bod. It's a father figure.";

// The gate refuses anything that is not 1–140 characters of non-blank
// text on a single line, so refuse to write an invalid joke rather than
// silently shipping one that can never be judged.
if (JOKE.length < 1 || JOKE.length > 140 || JOKE.trim().length === 0) {
  throw new Error(`Joke is ${JOKE.length} characters; the gate needs 1–140.`);
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("Joke must be a single line.");
}

// The grader mounts the output directory at /output. OUTPUT_DIR exists
// only so the same program can be exercised locally against a scratch
// directory; in the grading sandbox it is unset and /output is used.
const outDir = process.env.OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, JOKE, "utf8");

console.log(`Wrote ${JOKE.length} characters to ${outPath}`);
