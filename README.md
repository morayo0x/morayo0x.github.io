# The Field

Personal site, built with Astro and deployed to GitHub Pages.

The home page is a plot, not a list. Every piece carries a position:

- `x` — 0 is the human scale, 1 is the cosmic scale
- `y` — 0 is raw intuition, 1 is grounded
- `thread` — the slug of a thread in `src/content/threads/`, when it belongs to
  one

Both numbers are judged by feel when the piece is written; there is no way to
derive them. A **thread** is a question returned to more than once — it gets its
own page, and may say out loud that it is unfinished.

```
src/content/writing/   one file per piece
src/content/threads/   one file per thread; body is the thread's opening paragraph
```

`npm run new:post` scaffolds a piece with the right frontmatter. `/by-date/` is
the plain list, and works without the plot.
