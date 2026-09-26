import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../services/seo.service';

interface Project {
  readonly tech: string;
  readonly name: string;
  readonly description: string;
  readonly codeUrl: string;
  /** Where the project runs publicly; projects without one show a disabled Demo button. */
  readonly demoUrl?: string;
  readonly img1: string;
  readonly img2: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  protected readonly projects: readonly Project[] = [
    {
      tech: 'Angular',
      name: 'Imalo Education Website',
      description:
        "The website of Imalo Education, a German-language afterschool program in Sibiu. It presents the program's offer, weekly schedule and photo gallery in both Romanian and German, and has a contact form that sends emails straight from the browser through EmailJS. Built with Angular using standalone components, zoneless change detection and Signals, prerendered with SSR for speed and SEO, and hosted on Firebase.",
      codeUrl: 'https://github.com/FrunzaDan/imalo-education-website',
      demoUrl: 'https://imalo-education.web.app',
      img1: '/assets/images/projects/imalo-website-1.webp',
      img2: '/assets/images/projects/imalo-website-2.webp',
    },
    {
      tech: 'Angular, .NET',
      name: 'Imalo Education Webapp',
      description:
        'A full-stack app that the Imalo afterschool program can use to manage its scholars, their weekly pick-up schedules and daily attendance. The Angular 22 frontend (SSR, zoneless, Signals) talks only over HTTP to an ASP.NET Core Web API on .NET 10, which reads and writes a SQL Server database with raw ADO.NET, no ORM. The database schema is an SSDT project deployed with sqlpackage, and a single script starts the SQL Server Docker container, deploys the schema and runs both the API and the UI.',
      codeUrl: 'https://github.com/FrunzaDan/imalo-education-webapp',
      demoUrl: 'https://imalo-education.web.app',
      img1: '/assets/images/projects/16-9.webp',
      img2: '/assets/images/projects/16-9.webp',
    },
    {
      tech: 'Angular',
      name: 'CRBRVS Website',
      description:
        "The official website of the rap artist CRBRVS. It has a custom audio player (seek, drag-to-seek and keyboard controls) for listening to the artist's songs, a merch section and a contact form. Built with Angular 22, zoneless and signal-based, rendered with SSR and prerendering, hosted on Firebase, and covered by 85 unit tests with Vitest.",
      codeUrl: 'https://github.com/FrunzaDan/crbrvs-website',
      demoUrl: 'https://crbrvsraphive.com',
      img1: '/assets/images/projects/crbrvs-1.webp',
      img2: '/assets/images/projects/crbrvs-2.webp',
    },
    {
      tech: 'Angular',
      name: 'TestBakery Sibiu',
      description:
        'An online store for a bakery in Sibiu: browse products by category, build a cart that is saved between visits, and place an order through a contact form that sends it by email. Built with Angular (SSR, zoneless, Signals). The product catalog loads from Firebase Realtime Database, with a session cache first and a static JSON file as a fallback, so the store still works if Firebase is slow or down.',
      codeUrl: 'https://github.com/FrunzaDan/misam-sibiu',
      img1: '/assets/images/projects/16-9.webp',
      img2: '/assets/images/projects/16-9.webp',
    },
    {
      tech: 'Angular, .NET',
      name: 'Customer Management System',
      description:
        'A full-stack app that a merchant can use to manage customer records, with a real JWT login. It supports the full customer lifecycle (register, edit, deactivate, reactivate, delete), server-side search, sorting and paging, bulk actions, a per-customer and global audit log, product purchases per customer, and CSV export. The Angular 22 frontend (SSR, zoneless, Signals) calls a layered ASP.NET Core Web API on .NET 10 (controllers, business logic, data access, domain) that reaches SQL Server only through stored procedures. It is my playground for learning: over time it moved from NgModules and zone.js to Signals, and from unsalted password hashes to salted PBKDF2 with a rate-limited login.',
      codeUrl: 'https://github.com/FrunzaDan/customer-management-system',
      // Private enterprise system, no public demo available.
      img1: '/assets/images/projects/16-9.webp',
      img2: '/assets/images/projects/16-9.webp',
    },
    {
      tech: 'Angular, .NET',
      name: 'Employee Management System',
      description:
        'The twin of the Customer Management System, built for an employer to manage their staff. Besides the full employee lifecycle, audit log, server-side search and paging, bulk actions and CSV export, it models how an organization is structured: each employee has a hire date, office, department, cost center and a dated salary history. Offices, departments and cost centers each have their own pages showing headcount and total gross salary. Same stack and architecture: Angular 22 (SSR, zoneless, Signals), a layered ASP.NET Core Web API on .NET 10 with JWT authentication, and SQL Server accessed only through stored procedures.',
      codeUrl: 'https://github.com/FrunzaDan/employee-management-system',
      // Private enterprise system, no public demo available.
      img1: '/assets/images/projects/16-9.webp',
      img2: '/assets/images/projects/16-9.webp',
    },
    {
      tech: 'Angular, .NET',
      name: 'Local Network Discovery',
      description:
        'A network scanner that finds every device on a local network and figures out what each one is. The .NET 10 Web API runs a ping sweep, then for every device that responds it looks up the MAC address, vendor, hostname and NetBIOS name, scans TCP and UDP ports, and queries protocols like SNMP, UPnP, mDNS, SMB and IPP to guess the device type (router, printer, TV, smart bulb and so on). It also records network latency, jitter, packet loss and WiFi signal conditions. Scan progress streams live to an Angular 22 frontend through Server-Sent Events, and every device is stored in SQLite so the app remembers which devices were seen before and which are online now.',
      codeUrl: 'https://github.com/FrunzaDan/local-network-discovery',
      // Private enterprise system, no public demo available.
      img1: '/assets/images/projects/16-9.webp',
      img2: '/assets/images/projects/16-9.webp',
    },
    {
      tech: 'Python',
      name: 'Tool-Chip Contact Length',
      description:
        'A computer vision program that measures the tool-chip contact length in metal cutting: the distance a chip stays in contact with the cutting tool before it curls away. It processes a whole folder of high-speed camera frames. Each image goes through an OpenCV pipeline (crop, Otsu thresholding, morphological cleanup, Canny edges and contours, Hough line detection) to find the tool edge and the chip edge and measure the gap between them. For every frame it saves an annotated result image and a six-panel diagnostic plot showing each processing stage, so every measurement can be checked visually.',
      codeUrl: 'https://github.com/FrunzaDan/tool-chip-contact-length',
      // Research script, not a hosted web app.
      img1: '/assets/images/projects/16-9.webp',
      img2: '/assets/images/projects/16-9.webp',
    },
    {
      tech: 'HTML, CSS, JS',
      name: 'CV Builder',
      description:
        'A simple, browser-based CV/resume builder with no framework, build step or backend, just HTML, CSS and vanilla JavaScript. You fill in a form and see a live preview as you type. You can add work experience, education, skills, languages and a photo, and export the CV as a paginated PDF. Your data saves automatically in the browser and can be exported to or imported from a JSON file, so you can reuse and share it.',
      codeUrl: 'https://github.com/FrunzaDan/cv-builder',
      img1: '/assets/images/projects/16-9.webp',
      img2: '/assets/images/projects/16-9.webp',
    },

    {
      tech: 'Angular',
      name: 'And of course, this website',
      description:
        'My personal website and portfolio, where my experience, projects and contact details all live in one place. Built with Angular using standalone components and Signals, with per-page SEO and a responsive design that works on any screen size.',
      codeUrl: 'https://github.com/FrunzaDan/DanFrunza_Website',
      demoUrl: '/',
      img1: '/assets/images/projects/16-9.webp',
      img2: '/assets/images/projects/16-9.webp',
    },
  ];

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      description:
        'Projects built by Dan Frunza with Angular, .NET and Python, with live demos and source code.',
      path: '/projects',
    });
  }
}
