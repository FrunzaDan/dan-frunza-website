import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
    title: 'Dan Frunza - .NET & Angular Developer',
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./components/projects/projects.component').then(
        (m) => m.ProjectsComponent,
      ),
    title: 'Projects - Dan Frunza',
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./components/experience/experience.component').then(
        (m) => m.ExperienceComponent,
      ),
    title: 'Experience - Dan Frunza',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./components/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
    title: 'Contact - Dan Frunza',
  },
  {
    path: '404',
    loadComponent: () =>
      import('./components/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent,
      ),
    title: '404 - Dan Frunza',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
