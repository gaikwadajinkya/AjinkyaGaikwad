# Personal Homepage (Static)

A lightweight, single-page academic homepage for a postdoc in algorithms, graph theory, and algorithmic game theory.
Edit JSON files, drop in a CV PDF, and deploy free on GitHub Pages.

## Quick Start

1. **Edit config & content**
   - Open `site-config.json` and replace placeholders (name, email, links).
   - Add/modify publications in `publications.json`.
   - Add recent items to `news.json` (YYYY-MM-DD).
   - Replace `assets/CV.pdf` with your CV (keep the same filename).
   - Replace `assets/headshot-placeholder.svg` with `assets/headshot.jpg` (square ~800×800).

2. **Preview locally**
   - Open `index.html` in a browser (double-click). For full functionality, you may need a local server to allow `fetch()`:
     - Python 3: `python -m http.server 8000`
     - Visit http://localhost:8000

3. **Deploy on GitHub Pages (free)**
   - Create a repo named `<username>.github.io` or any repo.
   - Upload all files to the repo root (or a `docs/` folder).
   - In repository **Settings → Pages**, set:
     - **Source**: `main` branch (root) _or_ `/docs` folder.
   - Your site will be live at:
     - `https://<username>.github.io/` (root) or `https://<username>.github.io/<repo>/`

4. **Custom domain (optional)**
   - Add a `CNAME` file with your domain and configure DNS to GitHub Pages.

## Files
- `index.html` — the page structure
- `style.css` — minimal styling
- `script.js` — loads `publications.json`, `news.json`, `site-config.json`
- `publications.json` — list of publications (edit)
- `news.json` — list of news items (edit)
- `site-config.json` — your name, email, profiles
- `assets/CV.pdf` — your CV (replace)
- `assets/headshot.jpg` — your photo (optional, replace placeholder)
- `assets/headshot-placeholder.svg` — default placeholder
- `assets/sample-paper.pdf` — a sample file linked from publications

## Tips
- For BibTeX → JSON, you can manually copy titles/authors, or use a small script to convert.
- Keep the site simple: short bio, selected pubs with links, and a concise news feed.
- Add a `robots.txt` or `sitemap.xml` later if needed.

© 2025 [[Your Name]]
