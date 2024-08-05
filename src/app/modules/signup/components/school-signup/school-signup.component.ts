import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormErrorMessageService } from 'src/app/services/utils/form-error-message.service';
import { NigeriaStatesService } from 'src/app/services/utils/nigeria-states.service';

@Component({
  selector: 'app-school-signup',
  templateUrl: './school-signup.component.html',
  styleUrls: ['./school-signup.component.scss'],
})
export class SchoolSignupComponent implements OnInit {
  hide: boolean = true;
  loading: boolean = false;
  states: { code: string; name: string; }[];
  userEvent: any;
  formGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private appAlertService: AppAlertService,
    private nigeriaStatesService: NigeriaStatesService,
    private formErrorService: FormErrorMessageService
  ) {}

  ngOnInit(): void {
    // Get user event
    this.userEvent = JSON.parse(localStorage.getItem('event') || '[]');
    this.states = this.nigeriaStatesService.getAllStates();
    this.initForm();
  }

  initForm() {
    // User form
    this.formGroup = this.formBuilder.group({
      schoolName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      schoolAddress: [''],
      schoolState: ['', [Validators.required]],
      contactPersonName: ['', [Validators.required]],
      contactPersonNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^\d+$/)]],
      password: ['', [Validators.required, Validators.minLength(6), this.formErrorService.alphanumericSymbolPasswordValidator()]],
    });
  }

  // Sign Up
  signUp() {
    this.loading = true;

    let payload: any = {
      school: this.formGroup.value.schoolName,
      email: this.formGroup.value.email,
      address: this.formGroup.value.schoolAddress,
      resident_state: this.formGroup.value.schoolState,
      fullname: this.formGroup.value.contactPersonName,
      phone: this.formGroup.value.contactPersonNumber,
      password: this.formGroup.value.password,
      user_type: 'school',
    };

    if(this.userEvent.event) {
      payload['event'] = this.userEvent.event;
    }

    this.authService.addUser(payload).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.appAlertService.showAlert(res.message, AlertType.Success);
          this.authService.addUserDataToLocalStorage(res.data);
          localStorage.removeItem('event');
          this.router.navigate(['/verify-email']);
        }
        this.loading = false;
      },
      (error: any) => {
        console.log(error);
        this.appAlertService.showAlert(
          error.error.error.errors[0].message
            ? error.error.error.errors[0].message
            : error.error.message
            ? error.error.message || error.error.errors[0].message
            : error.error.message,
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

  // Go Back to the previous page
  goBack() {
    this.router.navigate(['signup']);
  }
}
