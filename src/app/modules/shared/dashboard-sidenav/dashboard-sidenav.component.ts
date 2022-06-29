import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-sidenav',
  templateUrl: './dashboard-sidenav.component.html',
  styleUrls: ['./dashboard-sidenav.component.scss']
})
export class DashboardSidenavComponent implements OnInit {

  @Input() navLink: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  // Logout
  logout() {
    this.authService.logOut()
  }

}
