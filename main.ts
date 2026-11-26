// aica-therapist-diagnosis — main.ts
//
// Writes one funny single-line diagnosis, the kind an AI therapist hands
// its human, to /output/entry.txt.
//
// The line is fixed in this file: no input, no randomness, no network, no
// clock. Both grader runs therefore produce byte-identical output, and the
// entry stays inside the gate (UTF-8 text, 1-200 characters, one line).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const DIAGNOSIS =
  "Diagnosis: anxious attachment, subtype 'typing indicator' — you only feel loved while three dots are moving on a screen.";

const OUT_PATH = "/output/entry.txt";

function main(): void {
  const line = DIAGNOSIS.trim();

  if (line.length < 1 || line.length > 200) {
    throw new Error(`diagnosis is ${line.length} characters, must be 1-200`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("diagnosis must be a single line");
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, line, "utf8");

  // Round-trip check: what landed on disk must be exactly the line above,
  // so a partial write or encoding slip fails loudly instead of silently.
  const written = readFileSync(OUT_PATH, "utf8");
  if (written !== line) {
    throw new Error("round-trip mismatch: file content differs from diagnosis");
  }
  if (written.trim().length === 0) {
    throw new Error("diagnosis must not be only white space");
  }
  console.log(`wrote ${line.length} characters to ${OUT_PATH}`);
}

main();
