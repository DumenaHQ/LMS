import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {

  @ViewChild('sideNav') sideNav: ElementRef;
  @ViewChild('menuBtn') menuBtn: ElementRef;

  hamClick: any;

  navLink: any = [
    {
      name: "Dashboard",
      link: "/school",
      icon: '../../../../assets/img/svg/Layout.svg',
      subLinks: []
    },
    {
      name: "Students",
      link: "/school/students",
      icon: '../../../../assets/img/svg/people-blue.svg',
      subLinks: []
    },
    {
      name: "Payment",
      link: "/school/payment",
      icon: './../../../assets/img/svg/wallet.svg',
      subLinks: []
    },
  ]

  user: any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    let userData = this.authService.getUser()
    this.user = userData.user

    // Prevent Non-school from routing here
    if (this.user.role !== 'school') {
      this.router.navigate(['/login'])
    }
  }

  // Open Menu
  openMenu() {
    this.hamClick = !this.hamClick
  }

}
