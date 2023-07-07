import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-learner',
  templateUrl: './learner.component.html',
  styleUrls: ['./learner.component.scss'],
})
export class LearnerComponent implements OnInit {
  @ViewChild('sideNav') sideNav: ElementRef;
  @ViewChild('menuBtn') menuBtn: ElementRef;

  navLink: any[];

  hamClick: any;
  user: any;
  userNamePath: string;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Get user details
    let userData = this.authService.getUser();
    this.user = userData.user;
    this.userNamePath = this.user.fullname.replace(/\s/g, '-').toLowerCase();

    // Set Nav Links
    this.navLink = [
      {
        name: 'Dashboard',
        link: '/learner',
        icon: 'assets/img/svg/Layout.svg',
        subLinks: [],
      },
      {
        name: 'Library',
        link: '/learner/library',
        icon: 'assets/img/svg/University.svg',
        subLinks: [],
      },
      {
        name: 'Classrooms',
        link: '/school/classrooms',
        icon: 'assets/img/svg/forward-item.svg',
        subLinks: [],
      },
      {
        name: 'Programs',
        link: '/learner/programs',
        icon: 'assets/img/svg/gameboy.svg',
        subLinks: [],
      },
      {
        name: 'Profile',
        link: `/${this.user.role}/profile/${this.userNamePath}`,
        icon: 'assets/img/svg/frame.svg',
        subLinks: [],
      },
      // {
      //   name: 'Insights',
      //   link: '/',
      //   icon: 'assets/img/svg/Book-open.svg',
      //   subLinks: [],
      // },
      // {
      //   name: 'Messages',
      //   link: '/',
      //   icon: 'assets/img/svg/Envelope.svg',
      //   subLinks: [],
      // },
      // {
      //   name: 'Community',
      //   link: '/',
      //   icon: 'assets/img/svg/profile-2user.svg',
      //   subLinks: [],
      // },
      // {
      //   name: 'Store',
      //   link: '/',
      //   icon: 'assets/img/svg/shop.svg',
      //   subLinks: [],
      // },
    ];

    // Prevent Non-learner from routing here
    if (this.user.role !== 'learner') {
      this.router.navigate(['/login']);
    }
  }

  // Open Menu
  openMenu() {
    this.hamClick = !this.hamClick;
  }

  // Close Menu
  closeMenu() {
    this.hamClick = false;
  }
}
