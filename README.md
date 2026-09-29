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

The static site is generated in `out/`.

### CI/CD (GitHub Actions → Vercel)

`.github/workflows/ci-cd.yml` runs on every push and pull request to `main` or `dev`:

1. **Lint & build**: `npm ci`, `npm run lint`, `npm run build` (the build also type-checks).
2. **Deploy to Vercel** (only after step 1 passes):
   - push to `main` → **Production**
   - push to `dev` → **Preview**
   - pull request → **Preview**, with the URL posted as a PR comment

The workflow needs one repository secret, `VERCEL_TOKEN`. Create a token at <https://vercel.com/account/tokens>, then add it under **Settings → Secrets and variables → Actions**, or run:

```bash
gh secret set VERCEL_TOKEN --repo RVNethmina/Codu-Guru-Portfolio-Website
```

The Vercel project (`code-guru-portfolio`) is not connected to Git on purpose: GitHub Actions is the only thing that deploys, so pushes never trigger duplicate builds.

## Team

- W. P. R. Nethmina (Group Leader) — Code Coach
- H. A. S. I. Madurapperuma — Study Guider
- M. N. H. Appuhami — PairPath
- J. Aaron Charles — Adaptive Gamification Engine

Supervisor: Ms. Suriyaa Kumari · Co-Supervisor: Ms. Uthpala Samarakoon
