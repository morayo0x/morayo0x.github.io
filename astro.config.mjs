import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { remarkReadingTime } from './src/utils/remark-reading-time.mjs';

const rehypePlugins = [
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      behavior: 'wrap',
      properties: {
        className: ['anchor-link'],
        ariaLabel: 'Link to section',
      },
    },
  ],

  [
    rehypeKatex,
    {
      trust: true,
      strict: false,
    },
  ],
];

// const remarkPlugins = [remarkMath, remarkReadingTime];
const remarkPlugins = [remarkMath, remarkReadingTime];

export default defineConfig({
  // ─── Deployment ───────────────────────────────────────────────────────────
  site: 'https://morayo0x.github.io',

  // If deploying to https://USERNAME.github.io/REPO-NAME/, set base: '/REPO-NAME/'
  // If using a custom domain or user/org pages root, keep base: '/'
  base: '/',

  vite: {
    plugins: [tailwindcss()],
  },

  output: 'static',

  // ─── Integrations ─────────────────────────────────────────────────────────

  integrations: [
    mdx({
      // MDX inherits markdown config below
      // optimize: true,
      optimize: false,
      remarkPlugins,
      rehypePlugins,
      remarkRehype: { allowDangerousHtml: true },
    }),
    sitemap({
      filter: (page) => !page.includes('/drafts/'),
    }),
  ],

  // ─── Markdown ─────────────────────────────────────────────────────────────

  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
      transformers: [],
    },
    remarkPlugins,
    rehypePlugins,
    remarkRehype: { allowDangerousHtml: true },
  },
  // Allow HTML in markdown (for callouts etc.)

  // ─── Build ────────────────────────────────────────────────────────────────

  build: {
    // Inline small assets for performance
    inlineStylesheets: 'auto',
  },

  // ─── Dev Server ───────────────────────────────────────────────────────────

  server: {
    port: 4321,
    host: true,
  },
  // ─── Image Optimization ───────────────────────────────────────────────────
  image: {
    remotePatterns: [{ protocol: 'https' }],
  },
});

// import { defineConfig } from 'astro/config';
// import tailwindcss from '@tailwindcss/vite';
// import mdx from '@astrojs/mdx';
// import sitemap from '@astrojs/sitemap';
// import remarkMath from 'remark-math';
// import rehypeKatex from 'rehype-katex';
// import rehypeSlug from 'rehype-slug';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// import { remarkReadingTime } from './src/utils/remark-reading-time.mjs';

// const rehypePlugins = [
//   rehypeSlug,
//   [
//     rehypeAutolinkHeadings,
//     {
//       behavior: 'wrap',
//       properties: {
//         className: ['anchor-link'],
//         ariaLabel: 'Link to section',
//       },
//     },
//   ],
//   [
//     rehypeKatex,
//     {
//       trust: true,
//       strict: false,
//     },
//   ],
// ];

// // const remarkPlugins = [remarkMath, remarkReadingTime];
// const remarkPlugins = [remarkMath, remarkReadingTime];

// export default defineConfig({
//   // ─── Deployment ───────────────────────────────────────────────────────────
//   // Change to your GitHub Pages URL: https://USERNAME.github.io
//   // Or your custom domain: https://yourname.com
//   site: 'https://yourusername.github.io',

//   // If deploying to https://USERNAME.github.io/REPO-NAME/, set base: '/REPO-NAME/'
//   // If using a custom domain or user/org pages root, keep base: '/'
//   base: '/',

//   vite: {
//     plugins: [tailwindcss()],
//   },

//   output: 'static',

//   // ─── Integrations ─────────────────────────────────────────────────────────

//   integrations: [
//     mdx({
//       // MDX inherits markdown config below
//       // optimize: true,
//       optimize: false,
//       remarkPlugins,
//       rehypePlugins,
//       remarkRehype: { allowDangerousHtml: true },
//     }),
//     sitemap({
//       filter: (page) => !page.includes('/drafts/'),
//     }),
//   ],

//   // ─── Markdown ─────────────────────────────────────────────────────────────

//   markdown: {
//     shikiConfig: {
//       themes: {
//         light: 'github-light',
//         dark: 'github-dark',
//       },
//       wrap: true,
//       transformers: [],
//     },
//     remarkPlugins,
//     rehypePlugins,
//     remarkRehype: { allowDangerousHtml: true },
//   },
//   // Allow HTML in markdown (for callouts etc.)

//   // ─── Build ────────────────────────────────────────────────────────────────

//   build: {
//     // Inline small assets for performance
//     inlineStylesheets: 'auto',
//   },

//   // ─── Dev Server ───────────────────────────────────────────────────────────

//   server: {
//     port: 4321,
//     host: true,
//   },
//   // ─── Image Optimization ───────────────────────────────────────────────────
//   image: {
//     remotePatterns: [{ protocol: 'https' }],
//   },
// });
