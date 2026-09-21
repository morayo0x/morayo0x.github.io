#!/usr/bin/env node
// scripts/new-post.mjs
// Usage: npm run new:post
// Creates a new draft post with correct frontmatter in the right directory.

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

// ─── Slugify ──────────────────────────────────────────────────────────────
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ─── Date ────────────────────────────────────────────────────────────────
function today() {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

// ─── Templates ───────────────────────────────────────────────────────────
// These must stay in step with the schema in src/content.config.ts.
const templates = {
  reflections: (title) => `---
title: "${title}"
description: ""
pubDate: ${today()}
category: reflections
tags: []
draft: true
featured: false
toc: false
math: false
---

<!-- Write your reflection here -->
`,

  projects: (title) => `---
title: "${title}"
description: ""
pubDate: ${today()}
category: projects
tags: []
draft: true
featured: false
toc: true
math: false
---

import Callout from '@components/ui/Callout.astro';

## Overview

## Motivation

## Implementation

## Results

## What I'd Do Differently
`,
};

const VALID_TYPES = Object.keys(templates);

// ─── Main ─────────────────────────────────────────────────────────────────
async function main() {
  console.log('\nNew post\n');

  const type = (await ask(`Type? (${VALID_TYPES.join('/')}): `)).trim();

  if (!VALID_TYPES.includes(type)) {
    console.error(`Invalid type. Choose from: ${VALID_TYPES.join(', ')}`);
    rl.close();
    process.exitCode = 1;
    return;
  }

  const title = (await ask('Title: ')).trim();

  if (!title) {
    console.error('A title is required.');
    rl.close();
    process.exitCode = 1;
    return;
  }

  const datePrefix = today();
  const slug = slugify(title);
  const ext = type === 'projects' ? '.mdx' : '.md';
  const filename = `${datePrefix}-${slug}${ext}`;
  const relDir = `src/content/writing/${type}`;
  const dir = path.join(process.cwd(), relDir);
  const filepath = path.join(dir, filename);

  if (fs.existsSync(filepath)) {
    console.log(`Already exists: ${relDir}/${filename}`);
    rl.close();
    return;
  }

  // The collection directory is not guaranteed to exist yet.
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filepath, templates[type](title));

  console.log(`\nCreated: ${relDir}/${filename}`);
  console.log(`URL:     /writing/${type}/${datePrefix}-${slug}/`);
  console.log('\nSet draft: false when it is ready to publish.\n');
  rl.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
