import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormErrorMessageService } from 'src/app/services/utils/form-error-message.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  loading: boolean = false;
  id: any = 'forgot-password';
  email: string = '';
  formGroup: any;

  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder,
    private appAlertService: AppAlertService,
    private formErrorService: FormErrorMessageService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
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

    this.authService.sendResetEmail(this.formGroup.value).subscribe(
      (res: any) => {
        if (res.status === true) {
          this.id = 'check-mail';
          this.email = this.formGroup.value.email;
        }
      },
      (error: any) => {
        console.log(error);
        this.appAlertService.showAlert(
          error.error.message
            ? error.error.message
            : error.message
            ? error.error.message || error.error.error.errors[0].message
            : error.message,
          AlertType.Error
        );
        this.loading = false;
      }
    );
  }

  getErrorMessage(controlName: string, labelName: string): string {
    const control = this.formGroup.get(controlName);
    const errors = control?.errors;
    return this.formErrorService.getErrorMessage(errors, labelName);
  }
}
