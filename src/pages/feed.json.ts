// src/pages/feed.json.ts
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('writing', ({ data }) => !data.draft);
  const site = context.site!.toString();

  const sorted = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Usman Kolawole — Writing',
    home_page_url: site,
    feed_url: `${site}feed.json`,
    description: 'Essays, research notes, and reflections by Your Name.',
    icon: `${site}favicon.svg`,
    authors: [{ name: 'Usman Kolawole', url: site }],
    language: 'en-US',
    items: sorted.map((post) => ({
      id: `${site}writing/${post.id.replace(/\.md$/, '')}/`,
      url: `${site}writing/${post.id.replace(/\.md$/, '')}/`,
      title: post.data.title,
      summary: post.data.description,
      date_published: post.data.pubDate.toISOString(),
      date_modified: (post.data.updatedDate ?? post.data.pubDate).toISOString(),
      authors: [{ name: post.data.authors?.join(', ') ?? 'Your Name' }],
      tags: [post.data.category, ...post.data.tags],
    })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
