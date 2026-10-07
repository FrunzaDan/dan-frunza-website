# Dan Frunza Website — Project Overview

## What is it?

This is my **personal portfolio website** as a .NET and Angular developer. It's where people (recruiters, clients, colleagues, or anyone curious) can find out who I am, what I've built and how to reach me.

It has four pages:

| Page | What's on it |
|---|---|
| **Home** (`/`) | A short introduction: about me, how I work, and links to the other sections. |
| **Projects** (`/projects`) | Nine of my projects, each with screenshots, tech tags, a plain-language description, a more technical write-up, and links to the code and (where there is one) a live demo. |
| **Experience** (`/experience`) | My work history and education, with company and university logos. |
| **Contact** (`/contact`) | A form that sends me an email directly from the page. |

## Why it exists

A portfolio says more than a CV. It shows the actual projects, explains them in words that both technical and non-technical readers can follow, and links straight to the code. It's also a project in its own right: a small, fast, fully static Angular site.

---

## The big picture

```
┌──────────────────────────┐        ┌─────────────────────────────────────────────┐
│  Firebase Hosting        │  ───►  │  Visitor's browser — the Angular app        │
│  serves pre-built HTML   │        │                                             │
│  for every page          │        │   Project & experience content (in code)    │
│                          │        │   Screenshot lightbox                       │
└──────────────────────────┘        │   Contact form ──► EmailJS ──► my inbox     │
                                    └─────────────────────────────────────────────┘
```

There is no backend and no database. All content lives in the Angular components, and every page is built into a plain HTML file ahead of time.

---

## The building blocks

| Component | What it does |
|---|---|
| `home` | The introduction, with cards linking to Projects, Experience and Contact. |
| `projects` | The project list and the screenshot lightbox. The project data is a typed list in `projects.component.ts`. |
| `experience` | Work history and education. |
| `contact` | The validated contact form. |
| `navbar`, `hamburger-button`, `footer`, `page-not-found` | Navigation, the mobile menu, the footer and the 404 page. |

| Service | Job |
|---|---|
| `SendEmailService` | Sends the contact form through EmailJS. |
| `SeoService` | Sets each page's title, description, social-sharing tags and canonical address. |

### The projects shown

Imalo Education Website, Imalo Education Webapp, CRBRVS Website, TestBakery Sibiu, Customer Management System, Employee Management System, Local Network Discovery, Tool-Chip Contact Length and CV Builder.

Each project entry has the same shape:

```ts
{
  name: 'Customer Management System',
  tech: ['Angular', '.NET'],                       // tags shown next to the name
  description: '…',                                // plain-language introduction
  technical: '…',                                  // the more technical write-up (optional)
  features: [{ title: 'Secure login', text: '…' }, …],  // key features (optional)
  useCase: '…',                                    // a typical use case (optional)
  codeUrl: 'https://github.com/…',
  demoUrl: 'https://…',                            // optional; without it the Demo button is disabled
  images: ['…', '…'] or ['…', '…', '…', '…'],      // two or four screenshots
}
```

---

## How things work

### The screenshot lightbox

Every project has two or four screenshots in a grid. Clicking one opens it full size. You can move through that project's screenshots with the arrow buttons, the keyboard arrow keys, or a swipe on a touch screen.

### The contact form

The form checks the fields in the browser, then sends the message through **EmailJS**, a service that delivers emails from a web page using a template, so the site needs no mail server. The visitor sees a success or failure message.

### How the pages are built and served

Every route, including the 404 page, is **pre-rendered** at build time. Angular produces one finished HTML file per page, so:

- the first view appears instantly, with no waiting for JavaScript;
- search engines and link previews see the complete content;
- Firebase Hosting only has to serve plain files.

Unknown addresses get the pre-built 404 page with a real 404 status code.

---

## Packages and tools, and why they're used

| Package / tool | Why |
|---|---|
| `@angular/*` (core, router, forms, common) | The framework, routing and the contact form. |
| `@angular/ssr`, `@angular/platform-server` | Pre-rendering every page to static HTML at build time. |
| `@emailjs/browser` | Sends the contact form by email, straight from the browser. |
| `rxjs` | Async handling in Angular. |
| `vitest`, `jsdom` | Unit tests. |
| `eslint`, `angular-eslint`, `prettier` | Code style and formatting. |
| **Firebase Hosting** | Serves the site. |

The styling is plain CSS plus a small hand-picked subset of Bootstrap's grid and utility classes (`src/bootstrap-essentials.css`), so there's no full CSS framework to download. The font is **Space Grotesk**, self-hosted.

---

## Setting it up (for future me)

### What you need

- Node.js 22, 24 or 26 with npm
- Firebase CLI (`npm install -g firebase-tools`), only for deploying

### Run it

```bash
./run.sh               # dev server on http://localhost:4201, opens the browser
```

### Build and check

```bash
./build.sh             # npm ci, format check, lint, build, tests (--skip-tests to skip tests)
```

### Deploy

```bash
npm run build          # output: dist/dan-frunza-website/browser
firebase deploy        # Firebase project "dan-frunza" (.firebaserc)
```

`npm run build` also copies the pre-built `404/index.html` to `404.html`, which Firebase serves for unknown addresses.

### Where to change things

| To change… | Look in… |
|---|---|
| The projects | The `projects` list in `src/app/components/projects/projects.component.ts` |
| Project screenshots | `public/assets/images/projects/` |
| Work history and education | `src/app/components/experience/experience.component.html` |
| Company and university logos | `public/assets/company_logos/` |
| EmailJS keys | `src/environments/environment.ts` (public client-side keys, so no `.env` file) |
| Sitemap / robots | `src/sitemap.xml`, `src/robots.txt` |

---

## Decisions and why I made them

- **Fully static.** A portfolio doesn't change often, so there's no reason for a server. Static files are fast, free to host and have nothing to keep patched.
- **Content in code, not a CMS.** The projects are a typed TypeScript list, so a missing or misspelled field is caught at build time, and there's no content system to host.
- **Two levels of description per project.** A short, plain-language introduction for anyone, and a technical write-up for people who want the details.
- **EmailJS for the contact form.** Visitors can reach me without leaving the page, and I don't have to run a mail server.
- **Only the CSS that's needed.** A small slice of Bootstrap instead of the whole library keeps the download small.
- **Modern Angular.** Standalone components, signals, zoneless change detection and static pre-rendering, the same setup as my other Angular sites.

---

## Interesting bits

- **Disabled demo buttons.** Only the projects that run publicly (currently the Imalo Education Website and the CRBRVS Website) have a live demo link. The others show the Demo button greyed out instead of hiding it, so every project card has the same layout.
- **Swipe-friendly lightbox** on phones, keyboard-friendly on desktops.
- **Social previews.** Each page has its own title, description and Open Graph/Twitter tags, and a share image, so links look right in chat apps and on LinkedIn.
- **Add to home screen.** A web manifest and touch icons are included for phones.

## Glossary

| Term | Meaning |
|---|---|
| Pre-rendering | Building each page's HTML ahead of time instead of in the visitor's browser. |
| Lightbox | An overlay that shows an image full size on top of the page. |
| EmailJS | A service that sends emails from a web page using a template, without a mail server. |
| Open Graph | Tags that control how a link looks when shared on social media. |

Company logos in `public/assets/company_logos/` belong to their respective companies.
