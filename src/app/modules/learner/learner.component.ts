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

  navLink: any = [
    {
      name: 'Dashboard',
      link: '/learner',
      icon: '../../../../assets/img/svg/Layout.svg',
      subLinks: [],
    },
    {
      name: 'Library',
      link: '/learner/library',
      icon: '../../../../assets/img/svg/University.svg',
      subLinks: [],
    },
    {
      name: 'Insights',
      link: '/',
      icon: './../../../assets/img/svg/Book-open.svg',
      subLinks: [],
    },
    {
      name: 'Messages',
      link: '/',
      icon: '../../../../assets/img/svg/Envelope.svg',
      subLinks: [],
    },
    {
      name: 'Community',
      link: '/',
      icon: '../../../../assets/img/svg/profile-2user.svg',
      subLinks: [],
    },
    {
      name: 'Store',
      link: '/',
      icon: '../../../../assets/img/svg/shop.svg',
      subLinks: [],
    },
  ];

  hamClick: any;
  user: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    let userData = this.authService.getUser();
    this.user = userData.user;

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
