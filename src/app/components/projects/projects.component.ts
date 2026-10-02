import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { SeoService } from '../../services/seo.service';

interface ProjectFeature {
  readonly title: string;
  readonly text: string;
}

/** The project whose screenshots the lightbox is showing, and which one. */
interface EnlargedImage {
  readonly project: Project;
  readonly index: number;
}

interface Project {
  /** Shown as tags beside the project name. */
  readonly tech: readonly string[];
  readonly name: string;
  /** The non-technical introduction. */
  readonly description: string;
  readonly technical?: string;
  readonly features?: readonly ProjectFeature[];
  readonly useCase?: string;
  readonly codeUrl: string;
  /** Where the project runs publicly; projects without one show a disabled Demo button. */
  readonly demoUrl?: string;
  /** Screenshots shown in a two-column grid: two fill one row, four make a 2×2 grid. */
  readonly images:
    readonly [string, string] | readonly [string, string, string, string];
}

/** How far a finger has to travel sideways before it counts as a swipe. */
const SWIPE_THRESHOLD_PX = 50;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  protected readonly projects: readonly Project[] = [
    {
      tech: ['Angular'],
      name: 'Imalo Education Website',
      description:
        'Imalo is a German-language afterschool program for children in Sibiu, Romania. Its website is where parents first meet it: what the program offers, the daily schedule, a photo gallery and a way to get in touch. Everything is available in both Romanian and German.',
      technical:
        'Built with Angular using standalone components, zoneless change detection and Signals, prerendered with SSR for speed and SEO, and hosted on Firebase. The contact form sends emails straight from the browser through EmailJS, with no backend of its own.',
      features: [
        {
          title: 'Two languages',
          text: 'every page switches between Romanian and German with one toggle.',
        },
        {
          title: 'Photo gallery',
          text: 'a full-screen gallery of life at Imalo, navigable with the mouse or the keyboard.',
        },
        {
          title: 'Contact form',
          text: "questions from parents go straight to Imalo's inbox.",
        },
      ],
      useCase:
        'A parent finds Imalo online, reads about the program in German and sends a question through the contact form.',
      codeUrl: 'https://github.com/FrunzaDan/imalo-education-website',
      demoUrl: 'https://imalo-education.web.app',
      images: [
        '/assets/images/projects/imalo-website-1.webp',
        '/assets/images/projects/imalo-website-2.webp',
      ],
    },
    {
      tech: ['Angular', '.NET'],
      name: 'Imalo Education Webapp',
      description:
        'The staff side of Imalo: a web app that keeps track of every child in the afterschool program. It records who picks each child up and when, which days they came, and what lunch and transport cost. Everything the team needs to know about a child is in one place.',
      technical:
        'The Angular 22 frontend (SSR, zoneless, Signals) talks only over HTTP to an ASP.NET Core Web API on .NET 10, which reads and writes a SQL Server database with raw ADO.NET, no ORM. The schema is an SSDT project deployed with sqlpackage, and both the UI and the API are covered by unit tests.',
      features: [
        {
          title: 'Dashboard',
          text: "the day at a glance: key numbers, today's pick-ups, upcoming birthdays and recent activity.",
        },
        {
          title: 'Scholar records',
          text: 'school, class, gender, birth date, parents and phone numbers, in a searchable, sortable list that exports to CSV.',
        },
        {
          title: 'Pick-up timeline',
          text: "every child's weekly pick-up times in 15-minute slots, colored by school, so busy moments are visible in advance.",
        },
        {
          title: 'Attendance and costs',
          text: 'a monthly grid for all children and an editable month per child, recording presence, lunch and transport along with their cost.',
        },
        {
          title: 'Charts',
          text: 'hand-built charts, with no chart library, of children by school, class and gender, attendance trends and monthly costs.',
        },
        {
          title: 'Audit log and safeguards',
          text: 'a history of every change, per child and overall, a warning before leaving a form with unsaved changes, and a banner if the API goes down.',
        },
      ],
      useCase:
        'When a child enrols, the staff add them to the app, set their pick-up times and tick off attendance each day. At the end of the month they see exactly what lunch and transport cost.',
      codeUrl: 'https://github.com/FrunzaDan/imalo-education-webapp',
      demoUrl: 'https://imalo-education.web.app',
      images: [
        '/assets/images/projects/imalo-edu-wa-1.webp',
        '/assets/images/projects/imalo-edu-wa-2.webp',
        '/assets/images/projects/imalo-edu-wa-3.webp',
        '/assets/images/projects/imalo-edu-wa-4.webp',
      ],
    },
    {
      tech: ['Angular'],
      name: 'CRBRVS Website',
      description:
        "The official website of the rap artist CRBRVS. Fans can listen to the music right on the page, browse the merch and get in touch for bookings or collaborations. It's a single scrolling page that shows off the artist's style.",
      technical:
        'Built with Angular 22, zoneless and signal-based, rendered with SSR and prerendering, and hosted on Firebase. It is covered by 85 unit tests with Vitest, including ones that simulate clicks and dragging in the audio player.',
      features: [
        {
          title: 'Custom audio player',
          text: 'play, seek, drag-to-seek and keyboard controls.',
        },
        {
          title: 'Merch',
          text: "a showcase of the artist's merchandise.",
        },
        {
          title: 'Contact form',
          text: "booking and collaboration requests go straight to the artist's email.",
        },
      ],
      useCase:
        'An event organizer hears a track, listens to the rest in the player and sends a booking request through the contact form, all without leaving the page.',
      codeUrl: 'https://github.com/FrunzaDan/crbrvs-website',
      demoUrl: 'https://crbrvsraphive.com',
      images: [
        '/assets/images/projects/crbrvs-1.webp',
        '/assets/images/projects/crbrvs-2.webp',
      ],
    },
    {
      tech: ['Angular'],
      name: 'TestBakery Sibiu',
      description:
        'An online storefront for a bakery in Sibiu. Visitors browse the products by category and put together a cart. The order is sent through a contact form and confirmed by email, with no online payment involved.',
      technical:
        'Built with Angular (SSR, zoneless, Signals). The product catalog loads from Firebase Realtime Database, with a session cache first and a static JSON file as a fallback, so the store still works if Firebase is slow or down.',
      features: [
        {
          title: 'Browse by category',
          text: 'products grouped by category, with a search.',
        },
        {
          title: 'Saved cart',
          text: 'the cart is kept between visits.',
        },
        {
          title: 'Order by email',
          text: "orders and questions go straight to the bakery's inbox.",
        },
      ],
      useCase:
        'A customer planning a birthday picks a cake and two trays of pastries, sends the order with a pick-up date, and the bakery replies to confirm.',
      codeUrl: 'https://github.com/FrunzaDan/misam-sibiu',
      images: [
        '/assets/images/projects/bakery-1.webp',
        '/assets/images/projects/bakery-2.webp',
      ],
    },
    {
      tech: ['Angular', '.NET'],
      name: 'Customer Management System',
      description:
        'A web app a merchant can use to keep their customer records in one place: names, contact details, addresses and what each customer bought. Records sit behind a login and every change is tracked. It is also my playground for learning, so it keeps getting rebuilt with newer ideas.',
      technical:
        'The Angular 22 frontend (SSR, zoneless, Signals) calls a layered ASP.NET Core Web API on .NET 10 (controllers, business logic, data access, domain) with JWT authentication, which reaches SQL Server only through stored procedures. Over time it moved from NgModules and zone.js to Signals, and from unsalted password hashes to salted PBKDF2 with a rate-limited login.',
      features: [
        {
          title: 'Secure login',
          text: 'hashed passwords, short-lived session tokens and a rate limit on login attempts.',
        },
        {
          title: 'Fast, searchable lists',
          text: 'the database searches, sorts and pages the records, and the current view exports to CSV.',
        },
        {
          title: 'Safe lifecycle',
          text: 'a customer has to be deactivated before being deleted, and bulk actions handle a whole selection with one confirmation.',
        },
        {
          title: 'Audit log',
          text: 'a per-customer and global history of what changed, who changed it and when.',
        },
        {
          title: 'Products and purchases',
          text: 'a 50-product catalog with the purchases of each customer, and stock and buyers per product.',
        },
        {
          title: 'Demo data and status',
          text: 'a test mode that generates realistic sample customers in one click, and a live banner if the API stops responding.',
        },
      ],
      useCase:
        'A shop owner looks up a returning customer, sees which products they bought and when, and updates their address.',
      codeUrl: 'https://github.com/FrunzaDan/customer-management-system',
      // Private enterprise system, no public demo available.
      images: [
        '/assets/images/projects/cms-1.webp',
        '/assets/images/projects/cms-2.webp',
        '/assets/images/projects/cms-3.webp',
        '/assets/images/projects/cms-4.webp',
      ],
    },
    {
      tech: ['Angular', '.NET'],
      name: 'Employee Management System',
      description:
        "The twin of the Customer Management System, built for an employer to manage their staff. It keeps each employee's contact details, office, department and salary history in one place. Records sit behind a login and every change is tracked.",
      technical:
        'Same stack and architecture: Angular 22 (SSR, zoneless, Signals), a layered ASP.NET Core Web API on .NET 10 with JWT authentication, and SQL Server accessed only through stored procedures. Both apps share naming and data conventions, so what is learned in one carries straight over to the other.',
      features: [
        {
          title: 'Secure login',
          text: 'hashed passwords, short-lived session tokens and a rate limit on login attempts.',
        },
        {
          title: 'Fast, searchable lists',
          text: 'the database searches, sorts and pages the records, and the current view exports to CSV.',
        },
        {
          title: 'Safe lifecycle',
          text: 'an employee has to be deactivated before being deleted, and bulk actions handle a whole selection with one confirmation.',
        },
        {
          title: 'Audit log',
          text: 'a per-employee and global history of what changed, who changed it and when, including salary changes.',
        },
        {
          title: 'Organization structure',
          text: 'offices, departments and cost centers with headcount and total gross salary, plus a dated salary history per employee.',
        },
        {
          title: 'Demo data and status',
          text: 'a test mode that generates realistic sample employees in one click, and a live banner if the API stops responding.',
        },
      ],
      useCase:
        'HR gives an employee a raise: the new salary is dated, appears in their salary history and is recorded in the audit log.',
      codeUrl: 'https://github.com/FrunzaDan/employee-management-system',
      // Private enterprise system, no public demo available.
      images: [
        '/assets/images/projects/ems-1.webp',
        '/assets/images/projects/ems-2.webp',
        '/assets/images/projects/ems-3.webp',
        '/assets/images/projects/ems-4.webp',
      ],
    },
    {
      tech: ['Angular', '.NET'],
      name: 'Local Network Discovery',
      description:
        'A scanner that finds every device on your home or office network and works out what each one is: a router, a printer, a TV, a smart bulb. It shows the name, maker and open services of each device, along with how healthy the network is. It also remembers past scans, so you can tell which devices are new and which have gone offline.',
      technical:
        'A .NET 10 Web API runs a ping sweep, then enriches each responding host with ARP, DNS/mDNS, NetBIOS, TCP/UDP port scans and hand-rolled SNMP, UPnP and HTTP-banner probes, storing every device in SQLite. The Angular 22 frontend (zoneless, Signals) follows the scan live through Server-Sent Events, and both halves are covered by unit tests.',
      features: [
        {
          title: 'Device identification',
          text: 'MAC vendor, hostname, open ports and protocol replies combine into a best guess of what each device is.',
        },
        {
          title: 'Live progress',
          text: 'every phase of the scan, host by host, streams to the page as it happens.',
        },
        {
          title: 'Network conditions',
          text: 'latency, jitter, packet loss and the WiFi signal, channel and noise of the scanning machine.',
        },
        {
          title: 'Device history',
          text: 'every device ever seen is remembered, with when it was first and last seen and whether it is online now.',
        },
        {
          title: 'Printer and smart-device details',
          text: 'model, serial number, page count and toner level from printers, plus friendly names from TVs, bulbs and media devices.',
        },
        {
          title: 'Live API log',
          text: 'a panel that streams what the scanner is doing behind the scenes, line by line.',
        },
      ],
      useCase:
        'Someone notices their WiFi is slow, runs a scan and finds an unknown device on the network, along with high packet loss on a crowded channel.',
      codeUrl: 'https://github.com/FrunzaDan/local-network-discovery',
      // Runs on the local network it scans, so there is no public demo.
      images: [
        '/assets/images/projects/lnd-1.webp',
        '/assets/images/projects/lnd-2.webp',
      ],
    },
    {
      tech: ['Python'],
      name: 'Tool-Chip Contact Length',
      description:
        'When a machine tool cuts metal, the chip it peels off touches the tool for a short distance before curling away, and that distance matters for tool wear and cutting quality. This program measures it automatically from high-speed camera photos. What used to be measured by hand, frame by frame, now takes one command.',
      technical:
        'A Python batch pipeline built on OpenCV and NumPy: it isolates the tool and the chip with Otsu thresholding and morphological cleanup, then finds their edges with Canny and the two key straight lines with a Hough transform. It is covered by pytest unit tests and checked with Ruff and mypy.',
      features: [
        {
          title: 'Batch processing',
          text: 'measures every camera frame in a folder in one run.',
        },
        {
          title: 'Automatic image cleanup',
          text: 'each photo is cropped, turned black and white and smoothed, so the tool and the chip stand out.',
        },
        {
          title: 'Line detection',
          text: "finds the tool's edge and the chip's edge and measures the gap between them in pixels.",
        },
        {
          title: 'Annotated results',
          text: "saves each measured frame with the lines and the contact length drawn on it, and skips frames where both edges can't be found instead of guessing.",
        },
        {
          title: 'Step-by-step diagnostics',
          text: 'a six-panel plot per frame shows every processing stage, so each result can be checked visually.',
        },
        {
          title: 'One-command setup and logs',
          text: 'one script finds Python, installs anything missing, runs the program and logs a summary of images processed, results produced and time taken.',
        },
      ],
      useCase:
        'A research team films a cutting test at thousands of frames per second, drops the images into a folder and runs one command, getting a measured, annotated image for every frame.',
      codeUrl: 'https://github.com/FrunzaDan/tool-chip-contact-length',
      // Research script, not a hosted web app.
      images: [
        '/assets/images/projects/tccl-1.webp',
        '/assets/images/projects/tccl-2.webp',
      ],
    },
    {
      tech: ['HTML', 'CSS', 'JS'],
      name: 'CV Builder',
      description:
        'A simple tool for writing a CV right in the browser. You fill in your details and watch the CV take shape next to the form as you type. When it looks right, you download it as a PDF, ready to send.',
      technical:
        'Written in plain HTML, CSS and vanilla JavaScript, with no framework, build step or backend: it runs by opening a single page. The PDF is generated in the browser with html2pdf.js and split into proper pages, and all data stays on your own device.',
      features: [
        {
          title: 'Live preview',
          text: 'the CV updates as you type, with sections for work experience, education, skills, languages and a photo.',
        },
        {
          title: 'PDF export',
          text: 'download the finished CV as a paginated PDF in one click.',
        },
        {
          title: 'Saved and portable',
          text: 'your data saves automatically in the browser and can be exported to or imported from a JSON file, so you can reuse and share it.',
        },
      ],
      useCase:
        'A job seeker fills in their CV once, downloads it as a PDF for an application, and keeps the JSON file to tweak it for the next one.',
      codeUrl: 'https://github.com/FrunzaDan/cv-builder',
      images: [
        '/assets/images/projects/cvbuilder-1.webp',
        '/assets/images/projects/cvbuilder-2.webp',
      ],
    },
  ];

  // TODO: replace with the real channel URL.
  protected readonly youtubeUrl = 'https://www.youtube.com/';
  protected readonly githubUrl = 'https://github.com/FrunzaDan';

  /** The screenshot shown full size in the lightbox, if any. */
  protected readonly enlarged = signal<EnlargedImage | null>(null);

  protected readonly enlargedSrc = computed(() => {
    const enlarged = this.enlarged();
    return enlarged ? enlarged.project.images[enlarged.index] : null;
  });

  private touchStartX = 0;

  protected imageAlt(project: Project, index: number): string {
    return `Screenshot ${index + 1} of ${project.images.length} of ${project.name}`;
  }

  protected openImage(
    lightbox: HTMLDialogElement,
    project: Project,
    index: number,
  ): void {
    this.enlarged.set({ project, index });
    lightbox.showModal();
  }

  /** Steps to the previous (-1) or next (1) screenshot, wrapping around at either end. */
  protected step(direction: -1 | 1): void {
    this.enlarged.update((enlarged) => {
      if (!enlarged) return enlarged;
      const count = enlarged.project.images.length;
      return { ...enlarged, index: (enlarged.index + direction + count) % count };
    });
  }

  protected onLightboxKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') this.step(-1);
    else if (event.key === 'ArrowRight') this.step(1);
  }

  protected onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  protected onTouchEnd(event: TouchEvent): void {
    const swipeDistance = this.touchStartX - event.changedTouches[0].screenX;
    if (Math.abs(swipeDistance) > SWIPE_THRESHOLD_PX) {
      this.step(swipeDistance > 0 ? 1 : -1);
    }
  }

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      description:
        'Projects built by Dan Frunza with Angular, .NET and Python, with live demos and source code.',
      path: '/projects',
    });
  }
}
