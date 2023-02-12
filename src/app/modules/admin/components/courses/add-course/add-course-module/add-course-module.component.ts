import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-add-course-module',
  templateUrl: './add-course-module.component.html',
  styleUrls: ['./add-course-module.component.scss']
})
export class AddCourseModuleComponent implements OnInit {

  selectedFile: File;
  previewImage: any;
  showPreviewImage: boolean = false;
  loading: boolean = false;
  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string;
  moduleForm: any = FormGroup;
  currentCourseId: any;
  dataLoading: boolean = true;
  modules: any;
  addModuleModal: boolean = false;

  constructor(
    private coursesService: CoursesService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {

     // Get Current Program
     this.currentCourseId = this.activatedRoute.snapshot.params;

    // Module Form
    this.moduleForm = this.formBuilder.group({
      title: ['', Validators.required],
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

        setTimeout(() => {
          this.addModuleModal = false
          this.ngOnInit()
        }, 3000);
      }
    });
  }

  // Open Add Module
  openAddModuleModal() {
    this.addModuleModal = true
  }

  // Close Add Module
  closeAddModuleModal() {
    this.addModuleModal = false
  }

  // Route to add lesson
  addLesson(moduleId: string) {
    this.router.navigate([`admin/courses/create-course/${this.currentCourseId.courseId}/modules/${moduleId}/add-lesson`])
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
