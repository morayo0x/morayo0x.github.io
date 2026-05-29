# Setup Guide — Zero to Deployed

Complete setup from a fresh clone to a live GitHub Pages site.
Estimated time: **20–30 minutes**.

---

## 1. Prerequisites

```bash
node --version   # Must be 18+, ideally 20 LTS
git --version    # Any recent version
```

Install Node 20 via [nvm](https://github.com/nvm-sh/nvm):
```bash
nvm install 20 && nvm use 20
```

---

## 2. Clone and install

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
npm install
```

---

## 3. Personalise (do this before deploying)

### Required changes

**`astro.config.mjs`** — set your URL:
```js
site: 'https://yourusername.github.io',
base: '/',   // or '/repo-name/' for project pages
```

**`src/components/layout/BaseHead.astro`** — update:
```astro
const UMAMI_WEBSITE_ID = 'YOUR-WEBSITE-ID';  // or leave as-is to disable
```
Also update `twitter:site` meta tag.

**`src/components/layout/Header.astro`** — change `Your Name` in the wordmark.

**`src/components/layout/Footer.astro`** — update name, links, social handles.

**`src/pages/about.astro`** — write your actual bio.

**`src/pages/index.astro`** — update hero text.

**`public/robots.txt`** — update sitemap URL.

**`public/CNAME`** — replace with your domain, or delete this file if using
`username.github.io` without a custom domain.

### Optional changes

**`tailwind.config.mjs`** — tweak the `ink` and `accent` color palettes.

**`src/styles/global.css`** — change fonts (search for `font-family`).

**`public/favicon.svg`** — replace with your own.

---

## 4. Test locally

```bash
npm run dev
# → http://localhost:4321
```

To test search (requires a build):
```bash
npm run build && npm run preview
# → http://localhost:4321
```

---

## 5. Deploy to GitHub Pages

### First-time setup

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "initial commit"
   git push -u origin main
   ```

2. In your GitHub repo, go to **Settings → Pages**

3. Under **Source**, select **GitHub Actions**

4. That's it. The next push to `main` will trigger a deploy.

### Check deployment

- Go to **Actions** tab in your repo to watch the build
- Your site will be live at `https://yourusername.github.io` (or your custom domain) in ~1 minute

---

## 6. Custom domain (optional)

1. **`public/CNAME`** — your domain (e.g. `yourname.com`)
2. At your DNS registrar, add:
   ```
   # For apex domain (yourname.com):
   A    @    185.199.108.153
   A    @    185.199.109.153
   A    @    185.199.110.153
   A    @    185.199.111.153

   # For www subdomain (www.yourname.com):
   CNAME  www  yourusername.github.io
   ```
3. In **Settings → Pages**, enable **Enforce HTTPS** after DNS propagates (~24h)
4. Update `site` in `astro.config.mjs` and `robots.txt` to your custom domain

---

## 7. Write your first post

```bash
npm run new:post
# → Type: reflections
# → Title: My First Post
# → Created: src/content/writing/reflections/2025-01-my-first-post.md
```

Edit the file, set `draft: false`, then:
```bash
git add . && git commit -m "post: my first post" && git push
```

Live in ~45 seconds. ✓

---

## 8. Analytics (optional)

1. Create a free account at [cloud.umami.is](https://cloud.umami.is) or self-host
2. Add your site, copy the **Website ID**
3. In `src/components/layout/BaseHead.astro`, replace:
   ```ts
   const UMAMI_WEBSITE_ID = 'YOUR-WEBSITE-ID';
   ```
4. Analytics only loads in production — won't affect dev mode

---

## Daily workflow

```bash
# Write
npm run new:post

# Preview
npm run dev

# Publish
git add . && git commit -m "post: title" && git push
```

That's it.
