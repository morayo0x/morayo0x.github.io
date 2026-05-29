# Personal Site

Personal website and writing platform built with Astro. Deployed to GitHub
Pages.

**Live site:** https://yourusername.github.io

---

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Create a new post
npm run new:post

# Build for production
npm run build

# Preview production build (includes search)
npm run preview
```

---

## Stack

| Layer     | Technology                           | Why                                     |
| --------- | ------------------------------------ | --------------------------------------- |
| Framework | Astro 6.x                            | Zero-JS by default, content collections |
| Styling   | Tailwind CSS + typography plugin     | Prose styling, dark mode                |
| Math      | KaTeX via remark-math + rehype-katex | Fast, self-hosted                       |
| Diagrams  | Mermaid (client island)              | Native markdown syntax                  |
| Syntax    | Shiki (built-in)                     | Dual light/dark themes                  |
| Hosting   | GitHub Pages                         | Free, git-native                        |
| CI/CD     | GitHub Actions                       | Auto-deploy on push                     |
| Analytics | Umami                                | Privacy-first, no cookies               |

---

## Project Structure

```
src/
├── components/
│   ├── layout/         # Header, Footer, BaseHead
│   ├── blog/           # PostCard, TagList, TableOfContents
│   ├── ui/             # Callout, Theorem, Figure
│   └── seo/            # JsonLd
├── content/
│   ├── config.ts       # Collection schemas (edit this for frontmatter changes)
│   ├── writing/
│   │   ├── reflections/   # Personal essays
│   │   └── projects/      # Build logs and project writeups (MDX)
├── layouts/
│   ├── BaseLayout.astro    # Wraps every page
│   ├── PostLayout.astro    # Individual writing posts
│   ├── ResearchLayout.astro # Extended research variant
│   └── WeeklyLayout.astro  # Weekly updates
├── pages/
│   ├── index.astro         # Home
│   ├── about.astro         # About
│   ├── search.astro        # Pagefind search
│   ├── rss.xml.ts          # RSS feed
│   ├── feed.json.ts        # JSON feed
│   ├── writing/
│   │   ├── index.astro     # Writing hub
│   │   ├── [...slug].astro # Individual post
│   │   ├── [category]/index.astro  # Category pages
│   │   └── tags/[tag]/index.astro  # Tag pages
├── styles/
│   └── global.css      # CSS variables, base styles, component classes
└── utils/
    ├── content.ts      # Collection helpers, date formatters
    └── remark-reading-time.mjs
```

---

## Writing Workflow

### Creating content

```bash
# Interactive — prompts for type and title
npm run new:post
```

This creates a draft with correct frontmatter in the right directory. Always
starts with `draft: true`.

### Publishing

1. Set `draft: false` in the frontmatter
2. `git add . && git commit -m "post: title of post"`
3. `git push`
4. GitHub Actions builds and deploys in ~45 seconds

### File naming conventions

```
# Writing posts
src/content/writing/{category}/YYYY-MM-slug.md
src/content/writing/{category}/YYYY-MM-slug.mdx   (if using components)

```

The date prefix ensures chronological file sorting in your editor.

---

## Frontmatter Reference

### Blog post (reflections)

```yaml
---
title: 'Post Title'
description: 'SEO description, 120–160 characters'
pubDate: 2025-01-15 # Required. YYYY-MM-DD
updatedDate: 2025-01-20 # Optional. Shows "Updated" note
category: reflections # reflections | projects
tags: [tag1, tag2] # Lowercase, hyphenated
draft: false # true = not built/deployed
featured: false # true = shown on home page
toc: false # Table of contents
math: false # Load KaTeX stylesheet
---
```

### Research article

```yaml
---
title: 'Research Title'
description: '...'
pubDate: 2025-01-20
category: research
tags: [machine-learning, transformers]
draft: false
toc: true
math: true # Required for LaTeX
authors: ['Your Name']
series: 'ML Fundamentals' # Groups posts into a series
seriesOrder: 1 # Position in series
doi: '10.xxxx/xxxxx' # Optional DOI link
arxiv: '2501.xxxxx' # Optional arXiv link
---
```

### Weekly update

```yaml
---
title: 'Week 3, 2025 — Theme'
weekNumber: 3
year: 2025
startDate: 2025-01-13
endDate: 2025-01-19
draft: false
mood: energized # energized | steady | tough | mixed
tags: []
highlights: # Short bullet points shown in archive list
  - 'Shipped X'
  - 'Finished reading Y'
---
```

---

## Math (KaTeX)

Set `math: true` in frontmatter — this loads the KaTeX stylesheet only on pages
that need it.

```md
Inline: $E = mc^2$

Block:

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

---

## MDX Components

Available in any `.mdx` file:

```mdx
import Callout from '@components/ui/Callout.astro';
import Theorem from '@components/ui/Theorem.astro';
import Figure from '@components/ui/Figure.astro';

<Callout type="note" title="Optional title">
  Content here
</Callout>
<Callout type="tip">Green tip box</Callout>
<Callout type="warning">Yellow warning</Callout>
<Callout type="danger">Red danger</Callout>

<Theorem type="theorem" number="1.2" title="Optional name">
  Statement of the theorem.
</Theorem>

<Theorem type="proof">The proof follows from...</Theorem>

<Figure src="/images/chart.png" alt="Chart" caption="Figure 1: Description" />
```

---

## Diagrams (Mermaid)

In `.mdx` files, use the inline script approach:

```mdx
<div class="mermaid">
graph TD
  A[Write] --> B[Draft]
  B --> C{Review}
  C -->|Good| D[Publish]
  C -->|Needs work| B
</div>

<script>
  import('https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.esm.min.mjs')
    .then(m => m.default.initialize({ startOnLoad: true, theme: 'neutral' }));
</script>
```

