import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormErrorMessageService } from 'src/app/services/utils/form-error-message.service';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss'],
})
export class SetNewPasswordComponent implements OnInit {
  hide: boolean = true;
  id: string = 'set-new-password';
  currentParamsIds: any;
  loading: boolean = false;
  errorMessage: string = '';
  showError: boolean = false;
  formGroup: any;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private appAlertService: AppAlertService,
    private formErrorService: FormErrorMessageService
  ) {}

  ngOnInit(): void {
    // get email_hash and hash_string
    this.currentParamsIds = this.activatedRoute.snapshot.params;

    // User form
    this.formGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6), this.formErrorService.alphanumericSymbolPasswordValidator()]],
    });
  }

  // Show Section
  showSect(ids: any) {
    this.id = ids;
  }

  resetNewPassword() {
    // Start loading
    this.loading = true;

    let payload = {
      email_hash: this.currentParamsIds.email_hash,
      hash_string: this.currentParamsIds.hash_string,
      password: this.formGroup.value.password,
    };

    this.authService.resetPassword(payload).subscribe(
      (res: any) => {
        if (res.status === true) {
          // Show check email section
          this.id = 'reset-successful';
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
