import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit {
  @Output() hamClick: EventEmitter<any> = new EventEmitter();
  showNotifi: boolean = false;
  user: any;
  userNamePath: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Get user data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;
    this.userNamePath = this.user.fullname.replace(/\s/g, '-').toLowerCase();
  }

  // Open Menu
  openMenu() {
    this.hamClick.emit();
  }

  // Route to Cart
  goToCart() {
    this.router.navigate([`/${this.user.role}/payment/cart`]);
  }

  // Close Notifi Popup
  closeNotifiPopup() {
    this.showNotifi = false;
  }
}