Or add a dedicated `MermaidDiagram.astro` component with `client:visible` for
lazy loading.

---

## Search (Pagefind)

Pagefind is built automatically as part of `npm run build` (via the `postbuild`
script).

**In development:** Search shows a "run build first" message — this is expected.
Run:

```bash
npm run build && npm run preview
```

**Customising** what gets indexed: add `data-pagefind-ignore` to elements you
want excluded, or `data-pagefind-body` to restrict indexing to a specific
element.

---

## Dark Mode

Dark mode uses the `.dark` class on `<html>`. The theme is:

1. Detected from `localStorage` on page load (anti-FOUC inline script in
   `BaseHead.astro`)
2. Falls back to `prefers-color-scheme`
3. Toggled by the sun/moon button in the header

To add dark variants to custom CSS, use `.dark` prefix:

```css
.my-element {
  background: white;
}
.dark .my-element {
  background: #111;
}
```

---

## Analytics (Umami)

1. Set up Umami: self-host at [umami.is](https://umami.is) or use
   [Umami Cloud](https://cloud.umami.is)
2. Create a website in your Umami dashboard
3. Copy the website ID
4. Edit `src/components/layout/BaseHead.astro`:
   ```astro
   const UMAMI_SCRIPT = 'https://your-umami-instance.com/script.js'; const
   UMAMI_WEBSITE_ID = 'your-website-id-here';
   ```
5. Analytics only loads in production (`import.meta.env.PROD`)

---

## Deployment (GitHub Pages)

### Initial setup

1. Create a GitHub repository
2. Push this code to `main`
3. Go to **Settings → Pages**
4. Set **Source** to `GitHub Actions`
5. Done — next push to `main` auto-deploys

### URL configuration

Edit `astro.config.mjs`:

```js
// Option A: username.github.io (user/org pages)
site: 'https://yourusername.github.io',
base: '/',

// Option B: username.github.io/repo-name (project pages)
site: 'https://yourusername.github.io',
base: '/repo-name/',

// Option C: custom domain
site: 'https://yourname.com',
base: '/',
```

Also update `public/robots.txt` with your sitemap URL.

### Custom domain

1. Add a `CNAME` file to `public/` containing your domain:
   ```
   yourname.com
   ```
2. Configure DNS at your registrar (A records to GitHub's IPs or CNAME)
3. Enable HTTPS in **Settings → Pages**

---

## Feeds

| Format    | URL                  | Use               |
| --------- | -------------------- | ----------------- |
| RSS 2.0   | `/rss.xml`           | Most feed readers |
| JSON Feed | `/feed.json`         | Modern apps       |
| Sitemap   | `/sitemap-index.xml` | Search engines    |

---

## Adding New Features

### New content category

1. Add to the enum in `src/content/config.ts`:
   ```ts
   category: z.enum(['reflections', 'research', 'projects', 'notes']),
   ```
2. Create directory: `src/content/writing/notes/`
3. Add to category nav in `src/pages/writing/index.astro`
4. Add CSS for `category-badge` in `src/styles/global.css`

### New MDX component

1. Create `src/components/ui/MyComponent.astro`
2. Import in any `.mdx` file:
   ```mdx
   import MyComponent from '@components/ui/MyComponent.astro';
   ```

### New collection

1. Define schema in `src/content/config.ts`
2. Create `src/content/yourcollection/` directory
3. Add pages in `src/pages/yourcollection/`

---

## Performance Notes

- **Zero JS by default** — Astro ships no JS unless you use `client:*`
  directives
- **Image optimization** — use Astro's `<Image>` component for local images
- **KaTeX** — only loaded on posts with `math: true`
- **Pagefind** — lazy loaded, only when search page is visited
- **Fonts** — currently via Google Fonts; self-host with `@fontsource` for
  better performance:
  ```bash
  npm install @fontsource/lora @fontsource/dm-sans @fontsource/playfair-display @fontsource/jetbrains-mono
  ```
  Then in `global.css`, replace the `@import url(...)` with:
  ```css
  @import '@fontsource/lora/400.css';
  @import '@fontsource/lora/700.css';
  @import '@fontsource/lora/400-italic.css';
  /* etc. */
  ```

---

## VSCode Setup

Recommended extensions (`.vscode/extensions.json`):

```json
{
  "recommendations": [
    "astro-build.astro-vscode",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "unifiedjs.vscode-mdx",
    "yzhang.markdown-all-in-one",
    "streetsidesoftware.code-spell-checker",
    "GitHub.copilot"
  ]
}
```

---

## Troubleshooting

**Search returns no results in dev mode** Expected. Run
`npm run build && npm run preview` to test search.

**Dark mode flashes on load** The anti-FOUC script in `BaseHead.astro` reads
`localStorage` before first paint. If you're seeing flash, check that
`BaseHead.astro` is loaded before any stylesheets.

**Build fails with type errors** Run `npx astro check` to see all TypeScript
errors across `.astro` files.

**KaTeX not rendering** Ensure `math: true` is in frontmatter and you're using
either `$...$` (inline) or `$$...$$` (block) syntax.

**GitHub Pages shows old content** Check the Actions tab — the deployment may
still be running. GitHub Pages can take 1–2 minutes to propagate.

---

## Roadmap

- [ ] Self-hosted fonts (`@fontsource`)
- [ ] Generated OG images (Satori)
- [ ] Mermaid component with theme sync
- [ ] Backlinks / wiki-style linking
- [ ] Series navigation component
- [ ] Giscus comments (optional)
- [ ] Reading list / bookmarks section
- [ ] Search across weekly updates
