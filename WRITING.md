# Writing on this site

Everything here is a file. There is no admin panel, no database, and nothing to
log into. You write a markdown file, commit it, push it, and a GitHub Action
builds the site and puts it online.

---

## The short version

```bash
npm run dev          # http://localhost:4321, reloads as you type
npm run new:post     # scaffolds a file with the right frontmatter
# write the thing
npm run check        # types and frontmatter
npm run build        # the build CI will run
git add -A && git commit -m "Add: the title" && git push
```

Push to `main` and it deploys. Nothing else to do.

---

## Where things live

```
src/content/writing/    one file per piece      →  /writing/<filename>/
src/content/threads/    one file per thread     →  /threads/<filename>/
```

The filename is the URL. `mozart.md` becomes `/writing/mozart/`. Keep it short
and lowercase; you cannot change it later without breaking the link.

---

## Starting a piece

```bash
npm run new:post
```

It asks for a title, one line of description, the two coordinates, and a thread.
It writes `src/content/writing/<slug>.md` with the frontmatter filled in and
`draft: true` at the top.

You can also just copy an existing file. The script saves typing, not much else.

---

## Frontmatter

Everything between the two `---` lines at the top of the file. The build
validates it: get a field wrong and the build fails with the reason, rather than
publishing something broken.

```yaml
---
title: 'Why Coincidence Is Not an Explanation'
description: 'Dirac, and what an explanation actually owes you.'
pubDate: 2021-05-14
draft: false
math: true
x: 0.75
y: 0.55
thread: grounding-a-hunch
---
```

| Field         | Required | What it does                                                                                                                |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `title`       | yes      | The `<h1>`, the tab title, the plot label, the RSS title.                                                                   |
| `description` | yes      | One line. Shows under the title on the home page card, in RSS, and in link previews. Write it as a sentence, not a summary. |
| `pubDate`     | yes      | `YYYY-MM-DD`. Sorts `/by-date/` and the thread order.                                                                       |
| `draft`       | no       | `true` hides it everywhere — plot, lists, RSS, sitemap. Defaults to `false`.                                                |
| `math`        | no       | Records that the piece contains equations. Defaults to `false`.                                                             |
| `x`           | yes      | 0 to 1. Position across the field.                                                                                          |
| `y`           | yes      | 0 to 1. Position down the field.                                                                                            |
| `thread`      | no       | The filename (without `.md`) of a file in `src/content/threads/`.                                                           |
| `sample`      | no       | Marks specimen text. See below.                                                                                             |
| `ogImage`     | no       | Path or URL for the social preview image.                                                                                   |

Quote the title and description if they contain a colon, an apostrophe, or a
`#`. Single quotes are fine; double the quote character to escape it inside
single quotes (`'Mozart''s problem'`).

Two fields exist in the schema but nothing reads them yet: `canonicalURL` and
`minutesRead`. Setting them is harmless and does nothing.

### `draft`

`draft: true` means the file exists in the repo but not on the site. It is
filtered out at the source — `getAllWriting()` drops it — so it cannot leak into
the plot, the RSS feed, or the sitemap. It is the right way to keep something
half-written on `main`.

### `sample`

The thirteen pieces currently on the site are specimen text. Each carries
`sample: true`, and a notice appears on the site for as long as any published
piece has it. Delete those files and the notice disappears with them — it keys
off the content, not a switch, so it cannot be left on by mistake.

---

## Choosing `x` and `y`

The home page is a plot rather than a list, so every piece has to land
somewhere. Both numbers are judgement calls. There is nothing to compute.

**`x` — 0 is the human scale, 1 is the cosmic scale.** Not "easy to hard". A
letter about your mother's belief is near 0. A letter about charge quantization
is near 1. Something about how a university decides what to teach sits in the
middle, because it is both.

**`y` — 0 is raw intuition, 1 is grounded.** How far the thing has been carried
from a hunch toward something you could defend. A piece that admits it is only a
picture sits high (near 0). A piece with a derivation and a citation sits low
(near 1).

Useful anchors from the pieces already placed:

