import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string;
  moduleForm: any = FormGroup;
  lessonForm: any = FormGroup;
  // isModuleLeson: boolean = false;
  moduleId: string
  currentCourseId: any;
  dataLoading: boolean = true;
  modules: any;

  constructor(
    private coursesService: CoursesService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute, 
  ) {}

  ngOnInit(): void {

     // Get Current Program
     this.currentCourseId = this.activatedRoute.snapshot.params;

    // Module Form
    this.moduleForm = this.formBuilder.group({
      title: ['', Validators.required],
    });

    // Lesson Form
    this.lessonForm = this.formBuilder.group({
      title: ['', Validators.required],
      further_reading: ['', Validators.required],
      class_activity: ['', Validators.required],
      code_example: ['', Validators.required],
      instructor: ['', Validators.required],
      lesson_video: ['', Validators.required],
    });

    // Fetch all course modules
    this.coursesService.getCourse(this.currentCourseId.courseId).subscribe({
      next: (res: any) => {
        this.modules = res.data.course.modules;
        console.log(this.modules);
        
      
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  // Add Module
  addModule() {
    this.coursesService
    .addModule(this.currentCourseId.courseId, this.moduleForm.value)
    .subscribe((res: any) => {
      console.log(res);
      if(res.status === true) {
        this.showAlertPopup(res.message, 'success')
        // this.isModuleLeson = true
        this.moduleId = res.data.module.id
      }
    });
  }
  // Add Lesson
  addLesson() {
    var formData: any = new FormData();
    formData.append('title', this.lessonForm.value.title);
    formData.append('further_reading', this.lessonForm.value.further_reading);
    formData.append('class_activity', this.lessonForm.value.class_activity);
    formData.append('code_example', this.lessonForm.value.code_example);
    formData.append('instructor', this.lessonForm.value.instructor);
    // formData.append('lesson_video', '');

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    this.coursesService
      .addLessonToModule(this.currentCourseId.courseId, this.moduleId, formData)
      .subscribe((res: any) => {
        console.log(res);
        if(res.status === true) {
          this.showAlertPopup(res.message, 'success')
          setTimeout(() => {
            this.ngOnInit()
          }, 3000);
        }
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

  // Show alert
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
