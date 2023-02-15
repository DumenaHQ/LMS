import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-add-course-module-lesson',
  templateUrl: './add-course-module-lesson.component.html',
  styleUrls: ['./add-course-module-lesson.component.scss']
})
export class AddCourseModuleLessonComponent implements OnInit {

  selectedFileName: string;
  file: File;
  previewImage: any;
  showPreviewImage: boolean = false;
  loading: boolean = false;
  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string;
  lessonForm: any = FormGroup;
  currentModule: any;

  constructor(
    private coursesService: CoursesService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {

     // Get Current Program
     this.currentModule = this.activatedRoute.snapshot.params;
     
    // Lesson Form
    this.lessonForm = this.formBuilder.group({
      title: ['', Validators.required],
      further_reading: ['', Validators.required],
      class_activity: ['', Validators.required],
      code_example: ['', Validators.required],
      instructor: ['', Validators.required],
      // lesson_video: ['', Validators.required],
    });
  }

  // Add Lesson
  addAndCloseLesson() {
    var formData: any = new FormData();
    formData.append('title', this.lessonForm.value.title);
    formData.append('further_reading', this.lessonForm.value.further_reading);
    formData.append('class_activity', this.lessonForm.value.class_activity);
    formData.append('code_example', this.lessonForm.value.code_example);
    formData.append('instructor', 'instructor id');
    formData.append('lesson_video', this.selectedFileName);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
      console.log(pair)
    }
    
    console.log(formData);
    

    // this.coursesService
    //   .addLessonToModule(this.currentModule.courseId, this.currentModule.moduleId, formData)
    //   .subscribe((res: any) => {
    //     console.log(res);
    //     if(res.status === true) {
    //       this.showAlertPopup(res.message, 'success')
    //       setTimeout(() => {
    //         this.router.navigate([`admin/courses/create-course/${this.currentModule.courseId}/modules`])
    //       }, 3000);
    //     }
    //   });
  }

  // Add Lesson
  addAndNewLesson() {
    var formData: any = new FormData();
    formData.append('title', this.lessonForm.value.title);
    formData.append('further_reading', this.lessonForm.value.further_reading);
    formData.append('class_activity', this.lessonForm.value.class_activity);
    formData.append('code_example', this.lessonForm.value.code_example);
    formData.append('instructor', 'instructor id');
    formData.append('lesson_video', this.selectedFileName);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    this.coursesService
      .addLessonToModule(this.currentModule.courseId, this.currentModule.moduleId, formData)
      .subscribe((res: any) => {
        console.log(res);
        if(res.status === true) {
          this.showAlertPopup(res.message, 'success')
          this.lessonForm.reset()
          this.selectedFileName = ''
        }
      });
  } 

  // Upload File
  uploadFile(event: any) {
    // Preview File Selected
    // this.selectedFile = event[0];

    
    this.file = event.target.files[0];
    // Set file name
    this.selectedFileName = this.file.name;
    
    // if (this.selectedFile) {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(this.selectedFile);
    //   reader.onload = (e: any) => {
    //     this.previewImage = e.target.result;
        
    //     if (this.previewImage !== '') {
    //       this.showPreviewImage = true;
    //     } else {
    //       this.showPreviewImage = false;
    //     }
    //   };
    // }
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
