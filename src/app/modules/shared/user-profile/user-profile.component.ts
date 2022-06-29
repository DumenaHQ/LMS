import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  isEdit: boolean = false;
  user: any;
  firstname: string = '';
  lastname: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Get user data from localstorage
    let userData = this.authService.getUser()
    this.user = userData.user

    // Get firstname and lastname from user fullname
    let fullname = this.user.fullname
    const fullnameArray = fullname.split(" ")

    this.firstname = fullnameArray[0]
    this.lastname = fullnameArray[1]

  }

}
