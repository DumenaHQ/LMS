import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-sidenav',
  templateUrl: './dashboard-sidenav.component.html',
  styleUrls: ['./dashboard-sidenav.component.scss'],
})
export class DashboardSidenavComponent implements OnInit {
  @Input() navLink: any;
  @Output() hamClick: EventEmitter<any> = new EventEmitter();
  loading: boolean = false;
  isLogoutModal: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  closeMenu() {
    this.hamClick.emit();
  }

  // open logout modal
  openLogoutModal() {
    this.isLogoutModal = true;
  }
  
  // close logout modal
  closeLogoutModal() {
    this.isLogoutModal = false;
  }
  // Logout
  logout() {
    this.loading = true;

    this.authService.logOut();
  }
}
