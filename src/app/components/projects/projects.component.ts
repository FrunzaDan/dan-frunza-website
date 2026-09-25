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
      description: 'description',
      codeUrl: 'https://github.com/FrunzaDan/imalo-education',
      demoUrl: 'https://imalo-education.web.app',
      img1: '/assets/images/projects/imalo-website-1.webp',
      img2: '/assets/images/projects/imalo-website-2.webp',
    },
    {
      tech: 'Angular, .NET',
      name: 'Imalo Education Webapp',
      description: 'description',
      codeUrl: 'https://github.com/FrunzaDan/imalo-education',
      demoUrl: 'https://imalo-education.web.app',
      img1: '/assets/images/projects/16-9.webp',
      img2: '/assets/images/projects/16-9.webp',
    },
    {
      tech: 'Angular',
      name: 'CRBRVS Website',
      description: 'description',
      codeUrl: 'https://github.com/FrunzaDan/crbrvs',
      demoUrl: 'https://crbrvsraphive.com',
      img1: '/assets/images/projects/crbrvs-1.webp',
      img2: '/assets/images/projects/crbrvs-2.webp',
    },
    {
      tech: 'Angular',
      name: 'TestBakery Sibiu',
      description: 'description',
      codeUrl: 'https://github.com/FrunzaDan/misam-sibiu',
      img1: '/assets/images/projects/16-9.webp',
      img2: '/assets/images/projects/16-9.webp',
    },
    {
      tech: 'Angular, .NET',
      name: 'Customer Management System',
      description: 'description',
      codeUrl: 'https://github.com/FrunzaDan/customer-management-system',
      // Private enterprise system, no public demo available.
      img1: '/assets/images/projects/16-9.webp',
      img2: '/assets/images/projects/16-9.webp',
    },
    {
      tech: 'Angular, .NET',
      name: 'Local Network Discovery',
      description: 'description',
      codeUrl: 'https://github.com/FrunzaDan/local-network-discovery',
      // Private enterprise system, no public demo available.
      img1: '/assets/images/projects/16-9.webp',
      img2: '/assets/images/projects/16-9.webp',
    },
    {
      tech: 'Python',
      name: 'Tool-Chip Contact Length',
      description: 'description',
      codeUrl: 'https://github.com/FrunzaDan/tool-chip-contact-length',
      // Research script, not a hosted web app.
      img1: '/assets/images/projects/16-9.webp',
      img2: '/assets/images/projects/16-9.webp',
    },
    {
      tech: 'HTML, CSS, JS',
      name: 'CV Builder',
      description: 'description',
      codeUrl: 'https://github.com/FrunzaDan/cv-builder',
      img1: '/assets/images/projects/16-9.webp',
      img2: '/assets/images/projects/16-9.webp',
    },

    {
      tech: 'Angular',
      name: 'And of course, this website',
      description: 'description',
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