| Piece                                 |  `x` |  `y` | Why                                     |
| ------------------------------------- | ---: | ---: | --------------------------------------- |
| Tubules of Spacetime                  | 0.85 | 0.15 | Cosmic, and admits it is only a picture |
| Two Identities                        | 0.10 | 0.20 | Entirely human, entirely unresolved     |
| Why Coincidence Is Not an Explanation | 0.75 | 0.55 | Cosmic, argued, but not settled         |
| The First Time I Wanted Money         | 0.15 | 0.90 | Human, and no longer in any doubt       |

The post page prints the position back to you in words — "Cosmic scale, and
half-checked." — so if that sentence reads wrong, the numbers are wrong. Two
digits is plenty; `0.62` and `0.625` are the same point on screen.

Nothing breaks if two pieces land on the same spot. They will simply overlap.

---

## Threads

A thread is a question you return to more than once. It gets its own page, draws
an arc through the plot, and each piece in it gets before/next navigation.

To put a piece in a thread, set `thread:` to the thread's filename:

```yaml
thread: grounding-a-hunch
```

Order within a thread is by `pubDate`, oldest first.

To make a new thread, add a file to `src/content/threads/`:

```markdown
---
title: 'Two Selves'
question:
  'Can the self that answers to family and the self that answers to the universe
  be the same person, or must one always stand watch over the other?'
open:
  'The letter that says it plainly, in my own voice, without a mountain, two
  men, or a citation to stand behind.'
crossing: true
---

I never ask it directly. I ask it four times, in four disguises, and each
disguise is a little further from home.
```

| Field      | Required | What it does                                                                                                                            |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `title`    | yes      | The thread's name.                                                                                                                      |
| `question` | yes      | The question itself, shown under the name on the home page.                                                                             |
| `open`     | no       | What has not been written yet. Printed at the end of the thread page as an honest loose end. Leave it out if the thread feels finished. |
| `crossing` | no       | The one thread that cuts across the others. Drawn in the second accent colour and listed first. Only mark one.                          |

The body of the file is the thread page's opening paragraph.

A thread with no pieces in it does not appear anywhere — it is a note to self
until something joins it. A piece whose `thread:` names a file that does not
exist is counted as loose, not as an error, so check the spelling.

---

## Writing the body

Standard markdown. Headings, lists, `**bold**`, `_italic_`, links, tables,
`> blockquotes`, `---` rules.

Only use `##` and `###` for headings. `#` is the title, which comes from the
frontmatter — a `#` in the body gives the page two first-level headings.
Headings get an id and become linkable automatically.

Images go in `public/` and are referenced from the root:

```markdown
![A plot of the first run](/images/first-run.png)
```

Code blocks are highlighted by Shiki, with a light and a dark theme that follow
the site's theme toggle. Name the language:

````markdown
```python
def project(x, y, box):
    return box.left + x * box.width, box.top + (1 - y) * box.height
```
````

Footnotes work, and are the right place for a citation:

```markdown
It begins by supposing a single magnetic monopole exists.[^1]

[^1]:
    P. A. M. Dirac, _Quantised Singularities in the Electromagnetic
    Field_, 1931. He needs only one, and it need not be nearby.
```

Footnote definitions can sit anywhere in the file; they are collected and
printed at the bottom regardless. Keep them at the end anyway.

---

## Math

Math is written in LaTeX, parsed by remark-math, and rendered by KaTeX at build
time. Nothing runs in the reader's browser and there is no script to load.

Set `math: true` in the frontmatter when a piece has equations in it. The flag
is bookkeeping — it is recorded on the piece and nothing currently reads it, so
equations render whether or not you set it. Set it anyway, so the record is
true.

### Inline

One dollar sign each side, no spaces against the delimiters:

```markdown
The condition is $eg = n\hbar c / 2$, with $n$ an integer.
```

### Display

Two dollar signs, **each on its own line**:

```markdown
The wavefunction stays single-valued only if

$$
eg = \frac{n\hbar c}{2}, \qquad n \in \mathbb{Z}
$$

Observe what has happened.
```

