import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface NavLink {
  readonly path: string;
  readonly label: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  protected readonly navLinks: readonly NavLink[] = [
    { path: 'projects', label: 'Projects' },
    { path: 'experience', label: 'Experience' },
    { path: 'contact', label: 'Contact' },
  ];
}
