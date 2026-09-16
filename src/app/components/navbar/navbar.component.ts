import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface NavLink {
  readonly path: string;
  readonly label: string;
}

@Component({
    selector: 'app-navbar',
    imports: [RouterModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  protected readonly navLinks: readonly NavLink[] = [
    { path: 'projects', label: 'Projects' },
    { path: 'experience', label: 'Experience' },
    { path: 'contact', label: 'Contact' },
  ];
}
