import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-student-signup',
  templateUrl: './student-signup.component.html',
  styleUrls: ['./student-signup.component.scss'],
})
export class StudentSignupComponent implements OnInit {
  hide: boolean = true;
  loading: boolean = false;
  returnUrl = '';
  isSignedin: boolean = false;
  errorMessage: string = '';
  showError: boolean = false;
  userForm: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // User form
    this.userForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // phone: ['', [Validators.required]],
    });
  }

  // Sign Up
  signUp() {
    // Set loading to true
    this.loading = true;

    // Set submitted to true
    this.isFormSubmitted = true;

    // If Form is invalid
    if (this.userForm.invalid) {
      this.loading = false;

      return;
    }

    // Set payload
    let payload = {
      fullname:
        this.userForm.value.firstname + ' ' + this.userForm.value.lastname,
      username:
        this.userForm.value.firstname + '_' + this.userForm.value.lastname,
      email: this.userForm.value.email,
      user_type: 'learner',
      password: this.userForm.value.password,
      // phone: this.userForm.value.phone,
      // resident_state: this.userForm.value.resident_state,
    };

    // Send users data
    this.authService.addUser(payload).subscribe(
      (res: any) => {
        console.log(res);

        if (res.status == true) {
          // Store user data to localstorage
          this.authService.addUserDataToLocalStorage(res.data);
          // Navigate to Dashboard
          this.router.navigate(['/verify-email']);
        }

        // Show error message
        this.errorMessage = res.message;
        this.showError = true;

        // Set loading to false
        this.loading = false;
      },
      (error: any) => {
        console.log(error);
        // Show error message
        // Show error message
        error.error.error.code == 400
          ? (this.errorMessage = error.error.error.errors[0].message)
          : (this.errorMessage = error.error.message);
        this.showError = true;

        // Set loading to false
        this.loading = false;

        // Set Timeout
        // setTimeout(() => {
        //   this.showError = false
        // }, 3000);
      }
    );
  }

  // Go Back to the previous page
  goBack() {
    window.history.go(-1);
    return false;
  }
}
