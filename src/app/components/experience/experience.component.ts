import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../services/seo.service';

/** A logo and its size in pixels, so the page keeps its space before it loads. */
interface CompanyLogo {
  readonly src: string;
  readonly width: number;
  readonly height: number;
}

interface ExperienceItem {
  readonly year: string;
  readonly company: string;
  readonly companyUrl: string;
  readonly companyLogo: CompanyLogo;
  readonly role: string;
  readonly description: string;
  readonly bullets?: readonly string[];
}

interface SkillGroup {
  readonly heading: string;
  /** Strongest first. */
  readonly skills: readonly string[];
}

interface ExperienceSection {
  readonly heading: string;
  readonly items: readonly ExperienceItem[];
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  protected readonly sections: readonly ExperienceSection[] = [
    {
      heading: 'Experience',
      items: [
        {
          year: '2023',
          company: 'baramundi software GmbH',
          companyUrl: 'https://www.baramundi.com/',
          companyLogo: {
            src: '/assets/company_logos/baramundi_logo.png',
            width: 400,
            height: 113,
          },
          role: '.NET Developer',
          description:
            "At this German company I'm developing various modules of a complex Unified Endpoint, Enterprise Mobility and Mobile Device Management software using mainly .NET MAUI, WPF or Angular.",
        },
        {
          year: '2022',
          company: 'Alphacomm B.V.',
          companyUrl: 'https://alphacomm.io/',
          companyLogo: {
            src: '/assets/company_logos/alphacomm_logo.png',
            width: 469,
            height: 94,
          },
          role: '.NET Developer',
          description:
            'Working for this Dutch fintech company I developed financial software for various merchants using microservice based architecture, layering and separating the frontend in Angular or Razor, and the backend in .NET APIs.',
        },
        {
          year: '2020',
          company: 'Bertrandt A.G.',
          companyUrl: 'https://www.bertrandt.com/',
          companyLogo: {
            src: '/assets/company_logos/Bertrandt_logo.png',
            width: 1200,
            height: 125,
          },
          role: 'Software Developer',
          description:
            'While working for this automotive-focused corporation I started by mainly writing Python scripts in order to automate aerodynamic simulations. I also had the opportunity to touch a little bit of embedded code, which was responsible for the CAN, LIN and Flexray communication throughout the cars.',
        },
        {
          year: '2019',
          company: 'Guehring K.G.',
          companyUrl: 'https://www.guhring.com/',
          companyLogo: {
            src: '/assets/company_logos/Guhring_logo.png',
            width: 300,
            height: 38,
          },
          role: '.NET Developer',
          description:
            'This was my first experience dealing with real situations of coding in the .NET Environment. I was responsible for automating the technical blueprints of tools, the C# and VB.NET NXOpen API.',
        },
        {
          year: '2019',
          company: 'Fraunhofer IPA',
          companyUrl: 'https://www.ipa.fraunhofer.de/',
          companyLogo: {
            src: '/assets/company_logos/FraunhoferIPA_logo.png',
            width: 709,
            height: 194,
          },
          role: '.NET Intern',
          description:
            'At this Fraunhofer Institute internship, I had to simulate the pathfinding capabilities of AGVs using various pathfinding algorithms in C# and Unity.',
        },
        {
          year: '2018',
          company: 'Bielomatik GmbH',
          companyUrl: 'https://www.bielomatik.com/',
          companyLogo: {
            src: '/assets/company_logos/bielomatik_logo.png',
            width: 307,
            height: 76,
          },
          role: 'Design Intern',
          description:
            'This internship at Bielomatik had a positive impact on my design abilities, which reflected themselves later as better frontend skills.',
        },
      ],
    },
    {
      heading: 'Education',
      items: [
        {
          year: '2020 – 2022',
          company: 'Lucian Blaga University of Sibiu',
          companyUrl: 'https://www.ulbsibiu.ro/en/',
          companyLogo: {
            src: '/assets/company_logos/ULBS_logo.png',
            width: 400,
            height: 119,
          },
          role: "Master's Degree",
          description:
            "Master's degree focused on advanced computer science topics, including image processing, data mining and artificial intelligence.",
          bullets: [
            'Digital image processing',
            'Data Mining',
            'Computer architecture',
            'Artificial Intelligence',
          ],
        },
        {
          year: '2016 – 2020',
          company: 'Technical University of Cluj\u2011Napoca',
          companyUrl: 'https://www.utcluj.ro/en/',
          companyLogo: {
            src: '/assets/company_logos/UTCN_logo.png',
            width: 400,
            height: 124,
          },
          role: "Bachelor's Degree",
          description:
            "Bachelor's degree combining industrial programming with hardware-focused development and CAD scripting.",
          bullets: [
            'Industry focused databases',
            'Industrial programming',
            'CAD APIs and CAD scripting',
            'Hardware-focused development',
          ],
        },
      ],
    },
  ];

  protected readonly skillGroups: readonly SkillGroup[] = [
    {
      heading: 'Tech Skills',
      skills: [
        'Microservices',
        'Web APIs',
        '.NET',
        'C#',
        'Databases',
        'HTML',
        'CSS',
        'JavaScript',
        'Angular',
        'Blazor',
        'Razor',
      ],
    },
    {
      heading: 'Soft Skills',
      skills: [
        'Communication',
        'Teamwork',
        'Problem-solving',
        'Creativity',
        'Adaptability',
        'Time management',
      ],
    },
  ];

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      description:
        'Work experience, education and skills of Dan Frunza, a .NET and Angular developer.',
      path: '/experience',
    });
  }
}
