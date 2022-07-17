import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-enroll-learner',
  templateUrl: './enroll-learner.component.html',
  styleUrls: ['./enroll-learner.component.scss']
})
export class EnrollLearnerComponent implements OnInit {

  @Output() addModal: EventEmitter<any> = new EventEmitter();
  @Output() showAlert: EventEmitter<any> = new EventEmitter();
  @Input() title: string = '';

  hide: boolean = true;
  loading: boolean = false;
  returnUrl = '';
  isSignedin: boolean = false;
  errorMessage: string = "";
  showError: boolean = false;
  user: any;

  avatars = [
    {
      id: 1,
      image: '../../../../../../assets/img/children-avatar/child-avatar-1.png',
      selected: true
    },
    {
      id: 2,
      image: '../../../../../../assets/img/children-avatar/child-avatar-2.png',
      selected: false
    },
    {
      id: 3,
      image: '../../../../../../assets/img/children-avatar/child-avatar-3.png',
      selected: false
    },
    {
      id: 4,
      image: '../../../../../../assets/img/children-avatar/child-avatar-4.png',
      selected: false
    },
    {
      id: 5,
      image: '../../../../../../assets/img/children-avatar/child-avatar-5.png',
      selected: false
    },
    {
      id: 6,
      image: '../../../../../../assets/img/children-avatar/child-avatar-6.png',
      selected: false
    },
  ]


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Get User data from localstorage
    let userData = this.authService.getUser()
    this.user = userData.user
  }

  // Sign Up
  signUp(data: any) {
    // Set loading to true
    this.loading = true

    let payroll = {
      firstname: data.firstname,
      lastname: data.lastname,
      fullname: data.firstname + ' ' + data.lastname,
      username: data.firstname + '_' + data.lastname,
      parent: this.user.id,
      user_type: "learner",
      password: data.password,
    }

    // Send users data
    this.authService.addUser(payroll).subscribe((res: any) => {
      console.log(res)

      if (res.status == true) {
        // Close Modal
        this.closeAddModal()

        // Show Popup
        this.showAlertPopup()

        // Reload the page
        window.location.reload()
      }

      // Show error message
      this.errorMessage = res.message
      this.showError = true

      // Set loading to false
      this.loading = false

    }, ((error: any) => {
      console.log(error)
      // Show error message
      error.error.error.code == 400 ? this.errorMessage = error.error.error.errors[0].message : this.errorMessage = error.error.message
      this.showError = true
      // Set loading to false
      this.loading = false

      // Set Timeout
      // setTimeout(() => {
      //   this.showError = false
      // }, 3000);


    }))
  }

  showAlertPopup() {
    this.showAlert.emit()
  }


  // Close Add Modal
  closeAddModal() {
    this.addModal.emit();
  }


}
