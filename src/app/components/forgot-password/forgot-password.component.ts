import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  pageId: string = "";

  // hide: boolean = true;
  // loading: boolean = false;
  // returnUrl = '';
  // isSignedin: boolean = false;
  // errorMessage: string = "";
  // showError: boolean = false;

  id: any = "forgot-password";

  constructor() { }

  ngOnInit(): void {
  }

  pageChange(ids: any) {
    this.id = ids
  }

  // Show Section
  showSect(newId: string) {
    this.id = newId;
  }

}
