import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent implements OnInit {

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
        link: '/instructor',
        icon: 'assets/img/svg/Layout.svg',
        subLinks: [],
      },
      {
        name: 'Classrooms',
        link: '/instructor/classrooms',
        icon: 'assets/img/svg/forward-item.svg',
        subLinks: [],
      },
      {
        name: 'Profile',
        link: `/${this.user.role}/profile/${this.userNamePath}`,
        icon: 'assets/img/svg/frame.svg',
        subLinks: [],
      },
    ];

    // Prevent Non-learner from routing here
    if (this.user.role !== 'instructor') {
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

