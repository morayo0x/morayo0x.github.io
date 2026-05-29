// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('writing', ({ data }) => !data.draft);

  const sorted = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Usman Kolawole — Writing',
    description: 'Essays, research notes, and reflections by Your Name.',
    site: context.site!,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },
    customData: `
      <language>en-us</language>
      <atom:link href="${new URL('rss.xml', context.site)}" rel="self" type="application/rss+xml" />
      <copyright>© ${new Date().getFullYear()} Usman Kolawole</copyright>
      <managingEditor>you@example.com (Usman Kolawole)</managingEditor>
    `,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/writing/${post.id.replace(/\.md$/, '')}/`,
      categories: [post.data.category, ...post.data.tags],
      customData: post.data.updatedDate
        ? `<updated>${post.data.updatedDate.toISOString()}</updated>`
        : '',
    })),
  });
}
