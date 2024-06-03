import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormErrorMessageService } from 'src/app/services/utils/form-error-message.service';

@Component({
  selector: 'app-add-edit-admin-user',
  templateUrl: './add-edit-admin-user.component.html',
  styleUrls: ['./add-edit-admin-user.component.scss']
})
export class AddEditAdminUserComponent implements OnInit {

  @Output() addEditUser: EventEmitter<any> = new EventEmitter();
  @Output() getAllUsers: EventEmitter<any> = new EventEmitter();
  formGroup: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private appAlertService: AppAlertService,
    private formErrorService: FormErrorMessageService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^\d+$/) ]],
      role: ['', [Validators.required]],
    });
  }

  createAdmin() {
    this.loading = true;
    const { value } = this.formGroup;

    let payload = {
      firstname: value.firstName,
      lastname: value.lastName,
      email: value.email,
      phone: value.phoneNumber,
      admin_role: value.role,
    };

    this.authService
      .onboardAdmin(payload)
      .subscribe((res: any) => {
        if (res) {
          this.formGroup.reset();
          this.appAlertService.showAlert(res.message, AlertType.Success);
          this.getAllUsers.emit();
          this.closeAddAdminModal();
        }
      }, (error) => {
        this.appAlertService.showAlert(
          error.error.error.code == 400
          ? (error.error.error.errors[0].message)
          : (error.error.message),
          AlertType.Error
        );
        this.loading = false;
      });
  }

  getErrorMessage(controlName: string, labelName: string): string {
    const control = this.formGroup.get(controlName);
    const errors = control?.errors;
    return this.formErrorService.getErrorMessage(errors, labelName);
  }

  closeAddAdminModal() {
    this.addEditUser.emit();
  }

}

