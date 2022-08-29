import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  // Change sect
  showSect(ids: any) {
    this.id = ids;
  }

  // Set reset email
  sendResetEmail(data: any) {
    // Start loading
    this.loading = true;

    this.authService.sendResetEmail(data).subscribe(
      (res: any) => {
        console.log(res);

        if (res.status === true) {
          // Show check email section
          this.id = 'check-mail';

          // Pass the user email
          this.email = data.email;
        }
      },
      (error: any) => {
        console.log(error);
        // Show error message
        this.errorMessage = error.error.message;

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
}
