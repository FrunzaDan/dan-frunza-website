import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

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
      image: '/assets/images/DanFrunza.png',
    });
  }
}
