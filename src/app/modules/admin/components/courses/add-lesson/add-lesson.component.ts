import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss'],
})
export class AddLessonComponent implements OnInit {
  selectedFile: File;
  previewImage: any;
  showPreviewImage: boolean = false;
  loading: boolean = false;
  errorMessage: string = '';
  showError: boolean = false;

  constructor(
    private coursesService: CoursesService,
    private formBuilder: FormBuilder
  ) {}

  // Course Form
  courseForm = this.formBuilder.group({
    title: ['', Validators.required],
    further_reading: ['', Validators.required],
    class_activity: ['', Validators.required],
    code_example: ['', Validators.required],
    instructor: ['', Validators.required],
    lesson_video: ['', Validators.required],
  });

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      title: ['Introducton to JavaScript Lesson one', Validators.required],
      further_reading: ['Read up this', Validators.required],
      class_activity: ['Do this exercise', Validators.required],
      code_example: ['Some code', Validators.required],
      instructor: ['Khing dave', Validators.required],
      lesson_video: ['', Validators.required],
    });
  }

  // Add Lesson
  addLesson() {
    var formData: any = new FormData();
    formData.append('title', this.courseForm.value.title);
    formData.append('further_reading', this.courseForm.value.further_reading);
    formData.append('class_activity', this.courseForm.value.class_activity);
    formData.append('code_example', this.courseForm.value.code_example);
    formData.append('instructor', this.courseForm.value.instructor);
    // formData.append('lesson_video', '');

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    this.coursesService
      .addLessonToCourse('6325242af131b0a5f3e7c4ae', formData)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  // Upload File
  uploadFile(event: any) {
    // Preview File Selected
    this.selectedFile = event[0];

    if (this.selectedFile) {
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
        if (this.previewImage !== '') {
          this.showPreviewImage = true;
        } else {
          this.showPreviewImage = false;
        }
      };
    }
  }
}
