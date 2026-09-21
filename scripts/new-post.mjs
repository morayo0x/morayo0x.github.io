#!/usr/bin/env node
// scripts/new-post.mjs
// Usage: npm run new:post
// Scaffolds a piece with the frontmatter the field needs.

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// readline delivers buffered lines faster than sequential awaits can register
// their callbacks, so piped input would otherwise stall partway through.
// Queue the lines instead and hand them out as they are asked for.
const pending = [];
const waiting = [];
let ended = false;

rl.on('line', (line) => {
  const resolve = waiting.shift();
  if (resolve) resolve(line);
  else pending.push(line);
});

rl.on('close', () => {
  ended = true;
  while (waiting.length) waiting.shift()(null);
});

/** Resolves to the next line, or null once input is exhausted. */
function ask(question) {
  process.stdout.write(question);
  if (pending.length) return Promise.resolve(pending.shift());
  if (ended) return Promise.resolve(null);
  return new Promise((resolve) => waiting.push(resolve));
}

const WRITING_DIR = path.join(process.cwd(), 'src/content/writing');
const THREADS_DIR = path.join(process.cwd(), 'src/content/threads');

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function today() {
  return new Date().toISOString().split('T')[0];
}

function listThreads() {
  if (!fs.existsSync(THREADS_DIR)) return [];
  return fs
    .readdirSync(THREADS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

/** Reads a number in 0–1, re-asking until it gets one. */
async function askCoord(label, hint) {
  for (;;) {
    const raw = await ask(`${label} ${hint}: `);
    if (raw === null) return null;
    const n = Number(raw.trim());
    if (raw.trim() !== '' && Number.isFinite(n) && n >= 0 && n <= 1) return n;
    console.log('  Needs a number between 0 and 1.');
  }
}

async function main() {
  console.log('\nNew piece\n');

  const title = (await ask('Title: '))?.trim() ?? '';
  if (!title) {
    console.error('A title is required.');
    rl.close();
    process.exitCode = 1;
    return;
  }

  const description = (await ask('One line: '))?.trim() ?? '';

  console.log('\nPosition on the field. Both are judgement calls.');
  const x = await askCoord('  x', '(0 = human scale, 1 = cosmic scale)');
  const y = await askCoord('  y', '(0 = raw intuition, 1 = grounded)');

  if (x === null || y === null) {
    console.error('\nBoth coordinates are required.');
    rl.close();
    process.exitCode = 1;
    return;
  }

  const threads = listThreads();
  let thread = '';
  if (threads.length > 0) {
    console.log(`\nThreads: ${threads.join(', ')}`);
    const answer = (await ask('Thread (blank for none): '))?.trim() ?? '';
    if (answer && !threads.includes(answer)) {
      console.log(`  No thread called "${answer}". Leaving it unthreaded.`);
    } else {
      thread = answer;
    }
  }

  const slug = slugify(title);
  const filepath = path.join(WRITING_DIR, `${slug}.md`);

  if (fs.existsSync(filepath)) {
    console.log(`\nAlready exists: src/content/writing/${slug}.md`);
    rl.close();
    return;
  }

  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `description: "${description.replace(/"/g, '\\"')}"`,
    `pubDate: ${today()}`,
    'draft: true',
    'math: false',
    `x: ${x}`,
    `y: ${y}`,
    ...(thread ? [`thread: ${thread}`] : []),
    '---',
    '',
    '',
  ].join('\n');

  fs.mkdirSync(WRITING_DIR, { recursive: true });
  fs.writeFileSync(filepath, frontmatter);

  console.log(`\nCreated: src/content/writing/${slug}.md`);
  console.log(`URL:     /writing/${slug}/`);
  console.log('\nSet draft: false when it is ready.\n');
  rl.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
