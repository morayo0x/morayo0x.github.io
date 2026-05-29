// src/utils/content.ts
import { getCollection, type CollectionEntry } from 'astro:content';

export type WritingEntry = CollectionEntry<'writing'>;

// ─── Writing Helpers ───────────────────────────────────────────────────────

/** All published writing posts, sorted newest first */
export async function getAllWriting(): Promise<WritingEntry[]> {
  const posts = await getCollection('writing', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Posts filtered by category */
export async function getWritingByCategory(
  category: 'reflections' | 'projects'
): Promise<WritingEntry[]> {
  const all = await getAllWriting();
  return all.filter((p) => p.data.category === category);
}

/** Featured posts */
export async function getFeaturedWriting(limit = 3): Promise<WritingEntry[]> {
  const all = await getAllWriting();
  return all.filter((p) => p.data.featured).slice(0, limit);
}

/** Recent posts */
export async function getRecentWriting(limit = 5): Promise<WritingEntry[]> {
  const all = await getAllWriting();
  return all.slice(0, limit);
}

/** Posts in a series, sorted by order */
export async function getSeries(seriesName: string): Promise<WritingEntry[]> {
  const all = await getAllWriting();
  return all
    .filter((p) => p.data.series === seriesName)
    .sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0));
}

/** All unique tags across writing */
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const all = await getAllWriting();
  const tagMap = new Map<string, number>();
  for (const post of all) {
    for (const tag of post.data.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    }
  }
  return [...tagMap.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/** Posts by tag */
export async function getWritingByTag(tag: string): Promise<WritingEntry[]> {
  const all = await getAllWriting();
  return all.filter((p) => p.data.tags.includes(tag));
}

/** Related posts — same category + overlapping tags, excluding self */
export async function getRelatedPosts(current: WritingEntry, limit = 3): Promise<WritingEntry[]> {
  const all = await getAllWriting();
  const others = all.filter((p) => p.id !== current.id);
  const scored = others.map((post) => {
    let score = 0;
    if (post.data.category === current.data.category) score += 3;
    if (post.data.series && post.data.series === current.data.series) score += 5;
    for (const tag of current.data.tags) {
      if (post.data.tags.includes(tag)) score += 1;
    }
    return { post, score };
  });

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}

// ─── Date Helpers ──────────────────────────────────────────────────────────

export function formatDate(date: Date, style: 'long' | 'short' | 'iso' = 'long'): string {
  if (style === 'iso') return date.toISOString().split('T')[0];
  if (style === 'short') {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function getYear(date: Date): number {
  return date.getFullYear();
}

/** Group posts by year */
export function groupByYear(posts: WritingEntry[]): Map<number, WritingEntry[]> {
  const map = new Map<number, WritingEntry[]>();
  for (const post of posts) {
    const year = getYear(post.data.pubDate);
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(post);
  }
  return map;
}

// ─── SEO Helpers ───────────────────────────────────────────────────────────

export function getPostUrl(post: WritingEntry, site: URL): string {
  return new URL(`/writing/${post.id.replace(/\.md$/, '')}/`, site).toString();
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length - 3) + '...';
}
