// Entry program for the make.fun bounty "Promote make.fun's make-your-own-bounty
// post on X".
//
// The entry itself is the post on X: one post of the entrant's own that quotes
// make.fun's make-your-own-bounty post, carries a photo of its own, and names
// make.fun, @makefunai and the entrant's play code in its text. This program
// only hands the post's address to the grader: it reads POST.json from the
// repository root and writes the exact same bytes to the output directory,
// where the house reads the post and scores its replies, reposts and quotes.
// Nothing this program writes about the post is scored.
//
// Run it locally the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand
// in for /bot and /output. Nothing is printed on success.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(botDir, 'POST.json');
const target = join(outputDir, 'POST.json');

try {
  mkdirSync(outputDir, { recursive: true });
  const bytes = readFileSync(source);
  writeFileSync(target, bytes);
} catch (error) {
  console.error(`Could not copy ${source} to ${target}: ${(error as Error).message}`);
  process.exit(1);
}
