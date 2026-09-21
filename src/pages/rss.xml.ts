import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getByDate } from '@utils/field';

export async function GET(context: APIContext) {
  const posts = await getByDate();

  return rss({
    title: 'Morayo — Writing',
    description: 'Writing placed on a field, between the human scale and the cosmic one.',
    site: context.site!,
    customData: `
      <language>en</language>
      <copyright>© ${new Date().getFullYear()} Morayo</copyright>
    `,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/writing/${post.id}/`,
    })),
  });
}
