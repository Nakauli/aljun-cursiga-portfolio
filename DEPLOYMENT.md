# Deployment Information

## Live Links

- GitHub repository: [https://github.com/Nakauli/aljun-cursiga-portfolio](https://github.com/Nakauli/aljun-cursiga-portfolio)
- Vercel production website: [https://aljun-cursiga-portfolio.vercel.app](https://aljun-cursiga-portfolio.vercel.app)

## Framework Settings

This is a Vite React project deployed with:

- Build command: `npm run build`
- Output folder: `dist`
- Hosting: Vercel free hosting

## Latest Production Update

- Date: June 18, 2026
- Update: Expanded the language roadmap with filters, proof projects, and transparent skill levels.
- Verification: `npm install`, `npm audit`, and `npm run build`

## Commands Used

```bash
git init
git branch -M main
git add .
git commit -m "Initial commit: create full-stack developer portfolio"
gh repo create aljun-cursiga-portfolio --public --description "Personal portfolio website of Aljun C. Cursiga, Full Stack Developer" --source=. --remote=origin
git push -u origin main
vercel --prod --yes --name aljun-cursiga-portfolio
```

## Push Future Changes

```bash
git add .
git commit -m "Update portfolio"
git push
```

## Redeploy Updates

```bash
vercel --prod
```

The first Vercel deployment attempted to connect the GitHub repository, but automatic Git-triggered deployments require adding a GitHub Login Connection in the Vercel account. Secure CLI deployments work without that connection.
