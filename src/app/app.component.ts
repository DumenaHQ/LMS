import { Component, HostListener } from '@angular/core';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dumena';
  windowScrolled: boolean;


  constructor(private seoService: SeoService) {
    // Update the routes Title
    this.seoService.updateTitle();
  }

  // When user scroll 300 away from the top of the document
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      this.windowScrolled = true;
    }
    else {
      this.windowScrolled = false;
    }
  }

  // Scroll Up
  scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
