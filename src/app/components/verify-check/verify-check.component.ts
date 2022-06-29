import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-check',
  templateUrl: './verify-check.component.html',
  styleUrls: ['./verify-check.component.scss']
})
export class VerifyCheckComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Get User data from localstorage
    let userData = this.authService.getUser()
    this.user = userData.user
  }


}
