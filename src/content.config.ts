// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ─── Writing ───────────────────────────────────────────────────────────────
// Every piece carries a position on the field:
//
//   x  0 = human scale        → 1 = cosmic scale
//   y  0 = raw intuition      → 1 = grounded
//
// Both are judged by feel when the piece is written. There is no way to
// derive them, and pretending otherwise would make the field meaningless.
const writingCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    math: z.boolean().default(false),

    // Position on the field.
    x: z.number().min(0).max(1),
    y: z.number().min(0).max(1),

    // Slug of a thread in the threads collection, when it belongs to one.
    thread: z.string().optional(),

    // SEO overrides
    canonicalURL: z.string().url().optional(),
    ogImage: z.string().optional(),

    // Reading time injected by the remark plugin
    minutesRead: z.string().optional(),
  }),
});

// ─── Threads ───────────────────────────────────────────────────────────────
// A thread is a question returned to more than once. The markdown body is the
// paragraph that opens the thread's page; `open` is the piece not yet written.
const threadsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/threads' }),
  schema: z.object({
    title: z.string(),
    question: z.string(),
    open: z.string().optional(),
    // Only one thread should be accented; it is the one that crosses the field.
    crossing: z.boolean().default(false),
  }),
});

export const collections = {
  writing: writingCollection,
  threads: threadsCollection,
};
