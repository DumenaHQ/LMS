import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent implements OnInit {
  @ViewChild('sideNav') sideNav: ElementRef;
  @ViewChild('menuBtn') menuBtn: ElementRef;

  hamClick: any;

  navLink: any[];

  user: any;
  userNamePath: string;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    let userData = this.authService.getUser();
    this.user = userData.user;
    this.userNamePath = this.user.fullname.replace(/\s/g, '-').toLowerCase();

    // Set Nav links
    this.navLink = [
      {
        name: 'Dashboard',
        link: '/parent',
        icon: 'assets/img/svg/Layout.svg',
        subLinks: [],
      },
      {
        name: 'Children',
        link: '/parent/children',
        icon: 'assets/img/svg/people-blue.svg',
        subLinks: [],
      },
      {
        name: 'Programs',
        link: '/parent/programs',
        icon: 'assets/img/svg/gameboy.svg',
        subLinks: [],
      },
      {
        name: 'Payments',
        link: '/parent/payment',
        icon: 'assets/img/svg/wallet.svg',
        subLinks: [],
      },
      {
        name: 'Profile',
        link: `/${this.user.role}/profile/${this.userNamePath}`,
        icon: 'assets/img/svg/frame.svg',
        subLinks: [],
      },
    ];

    // Prevent Non-parent from routing here
    if (this.user.role !== 'parent') {
      this.router.navigate(['/login']);
    }
  }

  // Open Menu
  openMenu() {
    this.hamClick = !this.hamClick;
  }

  // Open Menu
  closeMenu() {
    this.hamClick = false;
  }
}
