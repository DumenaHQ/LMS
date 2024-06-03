import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { FormErrorMessageService } from 'src/app/services/utils/form-error-message.service';

@Component({
  selector: 'app-add-edit-school-teacher',
  templateUrl: './add-edit-school-teacher.component.html',
  styleUrls: ['./add-edit-school-teacher.component.scss']
})
export class AddEditSchoolTeacherComponent implements OnInit {

  @Output() addEditTeacher: EventEmitter<any> = new EventEmitter();
  formGroup: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private teachersService: TeachersService,
    private appAlertService: AppAlertService,
    private formErrorService: FormErrorMessageService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  createTeacher() {
    this.loading = true;
    const { value } = this.formGroup;

    let payload = {
      fullname: `${value.firstName} ${value.lastName}`,
      email: value.email,
      user_type: 'instructor',
    };

    this.teachersService
      .createTeacherForSchool(payload)
      .subscribe((res: any) => {
        if (res) {
          this.formGroup.reset();
          this.appAlertService.showAlert(res.message, AlertType.Success);
          this.closeAddTeacherModal();
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

  closeAddTeacherModal() {
    this.addEditTeacher.emit();
  }
}

