import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  loading: boolean = false;
  errorMessage: string = '';
  showError: boolean = false;
  id: any = 'forgot-password';
  email: string = '';
  userForm: any;
  isFormSubmitted: boolean = false;


  constructor(private authService: AuthService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Change sect
  showSect(ids: any) {
    this.id = ids;
  }

  // Set reset email
  sendResetEmail() {
    // Start loading
    this.loading = true;

    // Set submitted to true
    this.isFormSubmitted = true;

    // If Form is invalid
    if (this.userForm.invalid) {
      this.loading = false;

      return;
    }    

    this.authService.sendResetEmail(this.userForm.value).subscribe(
      (res: any) => {
        console.log(res);

        if (res.status === true) {
          // Show check email section
          this.id = 'check-mail';

          // Pass the user email
          this.email = this.userForm.value.email;
          
        }
      },
      (error: any) => {
        console.log(error);
        // Show error message
        this.errorMessage = error.error.message;

        this.showError = true;

        // Set loading to false
        this.loading = false;
      }
    );
  }
}
