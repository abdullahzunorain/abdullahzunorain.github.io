## Repository orientation

This is a small, static personal portfolio website. It's a plain HTML/CSS/JS site (no build toolchain detected). Main files to know:

- `index.html` — single-page site and entry point (meta tags, content sections, social links, resume link pointing to `assets/docs/`)
- `styles.css` — global styling and theme variables. Light/dark themes are implemented via `:root` and `:root.light` variables.
- `script.js` — site behavior (navigation toggle, theme toggle with localStorage, smooth scroll, contact form client-side validation, project filters, modals using `<dialog>`).
- `assets/images/` — image assets (avatar, OG image referenced in `index.html`).
- `assets/docs/` — PDF resume and other downloadable docs.

If you need context beyond these files, check `README.md` at the repo root for the author/portfolio information.

## Big-picture architecture & intent

- Purpose: static portfolio demonstrating projects, skills and links to external projects (GitHub, Hugging Face, YouTube, Kaggle).
- Deployment: this repository is named `abdullahzunorain.github.io`, which strongly suggests GitHub Pages serving from the repository root. Verify repo Pages settings if you change the branch or folder.
- No server/backend in this repo — the contact form is client-side only (see `script.js` comment and `form-note` in `index.html`).

## Key patterns and concrete examples

- Theme handling: `script.js` uses `localStorage` key `theme` and toggles `document.documentElement.classList` between light/dark. CSS variables live at the top of `styles.css` (`:root` and `:root.light`). To change the palette, edit those variables.
  - Example: change primary color by editing `--primary`/`--primary-600` in `styles.css`.
- Project filters: buttons with `.filter-btn` and `data-filter` strings — `script.js` shows how cards use `data-tags` to determine visibility.
  - Example: to add a new project tag `web`, add `data-tags="web"` to a `.project-card` and a filter button with `data-filter="web"`.
- Modals: implemented with `<dialog id="modal-...">` and `setupModal('pea-cnn')` in `script.js` — follow this pattern for adding more modals.
- Accessibility: there is an accessible skip link (`.skip-link`), aria labels on nav and sections, and focus/keyboard handling for modals and header.
- Skill bars: CSS custom property `--val` drives bar widths (see `.bar span` in `styles.css`). Animate by setting `--val` on the element.

## Developer workflows (what works locally)

- No build step: site runs by opening `index.html` in a browser, but use a local static server to avoid CORS/asset issues during development.
  - Common quick preview options: `python -m http.server` or `npx http-server` (not included in repo). Document and verify which one maintainers prefer before adding scripts.
- Tests / CI: none detected. If you add CI, prefer a simple workflow that runs an HTML/CSS/JS linter and optionally deploys to GitHub Pages.

## Editing conventions & safety rules for the agent

- Edit only files required for the change: `index.html`, `styles.css`, `script.js`, `assets/images/` and `assets/docs/`.
- Do not add a backend or change the contact form into a real server call without explicit confirmation from the repo owner — the README and `index.html` explicitly state the contact form is local-only.
- Preserve accessibility markup (skip link, `aria-*` attributes, focus handling in `script.js`).
- Keep external links (GitHub, Hugging Face, YouTube) as-is unless the owner asks to update them.

## When you need to change deployment

- If switching from Pages root to a `docs/` folder or to a different branch, update the resume/link paths in `index.html` (e.g., `assets/docs/Zunorain_CV...pdf`) and confirm the Pages settings on GitHub.
- If you add assets, keep them under `assets/images/` or `assets/docs/` to match current structure.

## Things to check before opening a PR

1. Confirm no backend assumptions were introduced (contact form remains client-only unless owner asked otherwise).
2. Verify visual changes across light/dark theme (toggle relies on `:root.light`).
3. Test modals and project filters on mobile screen widths (nav toggle and responsive rules in `styles.css`).
4. Run a quick local server and manually test the site sections, smooth scrolling, and skill-bar animations.

## Quick references

- Entry: `index.html`
- Behavior: `script.js` (nav, theme, filters, modals, contact validation)
- Styles & theme variables: `styles.css` (top of file)
- Images & docs: `assets/images/`, `assets/docs/`

If anything above is unclear or you'd like a different level of detail (for example: add linting setup, CI template, or automated preview scripts), tell me which area to expand and I'll iterate.
