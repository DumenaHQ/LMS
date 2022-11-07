import { Component } from '@angular/core';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dumena';

  constructor(private seoService: SeoService) {
    // Update the routes Title
    this.seoService.updateTitle();
  }
}
