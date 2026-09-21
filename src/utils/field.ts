// src/utils/field.ts
import { getCollection, type CollectionEntry } from 'astro:content';

export type Letter = CollectionEntry<'writing'>;
export type Thread = CollectionEntry<'threads'>;

/** Every published piece, oldest first — the order a thread reads in. */
export async function getAllWriting(): Promise<Letter[]> {
  const posts = await getCollection('writing', ({ data }) => !data.draft);
  return posts.sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf());
}

/** Newest first, for the dated list and the "most recent" strip. */
export async function getByDate(): Promise<Letter[]> {
  return (await getAllWriting()).reverse();
}

export interface ThreadWithPosts {
  thread: Thread;
  posts: Letter[];
}

/**
 * Threads that actually have pieces in them, crossing thread first.
 * A thread with nothing in it is a note to self, not a thread.
 */
export async function getThreads(): Promise<ThreadWithPosts[]> {
  const [threads, posts] = await Promise.all([getCollection('threads'), getAllWriting()]);

  return threads
    .map((thread) => ({
      thread,
      posts: posts.filter((p) => p.data.thread === thread.id),
    }))
    .filter(({ posts }) => posts.length > 0)
    .sort((a, b) => {
      if (a.thread.data.crossing !== b.thread.data.crossing) {
        return a.thread.data.crossing ? -1 : 1;
      }
      return b.posts.length - a.posts.length;
    });
}

export async function getThread(id: string): Promise<ThreadWithPosts | undefined> {
  return (await getThreads()).find(({ thread }) => thread.id === id);
}

/** Pieces belonging to no thread. */
export async function getLoose(): Promise<Letter[]> {
  const [threads, posts] = await Promise.all([getCollection('threads'), getAllWriting()]);
  const ids = new Set(threads.map((t) => t.id));
  return posts.filter((p) => !p.data.thread || !ids.has(p.data.thread));
}

// ─── Geometry ──────────────────────────────────────────────────────────────

export interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** Field coordinates (0–1) to SVG coordinates inside a plot box. */
export function project(x: number, y: number, box: Box): { cx: number; cy: number } {
  return {
    cx: box.left + x * box.width,
    cy: box.top + y * box.height,
  };
}

/**
 * A quadratic path through a thread's points, in publication order.
 * Control points sit between consecutive pairs, which keeps the arc
 * readable without it wandering away from the pieces it connects.
 */
export function threadPath(points: { cx: number; cy: number }[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return '';
  if (points.length === 2) {
    return `M${points[0].cx},${points[0].cy} L${points[1].cx},${points[1].cy}`;
  }

  let d = `M${points[0].cx},${points[0].cy}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const ctrlX = prev.cx + (curr.cx - prev.cx) * 0.55;
    const ctrlY = prev.cy + (curr.cy - prev.cy) * 0.3;
    d += ` Q${ctrlX.toFixed(1)},${ctrlY.toFixed(1)} ${curr.cx},${curr.cy}`;
  }
  return d;
}

/** Euclidean neighbours on the field — a different relation from same-thread. */
export function nearest(post: Letter, all: Letter[], limit = 2): Letter[] {
  return all
    .filter((p) => p.id !== post.id)
    .map((p) => ({
      post: p,
      d: Math.hypot(p.data.x - post.data.x, p.data.y - post.data.y),
    }))
    .sort((a, b) => a.d - b.d)
    .slice(0, limit)
    .map(({ post }) => post);
}

/** Where a piece sits, in words, for the line under the locator map. */
export function describePosition(x: number, y: number): string {
  const across = x < 0.34 ? 'Human scale' : x > 0.66 ? 'Cosmic scale' : 'Between the two scales';
  const down = y < 0.34 ? 'largely unchecked' : y > 0.66 ? 'and grounded' : 'and half-checked';
  return `${across}, ${down}.`;
}

// ─── Dates ─────────────────────────────────────────────────────────────────

/** 2026.03.04 — the register the rest of the site is set in. */
export function stamp(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

export function stampMonth(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${y}.${m}`;
}

export function longDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function postUrl(post: Letter): string {
  return `/writing/${post.id}/`;
}
