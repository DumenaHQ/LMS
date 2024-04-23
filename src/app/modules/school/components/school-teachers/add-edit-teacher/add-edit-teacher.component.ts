import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import {
  AlertType,
  AppAlertService,
} from 'src/app/services/app-alerts/app-alert.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-add-edit-teacher',
  templateUrl: './add-edit-teacher.component.html',
  styleUrls: ['./add-edit-teacher.component.scss'],
})
export class AddEditTeacherComponent implements OnInit {
  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string;
  errorMessage = '';

  teacherForm: FormGroup;
  loading: boolean = false;
  formSubmitAttempted: boolean = false;

  constructor(
    private teacherFormBuilder: FormBuilder,
    private teachersService: TeachersService,
    private appAlertService: AppAlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teacherForm = this.teacherFormBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  createTeacher() {
    this.formSubmitAttempted = true;
    if (this.teacherForm.valid) {
      const payload = {
        fullname: `${this.teacherForm.value.firstName} ${this.teacherForm.value.lastName}`,
        email: this.teacherForm.value.email,
        user_type: 'instructor',
      };

      this.teachersService
        .createTeacherForSchool(payload)
        .subscribe((res: any) => {
          if (res) {
            this.teacherForm.reset();
            this.formSubmitAttempted = false;

            this.appAlertService.showAlert(res.message, AlertType.Success);

            setTimeout(() => {
              this.router.navigate([`school/teachers`]);
            }, 3000);
          }
        }, (error) => {
          this.errorMessage = error.error.error.errors[0].message;
        });
    }
  }

  showAlertPopup(message: string, color: string) {
    // Set message
    this.alertMessage = message;
    // Set color
    this.alertColor = color;
    // Show Alert
    this.isAlert = true;
    // Hide Alert
    setTimeout(() => {
      this.isAlert = false;
    }, 3000);
  }
}
