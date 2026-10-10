# Code Guru — Research Portfolio Website

Portfolio website for **Code Guru** (R26-SE-036), an integrated real-time learning support platform for novice Java programmers — a final-year research project at the Sri Lanka Institute of Information Technology (SLIIT).

- Web platform: <https://3-106-2-190.sslip.io/>
- VS Code extension: [Code Guru: Code Coach](https://marketplace.visualstudio.com/items?itemName=codeguru-sliit.code-coach-vscode)

## Tech stack

- [Next.js](https://nextjs.org/) (App Router, static export)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Motion](https://motion.dev/) (Framer Motion) for animations
- [Lucide](https://lucide.dev/) icons

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Editing content

Almost everything on the site — text, metrics, milestones, team details and document links — lives in one file:

```
src/data/site.ts
```

| What | Where in `site.ts` |
| --- | --- |
| Deliverables (documents & presentations) | `documents` and `presentations`. Set `view` to a slug rendered by `scripts/render-viewer.py` to show a **View** button (read-only, see below). Add a `url` to show a **Download** button; only the research paper has one. |
| Milestone dates and status | `milestones` — set `date` and `status` (`completed`, `current`, `upcoming`). |
| Team photos, LinkedIn, GitHub | `members` / `supervisors` — add `photo` (a small square image, ~480×480, in `public/team/`), `linkedin`, `github`. Strip photo metadata first: phone photos can contain GPS location. |

## Project structure

```
src/
  app/                 layout, page, global styles, favicon
  data/site.ts         all site content
  components/
    sections/          one file per page section
    hero/              animated Code Coach editor demo
    domain/            animated visuals for the Research Foundation tabs
    components/        mini demos for each system component
    effects/           preloader, scroll progress, cursor glow, code particles
    ui/                shared building blocks
```

## Build & deploy

```bash
npm run build
```

The static site is generated in `out/`.

### View-only documents

Proposals, theses and presentations can be read on the site but not downloaded. The original files are kept in `private/`, which is git-ignored and never published (the repository is public). `scripts/render-viewer.py` renders each page to a WebP image in `public/viewer/<slug>/` and records the page counts in `src/data/viewer-pages.json`; the viewer only ever loads those images.

To add or update a document:

1. Put the PDF in `private/` (export slides with PowerPoint: *File → Save As → PDF*).
2. Add it to `SOURCES` in `scripts/render-viewer.py`, then run `python scripts/render-viewer.py <slug>` (needs `pip install pymupdf pillow`).
3. Set `view: "<slug>"` on the entry in `src/data/site.ts` (or on one of its `files`).

Images can still be screenshotted, so this stops casual downloading rather than copying.

## CI/CD

- **CI (GitHub Actions)**: `.github/workflows/ci.yml` runs `npm ci`, `npm run lint` and `npm run build` (the build also type-checks) on every push and pull request to `main` or `dev`.
- **CD (Vercel Git integration)**: the Vercel project `code-guru-portfolio` is connected to this repository and deploys every push automatically:
  - `main` → **Production**: <https://code-guru-portfolio.vercel.app>
  - `dev` and pull requests → **Preview** (Vercel comments the preview link on each PR)

To release to production, merge `dev` into `main`.

## Team

- W. P. R. Nethmina (Group Leader) — Code Coach
- H. A. S. I. Madurapperuma — Study Guider
- M. N. H. Appuhami — PairPath
- J. Aron Charles — Adaptive Gamification Engine

Supervisor: Ms. Suriyaa Kumari · Co-Supervisor: Ms. Uthpala Samarakoon
