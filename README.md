# Dan Frunza Website

This is my personal portfolio site as a .NET and Angular developer. The home page introduces who I am and how I work, and links to the other sections of the site. The projects page walks through nine of my projects with screenshots, tech tags, plain-language and technical write-ups, and links to the code. There's also a page for my work experience and education, and a contact form that sends email straight from the browser. Every page is prerendered at build time, so the site is plain static HTML on Firebase Hosting with no server behind it.

---

## Key Features

- **Projects page:** Nine projects, each with tech tags, a short plain-language description and a more technical write-up, and for some of them key features and a typical use case. Each one links to its code, and to a live demo where there is one; projects without a demo show the button disabled.
- **Screenshot lightbox:** Every project has two or four screenshots in a grid. Clicking one opens it full size in a lightbox, where you can move through that project's screenshots with the arrow buttons, the arrow keys or a swipe on touch screens.
- **Experience page:** Work history and education, with company logos.
- **Contact form:** A validated form sends messages through EmailJS straight from the browser, so the site needs no backend. It shows success and failure messages.
- **Fully static output:** Every route, including the 404 page, is prerendered at build time (`outputMode: "static"`). Firebase Hosting serves plain HTML files, and unknown URLs get the prerendered 404 page with a real 404 status.
- **SEO:** Each page has its own title, meta description, Open Graph/Twitter tags and canonical URL. A web manifest and touch icons are included for phones.

---

## Tech Stack

- **Frontend:** Angular 22.2 (standalone components, signals, zoneless), TypeScript, plain CSS plus a vendored subset of Bootstrap's grid/utility CSS (`src/bootstrap-essentials.css`)
- **Backend:** N/A
- **Database / Storage:** N/A. Project and experience content lives in the components
- **Tooling & Other:** `@angular/ssr` for build-time prerendering, EmailJS, Vitest + jsdom, Prettier, Firebase Hosting

---

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js `^22.22.3`, `^24.15.0` or `>=26` with npm
- Firebase CLI (`npm install -g firebase-tools`), only if you want to deploy

---

## Local Setup & Running

### 1. Clone the repository

```bash
git clone https://github.com/FrunzaDan/dan-frunza-website.git
cd dan-frunza-website
```

### 2. Configuration

The only runtime config is the EmailJS service ID, template ID and public key in `src/environments/environment.ts`. They are public client-side keys, so there's no `.env` file.

To edit content, change the `projects` list in `src/app/components/projects/projects.component.ts` and the experience page template. Screenshots and company logos live in `public/assets/`.

### 3. Installation & Run

The scripts in the repo root do the usual steps for you:

```bash
./build.sh               # npm ci, format check, lint, build, unit tests (--skip-tests to skip them)
./run.sh                 # dev server (runs npm ci first if node_modules is missing)
```

Or run the npm scripts yourself:

```bash
npm install
npm start          # dev server on http://localhost:4201
npm test           # Vitest unit tests
npm run build      # prerendered static build → dist/dan-frunza-website/browser
```

`npm run build` also copies the prerendered `404/index.html` to `404.html`, which Firebase Hosting serves for unknown URLs.

---

## API / App Usage

Routes: `/` (home), `/projects`, `/experience`, `/contact` and `/404`. Any other URL renders the 404 page.

To deploy (Firebase project `dan-frunza`, set in `.firebaserc`):

```bash
npm run build
firebase deploy
```

---

## License & Notes

Personal portfolio with no license file. Company logos in `public/assets/company_logos/` belong to their respective companies.
