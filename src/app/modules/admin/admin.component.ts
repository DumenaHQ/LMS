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

  navLink: any[] = [
    {
      name: 'Dashboard',
      link: '/admin',
      icon: 'assets/img/svg/Layout.svg',
      subLinks: [],
    },
    {
      name: 'Courses',
      link: '/admin/courses',
      icon: 'assets/img/svg/University.svg',
      subLinks: [],
    },
    {
      name: 'Quizzes',
      link: '/admin/quizzes',
      icon: 'assets/img/svg/Book-open.svg',
      subLinks: [],
    },
    {
      name: 'Classrooms',
      link: '/admin/class-templates',
      icon: 'assets/img/svg/forward-item.svg',
      subLinks: [],
    },
    {
      name: 'Programs',
      link: '/admin/programs',
      icon: 'assets/img/svg/gameboy.svg',
      subLinks: [],
    },
    {
      name: 'Support',
      link: '/admin/learning-support',
      icon: 'assets/img/svg/gameboy.svg',
      subLinks: [],
    },
    {
      name: 'Transactions',
      link: '/admin/transactions',
      icon: 'assets/img/svg/wallet.svg',
      subLinks: [],
    },
    {
      name: 'Users',
      link: '/admin/users',
      icon: 'assets/img/svg/profile-2user.svg',
      subLinks: [],
    },
    // {
    //   name: 'Account',
    //   link: '/all-courses',
    //   icon: 'assets/img/svg/frame.svg',
    //   subLinks: [],
    // },
  ];

  user: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser().user;

    // Prevent Non-admin from routing here
    if (this.user.role !== 'admin') {
      this.router.navigate(['/login']);
    }

    // Filter navigation links
    this.filterNavLinks();
  }

  filterNavLinks(): void {
    this.navLink = this.user.admin_role === 'super'
      ? this.navLink.filter(nav => nav.name !== 'Support')
      : this.navLink;
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
