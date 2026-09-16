import { Component } from '@angular/core';

interface Project {
  readonly tech: string;
  readonly name: string;
  readonly description: string;
}

@Component({
    selector: 'app-projects',
    imports: [],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  protected readonly projects: readonly Project[] = [
    { tech: 'Angular', name: 'Imalo Education', description: 'description' },
    { tech: 'Angular', name: 'Misam Sibiu', description: 'description' },
    { tech: 'Angular', name: 'CRBRVS', description: 'description' },
    { tech: 'Python', name: 'Tool-Chip Contact Length', description: 'description' },
    { tech: 'Angular, .NET', name: 'Customer Management System', description: 'description' },
    { tech: 'Angular', name: 'And of course, this website', description: 'description' },
  ];
}