This is the one rule that catches people. Written on a single line —
`$$eg = n\hbar c/2$$` — remark-math parses it as _inline_ math, and it renders
small and in the flow of the sentence rather than centred on its own line. It
does not error; it just quietly looks wrong. If an equation comes out small,
this is why.

Leave a blank line before and after the block.

### What you can write

KaTeX, not full LaTeX. Almost everything ordinary works: `\frac`, `\sum`,
`\int`, `\partial`, `\nabla`, `\hat`, `\bar`, `\mathbb`, `\mathcal`, `\text`,
`\left(` and `\right)`, Greek, subscripts and superscripts, `\begin{aligned}`,
`\begin{pmatrix}`, `\cases`.

```markdown
$$
\begin{aligned}
\mathcal{L} &= \frac{1}{2}m\dot{q}^2 - V(q) \\
\frac{d}{dt}\frac{\partial \mathcal{L}}{\partial \dot{q}} &= \frac{\partial \mathcal{L}}{\partial q}
\end{aligned}
$$
```

What does not work: `\newcommand` and custom macros, `\label` and `\ref`,
`equation`/`align` numbering, TikZ, and anything that needs a real LaTeX
compiler. KaTeX's own list of supported functions is the authority:
<https://katex.org/docs/supported>.

The build is set to `strict: false`, so an unknown command renders in red
instead of failing the build. Red in the preview means a typo in the LaTeX.

Backslashes inside frontmatter need care — YAML eats them. Avoid math in the
title and description; if you must, single-quote the string.

### How it actually renders

KaTeX normally ships a stylesheet and a set of fonts. This site does not load
either. Instead the HTML half of KaTeX's output is hidden and the **MathML**
half is shown, so equations are drawn by the browser's own math renderer in the
body serif, and are selectable, searchable, and read correctly by screen
readers.

What follows from that: equations match the surrounding text rather than sitting
in a different typeface, and spacing on very elaborate constructions — deeply
nested fractions, large matrices — is the browser's, not KaTeX's. It is worth
previewing anything ambitious. Simple equations are fine everywhere.

---

## `.md` or `.mdx`

Use `.md`. It is enough for everything above.

Use `.mdx` when you want a component in the middle of the prose. The only one
built is the callout:

```mdx
---
title: 'A piece with a callout'
description: 'One line.'
pubDate: 2026-09-21
x: 0.5
y: 0.5
---

import Callout from '@components/ui/Callout.astro';

Ordinary paragraph.

<Callout type="warning" title="Before you trust this">
  The derivation below assumes the field is static. It is not, in general.
</Callout>
```

`type` is `note`, `tip`, `warning`, or `danger`. `title` is optional and
defaults to the type's name.

MDX is stricter than markdown: a bare `<` or `{` is read as code, so escape them
as `\<` and `\{`. That is the cost of using it, which is why `.md` is the
default.

---

## Checking it before it goes out

```bash
npm run dev
```

Then look at, in order:

1. The piece itself at `/writing/<slug>/` — equations, footnotes, code blocks.
2. Its position in the locator under the title. Does the sentence beside the
   plot describe the piece honestly?
3. The home page. Is the point where you expected, and not on top of another?
4. The thread page, if it has a thread. Does it read in order?
5. The theme toggle, in both states.

Then:

```bash
npm run check     # types, frontmatter, and astro's own checks
npm run build     # exactly what CI runs
```

If the content collection seems stuck on an old version of a file — a deleted
piece that keeps building — clear the cache:

```bash
rm -rf node_modules/.astro && npm run build
```

`.astro/` in the project root is not the cache that matters;
`node_modules/.astro` is.

---

## Publishing

```bash
git add -A
git commit -m "Add: why coincidence is not an explanation"
git push
```

A pre-commit hook runs prettier and eslint on what you staged, so a commit may
reformat your file. That is expected.

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes it to GitHub Pages. It takes a minute or two. Watch it under the
Actions tab; if the build fails, the site stays on the last good version.

Setting `draft: false` is what publishes a piece. Remember it — a finished piece
with `draft: true` is invisible, and the build will not warn you, because that
is exactly what the flag is for.
