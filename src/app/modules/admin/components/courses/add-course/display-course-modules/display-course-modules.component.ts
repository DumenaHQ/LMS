import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-display-course-modules',
  templateUrl: './display-course-modules.component.html',
  styleUrls: ['./display-course-modules.component.scss']
})
export class DisplayCourseModulesComponent implements OnInit {


  moduleLessonForm: any = FormGroup;
  loading: boolean = false;
  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string;
  currentCourseId: any;
  dataLoading: boolean = true;
  modules: any;
  addModuleLessonModal: boolean = false;
  moduleId: string;
  moduleName: string;

  selectedFileName: string = '';
  selectedFile: File;
  course: any;
  // previewImage: any;
  // showPreviewImage: boolean = false;

  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  
  ngOnInit(): void {
    
    this.initForm();

     // Get Current Program
     this.currentCourseId = this.activatedRoute.snapshot.params;

     // Get Course
    this.coursesService.getCourse(this.currentCourseId.courseId).subscribe({
      next: (res: any) => {
        this.course = res.data.course;
        console.log(this.course);
        
      },
      error: (e) => console.error(e),
      complete: () => {
        // this.dataLoading = false;
      },
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

  // Initilize form
  initForm() {
    this.moduleLessonForm = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  // On file select
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
  }

  // Add Module
  addModuleLesson() {
    // Set loading to true
    this.loading = true;

    const formData: any = new FormData();
    formData.append('title', this.moduleLessonForm.value.title);
    formData.append('lesson_video', this.selectedFile);

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    //   console.log(pair)
    // }

    this.coursesService
    .addLessonToModule(this.currentCourseId.courseId, this.moduleId, formData)
    .subscribe({
      next: (res: any) => {
        console.log(res);
        // if (res.type === HttpEventType.UploadProgress) {
        //   const progress = Math.round(100 * res.loaded / res.total);
        //   console.log(`File upload progress: ${progress}%`);
        // } else if (res.type === HttpEventType.Response) {
        //   console.log('File upload complete');
        // }
        
        if(res.status === true) {
          this.showAlertPopup(res.message, 'success');
          // Set file name to empty
          this.selectedFileName = ''
          setTimeout(() => {
            this.addModuleLessonModal = false
            this.ngOnInit();
          }, 3000);
        }
      },
      error: (error: any) => {
        console.log(error);
        this.showAlertPopup(error.error.message, 'error');

        // Set loading to false
        this.loading = false;
      }
    });
  }


  
  
  // Add Module Lesson
  openModuleLesson(moduleId: string, moduleName: string) {
    this.moduleId = moduleId
    this.moduleName = moduleName
    this.addModuleLessonModal = true
    
  }
  // Close Add Module
  closeAddModuleLesson() {
    this.addModuleLessonModal = false
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
