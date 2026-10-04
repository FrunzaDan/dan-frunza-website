import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar.component';

@Component({ template: '' })
class EmptyPage {}

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;

  const toggler = () =>
    fixture.nativeElement.querySelector('.navbar-toggler') as HTMLButtonElement;
  const menu = () =>
    fixture.nativeElement.querySelector('#main-nav') as HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([{ path: '**', component: EmptyPage }])],
    });
    fixture = TestBed.createComponent(NavbarComponent);
    await fixture.whenStable();
  });

  it('starts with the menu closed', () => {
    expect(menu().classList).not.toContain('show');
    expect(toggler().getAttribute('aria-expanded')).toBe('false');
    expect(toggler().getAttribute('aria-controls')).toBe('main-nav');
  });

  it('opens and closes the menu with the hamburger button', async () => {
    toggler().click();
    await fixture.whenStable();

    expect(menu().classList).toContain('show');
    expect(toggler().getAttribute('aria-expanded')).toBe('true');

    toggler().click();
    await fixture.whenStable();

    expect(menu().classList).not.toContain('show');
  });

  it('closes the menu when a link is followed', async () => {
    toggler().click();
    await fixture.whenStable();

    (menu().querySelector('a') as HTMLAnchorElement).click();
    await fixture.whenStable();

    expect(menu().classList).not.toContain('show');
  });
});
