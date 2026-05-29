// src/utils/seo.ts
// SEO helper utilities — OG image generation, structured data, canonical URLs

import type { CollectionEntry } from 'astro:content';

/** Clamp description to SEO-safe length */
export function seoDescription(text: string, maxLen = 160): string {
  if (text.length <= maxLen) return text;
  const truncated = text.slice(0, maxLen - 3).trimEnd();
  // Don't cut mid-word
  const lastSpace = truncated.lastIndexOf(' ');
  return truncated.slice(0, lastSpace) + '…';
}

/** Build canonical URL string from site + path */
export function canonicalUrl(site: URL, pathname: string): string {
  return new URL(pathname, site).toString();
}

/** Generate article structured data (schema.org) */
export function articleSchema(post: CollectionEntry<'writing'>, site: URL, ogImage: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.data.title,
    description: post.data.description,
    image: ogImage,
    datePublished: post.data.pubDate.toISOString(),
    dateModified: (post.data.updatedDate ?? post.data.pubDate).toISOString(),

    publisher: {
      '@type': 'Person',
      name: 'Usman Kolawole',
      url: site.toString(),
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl(site, `/writing/${post.id.replace(/\.md$/, '')}/`),
    },
    keywords: post.data.tags.join(', '),
    articleSection: post.data.category,
  };
}

/** Breadcrumb structured data for writing posts */
export function breadcrumbSchema(site: URL, crumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: new URL(crumb.url, site).toString(),
    })),
  };
}
