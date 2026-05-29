#!/usr/bin/env node
// scripts/new-post.mjs
// Usage: npm run new:post
// Creates a new draft post with correct frontmatter in the right directory.

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(res => rl.question(q, res));

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

function weekInfo() {
  const now = new Date();
  const year = now.getFullYear();
  const start = new Date(year, 0, 1);
  const week = Math.ceil(((now - start) / 86400000 + start.getDay() + 1) / 7);
  return { year, week: String(week).padStart(2, '0') };
}

// ─── Templates ───────────────────────────────────────────────────────────
const templates = {
  reflections: (title, slug) => `---
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

  research: (title, slug) => `---
title: "${title}"
description: ""
pubDate: ${today()}
category: research
tags: []
draft: true
featured: false
toc: true
math: true
authors: ["Your Name"]
series: ""
seriesOrder: 1
---

import Callout from '@components/ui/Callout.astro';
import Theorem from '@components/ui/Theorem.astro';

## Introduction

## Background

## Main Content

## Conclusion

## References
`,

  projects: (title, slug) => `---
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

  weekly: (year, week) => `---
title: "Week ${week}, ${year} — "
weekNumber: ${parseInt(week)}
year: ${year}
startDate: ${today()}
endDate: ${today()}
draft: true
mood: steady
tags: []
highlights: []
---

## Accomplishments

## What I'm Learning

## Experiments

## Struggles

## Upcoming

## Links
`,
};

// ─── Main ─────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n📝 New post generator\n');

  const type = await ask('Type? (reflections/research/projects/weekly): ');
  const validTypes = ['reflections', 'research', 'projects', 'weekly'];

  if (!validTypes.includes(type)) {
    console.error(`Invalid type. Choose from: ${validTypes.join(', ')}`);
    process.exit(1);
  }

  if (type === 'weekly') {
    const { year, week } = weekInfo();
    const filename = `${year}-W${week}.md`;
    const dir = path.join(process.cwd(), 'src/content/weekly');
    const filepath = path.join(dir, filename);

    if (fs.existsSync(filepath)) {
      console.log(`⚠️  Already exists: src/content/weekly/${filename}`);
      rl.close();
      return;
    }

    fs.writeFileSync(filepath, templates.weekly(year, week));
    console.log(`\n✅ Created: src/content/weekly/${filename}`);
  } else {
    const title = await ask('Title: ');
    const datePrefix = today();
    const slug = slugify(title);
    const ext = type === 'research' || type === 'projects' ? '.mdx' : '.md';
    const filename = `${datePrefix}-${slug}${ext}`;
    const dir = path.join(process.cwd(), `src/content/writing/${type}`);
    const filepath = path.join(dir, filename);

    if (fs.existsSync(filepath)) {
      console.log(`⚠️  Already exists: src/content/writing/${type}/${filename}`);
      rl.close();
      return;
    }

    fs.writeFileSync(filepath, templates[type](title, slug));
    console.log(`\n✅ Created: src/content/writing/${type}/${filename}`);
    console.log(`   Slug: /writing/${type}/${datePrefix}-${slug}/`);
  }

  console.log('\nRemember to set draft: false when ready to publish.\n');
  rl.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
