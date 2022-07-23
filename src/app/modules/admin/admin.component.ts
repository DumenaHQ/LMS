import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  @ViewChild('sideNav') sideNav: ElementRef;
  @ViewChild('menuBtn') menuBtn: ElementRef;

  hamClick: any;

  navLink: any = [
    {
      name: 'Dashboard',
      link: '/admin',
      icon: '../../../../assets/img/svg/Layout.svg',
      subLinks: [],
    },
    {
      name: 'Courses',
      link: '/admin/courses',
      icon: '../../../../assets/img/svg/University.svg',
      subLinks: [],
    },
    {
      name: 'Quiz',
      link: '/all-courses',
      icon: './../../../assets/img/svg/Book-open.svg',
      subLinks: [],
    },
    {
      name: 'Messages',
      link: '/all-courses',
      icon: '../../../../assets/img/svg/Envelope.svg',
      subLinks: [],
    },
    {
      name: 'Community',
      link: '/all-courses',
      icon: '../../../../assets/img/svg/profile-2user.svg',
      subLinks: [],
    },
    {
      name: 'Account',
      link: '/all-courses',
      icon: '../../../../assets/img/svg/frame.svg',
      subLinks: [],
    },
  ];

  user: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    let userData = this.authService.getUser();
    this.user = userData.user;

    // Prevent Non-admin from routing here
    if (this.user.role !== 'admin') {
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
