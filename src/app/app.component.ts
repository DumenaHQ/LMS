import { Component, HostListener, OnInit } from '@angular/core';
import { SeoService } from './services/seo.service';
import {
  AlertType,
  AppAlertService,
} from './services/app-alerts/app-alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dumena';
  windowScrolled: boolean;

  alertMessage: string = '';
  alertColor: string = '';
  alertType: AlertType;
  alertShowing = false;

  constructor(
    private seoService: SeoService,
    private appAlertService: AppAlertService
  ) {
    // Update the routes Title
    this.seoService.updateTitle();
  }

  ngOnInit() {
    this.setupAlertCtrl();
  }

  // When user scroll 300 away from the top of the document
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      this.windowScrolled = true;
    } else {
      this.windowScrolled = false;
    }
  }

  // Scroll Up
  scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  // Alert Controller
  setupAlertCtrl() {
    this.appAlertService.getAlertObservable().subscribe((alert) => {
      // You can access the alert message and type here
      this.alertMessage = alert.message;
      this.alertType = alert.type;
      this.alertShowing = true;

      setTimeout(() => {
        this.alertShowing = false;
      }, 5000);
    });
  }
}
