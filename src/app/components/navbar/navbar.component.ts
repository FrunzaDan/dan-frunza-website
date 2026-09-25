import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HamburgerButtonComponent } from '../hamburger-button/hamburger-button.component';

interface NavLink {
  readonly path: string;
  readonly label: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, HamburgerButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  protected readonly navLinks: readonly NavLink[] = [
    { path: '/projects', label: 'Projects' },
    { path: '/experience', label: 'Experience' },
    { path: '/contact', label: 'Contact' },
  ];

  readonly isMenuOpen = signal(false);

  onToggleMenu(isOpen: boolean): void {
    this.isMenuOpen.set(isOpen);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
