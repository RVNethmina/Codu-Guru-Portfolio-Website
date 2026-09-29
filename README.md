# Code Guru — Research Portfolio Website

Portfolio website for **Code Guru** (R26-SE-036), an integrated real-time learning support platform for novice Java programmers — a final-year research project at the Sri Lanka Institute of Information Technology (SLIIT).

- Web platform: <https://13-202-201-115.sslip.io/>
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
| Document / presentation download links | `documents` and `presentations` — paste a Google Drive / OneDrive share link into `url` (or each `files[].url`). Empty links show as "Coming soon". |
| Milestone dates and status | `milestones` — set `date` and `status` (`completed`, `current`, `upcoming`). |
| Team photos, LinkedIn, GitHub | `members` / `supervisors` — add `photo` (put the image in `public/team/`), `linkedin`, `github`. |
| Research paper link | `links.paper` |

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

The static site is generated in `out/` and can be hosted on Vercel, Netlify or GitHub Pages. On Vercel, import the repository and keep the default Next.js settings.

## Team

- W. P. R. Nethmina (Group Leader) — Code Coach
- H. A. S. I. Madurapperuma — Study Guider
- M. N. H. Appuhami — PairPath
- J. Aaron Charles — Adaptive Gamification Engine

Supervisor: Ms. Suriyaa Kumari · Co-Supervisor: Ms. Uthpala Samarakoon
