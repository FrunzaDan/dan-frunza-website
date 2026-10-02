# Dan Frunza Website

My personal portfolio site as a .NET and Angular developer. It has an intro, a projects page with screenshots and write-ups, my work experience and education, and a contact form. Every page is prerendered at build time and served as static files from Firebase Hosting.

---

## 🚀 Key Features

- **Projects page:** Nine projects, each with tech tags, a plain-language summary, technical notes, a code link, an optional demo link and a screenshot lightbox.
- **Experience page:** Work history and education.
- **Contact form:** Validated form that sends messages client-side through EmailJS, with no backend.
- **Fully static output:** Every route, including the 404 page, is prerendered (`outputMode: "static"`), so Firebase Hosting serves plain HTML with no server.
- **SEO:** Per-page titles, meta description, Open Graph/Twitter tags and canonical URLs, plus a web manifest and touch icons.

---

## 🛠 Tech Stack

- **Frontend:** Angular 22.2 (standalone components, signals, zoneless), TypeScript, plain CSS plus a vendored subset of Bootstrap's grid/utility CSS (`src/bootstrap-essentials.css`)
- **Backend:** N/A
- **Database / Storage:** N/A. Project and experience content lives in the components
- **Tooling & Other:** `@angular/ssr` for build-time prerendering, EmailJS, Vitest + jsdom, Prettier, Firebase Hosting

---

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- Node.js `^22.22.3`, `^24.15.0` or `>=26` with npm
- Firebase CLI (`npm install -g firebase-tools`), only if you want to deploy

---

## ⚙️ Local Setup & Running

### 1. Clone the repository

```bash
git clone https://github.com/FrunzaDan/dan-frunza-website.git
cd dan-frunza-website
```

### 2. Configuration

The only runtime config is the EmailJS service ID, template ID and public key in `src/environments/environment.ts`. They are public client-side keys, so there's no `.env` file.

To edit content, change the `projects` list in `src/app/components/projects/projects.component.ts` and the experience page template. Screenshots and company logos live in `public/assets/`.

### 3. Installation & Run

```bash
npm install
npm start          # dev server on http://localhost:4201
npm test           # Vitest unit tests
npm run build      # prerendered static build → dist/dan-frunza-website/browser
```

`npm run build` also copies the prerendered `404/index.html` to `404.html`, which Firebase Hosting serves for unknown URLs.

---

## 🔌 API / App Usage

Routes: `/` (home), `/projects`, `/experience`, `/contact` and `/404`. Any other URL renders the 404 page.

To deploy (Firebase project `dan-frunza`, set in `.firebaserc`):

```bash
npm run build
firebase deploy
```

---

## 📝 License & Notes

Personal portfolio with no license file. Company logos in `public/assets/company_logos/` belong to their respective companies.
