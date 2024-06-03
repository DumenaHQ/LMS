import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  loading: boolean = false;
  formGroup: FormGroup;
  isTags: any;
  isTagsList: boolean = false
  tagsList: any[] = [];
  difficultyLevels: any[] = [
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advanced', value: 'Advanced' },
  ];

  quadrants: any[] = [
    { label: 'Developer', value: 'Developer' },
    { label: 'Designer', value: 'Designer' },
    { label: 'Innovator', value: 'Innovator' },
    { label: 'Maker', value: 'Maker' },
  ];

  constructor(
    private coursesService: CoursesService,
    private appAlertService: AppAlertService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['', Validators.required],
      difficulty_level: ['', Validators.required],
      course_quadrant: ['', Validators.required],
    });
  }

  // Add tags
  addTag() {
    if (this.formGroup.value.tags !== '') {
      this.isTagsList = true;
      this.tagsList.push(this.formGroup.value.tags);
      this.formGroup.patchValue({ tags: this.tagsList });
    }
    this.formGroup.value.tags = '';
  }
  // Remove tagsory
  removeTag(index: any) {
    this.tagsList.splice(index, 1);
  }

  // Add Course
  addCourse() {
    this.loading = true;

    let payload = {
      title: this.formGroup.value.title,
      description: this.formGroup.value.description,
      tags: this.tagsList,
      difficulty_level: this.formGroup.value.difficulty_level,
      course_quadrant: this.formGroup.value.course_quadrant,
    };

    this.coursesService.addCourse(payload).subscribe(
        (res: any) => {
        this.appAlertService.showAlert(res.message, AlertType.Success);
        setTimeout(() => {
          this.router.navigate([`admin/courses/create-course/${res.data.course.id}/modules`])
        }, 3000);
        this.loading = false;
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
}
