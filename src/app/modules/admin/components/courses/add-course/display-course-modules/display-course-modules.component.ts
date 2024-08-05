import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AlertType,
  AppAlertService,
} from 'src/app/services/app-alerts/app-alert.service';

@Component({
  selector: 'app-display-course-modules',
  templateUrl: './display-course-modules.component.html',
  styleUrls: ['./display-course-modules.component.scss']
})
export class DisplayCourseModulesComponent implements OnInit {

  formGroup: any = FormGroup;
  loading: boolean = false;
  currentCourseId: any;
  dataLoading: boolean = true;
  modules: any;
  addModuleLessonModal: boolean = false;
  moduleId: string;
  moduleName: string;
  selectedFileName: string = '';
  selectedFile: File;
  course: any;
  activeIndex: number | null = null;

  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private appAlertService: AppAlertService
  ) {}
  
  ngOnInit(): void {
    this.initForm();
     this.currentCourseId = this.activatedRoute.snapshot.params;
     this.getCoure();
  }

  // Get course
  getCoure() {
    this.coursesService.getCourse(this.currentCourseId.courseId).subscribe({
      next: (res: any) => {
        this.course = res.data.course;
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
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      note: ['', Validators.required],
      lesson_video: [''],
    });
  }

  // On file select
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
    this.selectedFileName = file.name;   
  }

  // Add Module
  addModuleLesson() {
    // Set loading to true
    this.loading = true;

    const formData: any = new FormData();
    formData.append('title', this.formGroup.value.title);
    formData.append('note', this.formGroup.value.title);
    formData.append('lesson_video', this.selectedFile);
    formData.append('has_video', true);

    this.coursesService.addLessonToModule(this.currentCourseId.courseId, this.moduleId, formData)
      .then(res => {
        if(res.status === true) {
          // if (res.type === HttpEventType.UploadProgress) {
          //   const progress = Math.round(100 * res.loaded / res.total);
          //   console.log(`File upload progress: ${progress}%`);
          // } else if (res.type === HttpEventType.Response) {
          //   console.log('File upload complete');
          // }
          this.appAlertService.showAlert(res.message, AlertType.Success);
          this.selectedFileName = '';
          this.addModuleLessonModal = false
          this.getCoure();
        }
      })
      .catch(error => {
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

  // Check if date is current date
  isCurrentDate(dateStr: string): boolean {
    const date = new Date(dateStr);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  toggleAccordion(index: number) {
    if (this.activeIndex === index) {
      this.activeIndex = null;
    } else {
      this.activeIndex = index;
    }
  }
}
