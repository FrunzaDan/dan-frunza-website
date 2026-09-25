import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Project {
  readonly tech: string;
  readonly name: string;
  readonly description: string;
  readonly codeUrl: string;
  readonly demoUrl: string;
  readonly demoDisabled: boolean;
  readonly img1: string;
  readonly img2: string;
}

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  protected readonly projects: readonly Project[] = [
    {
      tech: 'Angular',
      name: 'Imalo Education Website',
      description: 'description',
      codeUrl: 'https://github.com/FrunzaDan/imalo-education',
      demoUrl: 'https://imalo-education.web.app',
      demoDisabled: false,
      img1: '../../../assets/images/projects/imalo-website-1.png',
      img2: '../../../assets/images/projects/imalo-website-2.png',
    },
    {
      tech: 'Angular, .NET',
      name: 'Imalo Education Webapp',
      description: 'description',
      codeUrl: 'https://github.com/FrunzaDan/imalo-education',
      demoUrl: 'https://imalo-education.web.app',
      demoDisabled: false,
      img1: '../../../assets/images/projects/16-9.jpg',
      img2: '../../../assets/images/projects/16-9.jpg',
    },
    {
      tech: 'Angular',
      name: 'CRBRVS Website',
      description: 'description',
      codeUrl: 'https://github.com/FrunzaDan/crbrvs',
      demoUrl: '',
      demoDisabled: false,
      img1: '../../../assets/images/projects/crbrvs-1.png',
      img2: '../../../assets/images/projects/crbrvs-2.png',
    },
    {
      tech: 'Angular',
      name: 'TestBakery Sibiu',
      description: 'description',
      codeUrl: 'https://github.com/FrunzaDan/misam-sibiu',
      demoUrl: '',
      demoDisabled: true,
      img1: '../../../assets/images/projects/16-9.jpg',
      img2: '../../../assets/images/projects/16-9.jpg',
    },
    {
      tech: 'Angular, .NET',
      name: 'Customer Management System',
      description: 'description',
      codeUrl: 'https://github.com/FrunzaDan/customer-management-system',
      demoUrl: '',
      // Private enterprise system, no public demo available.
      demoDisabled: true,
      img1: '../../../assets/images/projects/16-9.jpg',
      img2: '../../../assets/images/projects/16-9.jpg',
    },
    {
      tech: 'Angular, .NET',
      name: 'Local Network Discovery',
      description: 'description',
      codeUrl: 'https://github.com/FrunzaDan/local-network-discovery',
      demoUrl: '',
      // Private enterprise system, no public demo available.
      demoDisabled: true,
      img1: '../../../assets/images/projects/16-9.jpg',
      img2: '../../../assets/images/projects/16-9.jpg',
    },
    {
      tech: 'Python',
      name: 'Tool-Chip Contact Length',
      description: 'description',
      codeUrl: 'https://github.com/FrunzaDan/tool-chip-contact-length',
      demoUrl: '',
      // Research script, not a hosted web app.
      demoDisabled: true,
      img1: '../../../assets/images/projects/16-9.jpg',
      img2: '../../../assets/images/projects/16-9.jpg',
    },
    {
      tech: 'HTML, CSS, JS',
      name: 'CV Builder',
      description: 'description',
      codeUrl: 'https://github.com/FrunzaDan/cv-builder',
      demoUrl: '',
      demoDisabled: true,
      img1: '../../../assets/images/projects/16-9.jpg',
      img2: '../../../assets/images/projects/16-9.jpg',
    },

    {
      tech: 'Angular',
      name: 'And of course, this website',
      description: 'description',
      codeUrl: 'https://github.com/FrunzaDan/DanFrunza_Website',
      demoUrl: '/',
      demoDisabled: false,
      img1: '../../../assets/images/projects/16-9.jpg',
      img2: '../../../assets/images/projects/16-9.jpg',
    },
  ];
}
