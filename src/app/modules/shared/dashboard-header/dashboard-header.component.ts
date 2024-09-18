import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit {
  @Output() hamClick: EventEmitter<any> = new EventEmitter();
  showNotifi: boolean = false;
  user: any;
  plans: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser().user;
    this.plans = this.orderService.loadCart();
  }
  
  // Open Menu
  openMenu() {
    this.hamClick.emit();
  }
  
  goToProfile() {
    const userName = this.user.role === 'school' ? this.user.school : this.user.fullname;
    let userNamePath = userName.replace(/\s/g, '-').toLowerCase();
    this.router.navigate([`/${this.user.role}/profile/${userNamePath}`]);
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
