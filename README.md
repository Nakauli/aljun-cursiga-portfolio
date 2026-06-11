# Aljun C. Cursiga Portfolio Website

A responsive personal portfolio for Aljun C. Cursiga, a Computer Science student, layout artist, and aspiring Full Stack Developer. The site presents projects, skills, experience, services, downloadable CV, and contact information in a polished single-page experience.

## Features

- Responsive desktop, tablet, and mobile layouts
- Dark and light themes saved with `localStorage`
- Animated hero, section reveals, timeline, and project cards
- Project category filters
- Skills and tools grouped by category
- Downloadable PDF and DOCX CV files
- Accessible semantic sections and contact form UI
- SEO-friendly metadata and social preview information

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
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

## Editing Content

- Edit personal information and social links in `src/data/profile.js`.
- Edit skills and tools in `src/data/skills.js`.
- Edit project cards in `src/data/projects.js`.
- Edit experience entries in `src/data/experience.js`.
- Edit services in `src/data/services.js`.
- Replace project preview images in `public/project-placeholders`.

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

- GitHub repository: Added after GitHub deployment
- Live demo: Added after Vercel deployment

## Deployment

Deploy the production site with Vercel CLI:

```bash
vercel --prod
```

Vercel detects the Vite project and uses:

- Build command: `npm run build`
- Output directory: `dist`

See `DEPLOYMENT.md` after the first production deployment for the real repository URL, live URL, and update workflow.
