// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ─── Writing Collection ────────────────────────────────────────────────────
const writingCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['reflections', 'projects']),
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    seriesOrder: z.number().int().positive().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    coverImage: z.string().optional(),
    coverAlt: z.string().optional(),
    math: z.boolean().default(false),
    toc: z.boolean().default(true),
    // Research-specific
    // authors: z.array(z.string()).optional(),
    // doi: z.string().optional(),
    // arxiv: z.string().optional(),
    // SEO overrides
    canonicalURL: z.string().url().optional(),
    ogImage: z.string().optional(),
    // Reading time injected by remark plugin
    minutesRead: z.string().optional(),
  }),
});

export const collections = {
  writing: writingCollection,
};
