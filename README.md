# Aljun C. Cursiga Portfolio Website

A responsive personal portfolio for Aljun C. Cursiga, a Computer Science student, layout artist, and aspiring Full Stack Developer. The site presents projects, skills, experience, services, downloadable CV, and contact information in a polished single-page experience.

## Features

- Responsive desktop, tablet, and mobile layouts
- Dark and light themes saved with `localStorage`
- Animated hero, section reveals, timeline, and project cards
- Project category filters
- Skills and tools grouped by category
- 3D industry stack showcase for current, practicing, and exploring tools
- Industry stack filters with evidence-based proficiency labels
- Programming language learning tracks with concrete proof projects
- GitHub-backed project gallery with ownership, visibility, and repository freshness
- Project security evidence and responsible team-work attribution
- Production security headers and a public vulnerability reporting policy
- Dependabot, CodeQL, dependency auditing, and automated build verification
- Downloadable PDF and DOCX CV files
- Accessible semantic sections and contact form UI
- SEO-friendly metadata and social preview information

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Three.js
- Lucide React
- React Icons
- Vercel

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

Create a production build with:

```bash
npm run build
```

The production output is generated in `dist`.

Run the complete local quality gate with:

```bash
npm run check
```

This audits dependencies at high severity and creates a production build.

## Editing Content

- Edit personal information and social links in `src/data/profile.js`.
- Edit skills and tools in `src/data/skills.js`.
- Edit the industry stack showcase in `src/data/industryStack.js`.
- Edit learning tracks and roadmap goals in `src/data/learning.js`.
- Edit project cards in `src/data/projects.js`.
- Edit experience entries in `src/data/experience.js`.
- Edit services in `src/data/services.js`.
- Store authentic running-app captures in `public/project-screenshots`.
- Store logos, concepts, and other non-running visuals in `public/project-placeholders`.
- Label each image accurately with `mediaType`, `imageAlt`, and `evidence` in `src/data/projects.js`.

Project captures use a consistent `1280 x 800` frame and WebP format. Avoid including secrets, private records, real credentials, or personally identifiable test data in screenshots.

## CV Files

Place the downloadable CV at:

```text
public/Aljun_Cursiga_CV.pdf
```

The original DOCX can be stored at:

```text
public/Aljun_Cursiga_CV.docx
```

Keep the filenames unchanged so the existing download buttons continue to work.

## Repository and Live Demo

- GitHub repository: [github.com/Nakauli/aljun-cursiga-portfolio](https://github.com/Nakauli/aljun-cursiga-portfolio)
- Live demo: [aljun-cursiga-portfolio.vercel.app](https://aljun-cursiga-portfolio.vercel.app)

## Deployment

Deploy the production site with Vercel CLI:

```bash
vercel --prod
```

Vercel detects the Vite project and uses:

- Build command: `npm run build`
- Output directory: `dist`

See `DEPLOYMENT.md` for the repository URL, live URL, commands used, and update workflow.

## Security

- Vulnerability reporting instructions: `SECURITY.md`
- Standard security contact: `public/.well-known/security.txt`
- Production response headers: `vercel.json`
- Automated scanning: `.github/workflows/codeql.yml`
- Dependency and build gate: `.github/workflows/quality.yml`
