import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-add-edit-teacher',
  templateUrl: './add-edit-teacher.component.html',
  styleUrls: ['./add-edit-teacher.component.scss'],
})
export class AddEditTeacherComponent implements OnInit {
  teacherForm: FormGroup;
  loading: boolean = false;
  formSubmitAttempted: boolean = false;

  constructor(
    private teacherFormBuilder: FormBuilder,
    private teachersService: TeachersService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.teacherForm = this.teacherFormBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  createTeacher() {
    this.formSubmitAttempted = true;
    if (this.teacherForm.valid) {
      const payload = {
        "fullname": `${this.teacherForm.value.firstName} ${this.teacherForm.value.lastName}`,
        "email":  this.teacherForm.value.email,
        "user_type": "instructor",
        "password": this.teacherForm.value.password,
    };

      this.teachersService.createTeacher(payload).subscribe(
        (res) => {
          if (res) {
            this.teacherForm.reset();
            this.formSubmitAttempted = false;

            setTimeout(() => {
              this.router.navigate([`school/teachers`])
            }, 3000);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
