import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

/** Where the site is published; canonical links and social previews point here. */
export const SITE_URL = 'https://dan-frunza.web.app';

export interface SeoMetaConfig {
  description: string;
  /** The page's path, such as `/404`. */
  path: string;
  /** A picture for link previews, such as `/assets/images/DanFrunza.png`. */
  image?: string;
  robots?: string;
  /** The Open Graph locale of the page's text, `en_US` unless given. */
  locale?: string;
  /** Makes the page an Open Graph `profile` of this person; otherwise it is a `website`. */
  profile?: { firstName: string; lastName: string };
  /** Schema.org data for search engines, written into the page as JSON-LD. */
  structuredData?: object;
}

const STRUCTURED_DATA_ID = 'structured-data';

const DEFAULT_ROBOTS =
  'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  /** Call after the page title is set, since the social title is copied from it. */
  updateMetaTags(config: SeoMetaConfig): void {
    const title = this.document.title;
    const url = SITE_URL + (config.path === '/' ? '' : config.path);

    this.meta.updateTag({ name: 'description', content: config.description });
    const robots = config.robots ?? DEFAULT_ROBOTS;
    this.meta.updateTag({ name: 'robots', content: robots });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({
      property: 'og:description',
      content: config.description,
    });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({
      property: 'og:locale',
      content: config.locale ?? 'en_US',
    });
    this.updateProfileTags(config.profile);
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: config.description,
    });

    if (config.image) {
      this.meta.updateTag({
        property: 'og:image',
        content: SITE_URL + config.image,
      });
      this.meta.updateTag({
        name: 'twitter:image',
        content: SITE_URL + config.image,
      });
    }

    // A page kept out of search results has no address to point search engines to.
    if (robots.includes('noindex')) {
      this.document.querySelector('link[rel="canonical"]')?.remove();
    } else {
      this.updateCanonicalUrl(url);
    }
    this.updateStructuredData(config.structuredData);
  }

  private updateProfileTags(profile: SeoMetaConfig['profile']): void {
    this.meta.updateTag({
      property: 'og:type',
      content: profile ? 'profile' : 'website',
    });
    if (profile) {
      this.meta.updateTag({
        property: 'profile:first_name',
        content: profile.firstName,
      });
      this.meta.updateTag({
        property: 'profile:last_name',
        content: profile.lastName,
      });
    } else {
      this.meta.removeTag('property="profile:first_name"');
      this.meta.removeTag('property="profile:last_name"');
    }
  }

  /** Pages without structured data drop the previous page's, so it never describes the wrong page. */
  private updateStructuredData(data: object | undefined): void {
    let script = this.document.getElementById(STRUCTURED_DATA_ID);
    if (!data) {
      script?.remove();
      return;
    }
    if (!script) {
      script = this.document.createElement('script');
      script.id = STRUCTURED_DATA_ID;
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }

  private updateCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector(
      'link[rel="canonical"]',
    );
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
