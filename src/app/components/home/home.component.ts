import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_URL, SeoService } from '../../services/seo.service';

const PERSON_ID = `${SITE_URL}/#person`;

/** Tells search engines this page is Dan's profile, on his website. */
const PROFILE_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Dan Frunza',
      inLanguage: 'en',
      publisher: { '@id': PERSON_ID },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: 'Dan Frunza - .NET & Angular Developer',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': PERSON_ID },
    },
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Dan Frunza',
      givenName: 'Dan',
      familyName: 'Frunza',
      jobTitle: '.NET & Angular Developer',
      description:
        'Software developer based in Sibiu, Romania, building web applications with .NET and Angular.',
      image: `${SITE_URL}/assets/images/DanFrunza.png`,
      url: SITE_URL,
      email: 'mailto:frunzadan96@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sibiu',
        addressCountry: 'RO',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'baramundi software GmbH',
        url: 'https://www.baramundi.com/',
      },
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'Lucian Blaga University of Sibiu',
          url: 'https://www.ulbsibiu.ro/en/',
        },
        {
          '@type': 'CollegeOrUniversity',
          name: 'Technical University of Cluj-Napoca',
          url: 'https://www.utcluj.ro/en/',
        },
      ],
      knowsAbout: ['.NET', 'C#', 'Angular', 'TypeScript', 'Web APIs'],
      sameAs: [
        'https://github.com/FrunzaDan',
        'https://www.linkedin.com/in/dan-frunza-745094116/',
        'https://www.youtube.com/@DanFrunza9',
        'https://www.facebook.com/frunza.dan.9',
      ],
    },
  ],
};

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      description:
        'Personal website of Dan Frunza, a .NET and Angular developer based in Sibiu, Romania. His projects, experience and contact details.',
      path: '/',
      image: '/assets/images/og-image.jpg',
      profile: { firstName: 'Dan', lastName: 'Frunza' },
      structuredData: PROFILE_STRUCTURED_DATA,
    });
  }
}
