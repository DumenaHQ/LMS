import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-display-course-modules',
  templateUrl: './display-course-modules.component.html',
  styleUrls: ['./display-course-modules.component.scss']
})
export class DisplayCourseModulesComponent implements OnInit {

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
  file: File;
  course: any;
  // previewImage: any;
  // showPreviewImage: boolean = false;

  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute, 
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

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

  // Upload File
  uploadFile(event: any) {
  
    this.file = event.target.files[0] as File;
    // Set file name
    this.selectedFileName = this.file.name;

    console.log(this.selectedFileName);

  }
  // 'https://s3.amazonaws.com/lms.videos/Circuit-design/1st-Section.mp4'
  // Add Module
  addModuleLesson() {
    var formData: any = new FormData();
    formData.append('lesson_video', this.selectedFileName);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
      console.log(pair)
    }
    
    console.log(formData);
    console.log(this.selectedFileName);
    

    this.coursesService
    .addLessonToModule(this.currentCourseId.courseId, this.moduleId, formData)
    .subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.type === HttpEventType.UploadProgress) {
          const progress = Math.round(100 * res.loaded / res.total);
          console.log(`File upload progress: ${progress}%`);
        } else if (res.type === HttpEventType.Response) {
          console.log('File upload complete');
        }
        
        if(res.status === true) {
          this.showAlertPopup(res.message, 'success');

          
          setTimeout(() => {
            this.addModuleLessonModal = false
            this.changeDetectorRef.detectChanges()
            this.ngOnInit()
          }, 3000);
        }
      },
      error: (error: any) => {
        console.log(error);
        this.showAlertPopup(error.error.message, 'error')
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
