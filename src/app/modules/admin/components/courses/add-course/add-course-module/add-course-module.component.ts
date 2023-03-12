import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-add-course-module',
  templateUrl: './add-course-module.component.html',
  styleUrls: ['./add-course-module.component.scss']
})
export class AddCourseModuleComponent implements OnInit {

  loading: boolean = false;
  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string;
  moduleForm: any = FormGroup;
  currentModule: any;
  isObjectivesList: boolean = false
  objectivesList: any[] = [];
  isClassActivityList: boolean = false
  classActivityList: any[] = [];
  user: any;

  constructor(
    private coursesService: CoursesService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
     // Get user data from localstorage
     let userData = this.authService.getUser();
     this.user = userData.user;

     // Get Current Program
     this.currentModule = this.activatedRoute.snapshot.params;
     
    // Lesson Form
    this.moduleForm = this.formBuilder.group({
      title: ['', Validators.required],
      objectives: [''],
      further_reading: ['', Validators.required],
      class_activities: [''],
      code_example: ['', Validators.required],
      instructor: [this.user.id, Validators.required],
    });
  }

   // Add objective
   addObjective() {
    // Show added objective(s)
    if (this.moduleForm.value.objectives !== '') {
      // Show added objective(s)
      this.isObjectivesList = true;
      this.objectivesList.push(this.moduleForm.value.objectives);
    }
    // Clear input field
    this.moduleForm.get('objectives').setValue('');
    
  }
  // Remove objective
  removeObjective(index: any) {
    this.objectivesList.splice(index, 1);
    // this.ngOnInit()
  }

   // Add Class activity
   addClassActivity() {
    // Show added class activity(s)
    if (this.moduleForm.value.class_activities !== '') {
      // Show added class activity(s)
      this.isClassActivityList = true;
      this.classActivityList.push(this.moduleForm.value.class_activities);
    }
    // Clear input field
    this.moduleForm.get('class_activities').setValue('');
    
  }
  // Remove class activity
  removeClassActivity(index: any) {
    this.classActivityList.splice(index, 1);
    // this.ngOnInit()
  }

  // Add and Close Module
  addAndCloseModule() {

    this.loading = true

    // If Form is invalid
    if (this.moduleForm.invalid) {
      this.loading = false;

      return;
    }
    
    let payload = {
      title: this.moduleForm.value.title,
      objectives: this.objectivesList,
      further_reading: this.moduleForm.value.further_reading,
      class_activities: this.classActivityList,
      code_example: this.moduleForm.value.code_example,
      instructor: this.moduleForm.value.instructor
    }

    console.log(payload);
    

    this.coursesService
      .addModule(this.currentModule.courseId, payload)
      .subscribe((res: any) => {
        console.log(res);
        if(res.status === true) {
          this.showAlertPopup(res.message, 'success')
          setTimeout(() => {
            this.router.navigate([`admin/courses/create-course/${this.currentModule.courseId}/modules`])
          }, 3000);
        }
      });
  }

  // Add And New Module
  addAndNewModule() {
    this.loading = true

    // If Form is invalid
    if (this.moduleForm.invalid) {
      this.loading = false;

      return;
    }
    
    let payload = {
      title: this.moduleForm.value.title,
      objectives: this.objectivesList,
      further_reading: this.moduleForm.value.further_reading,
      class_activities: this.classActivityList,
      code_example: this.moduleForm.value.code_example,
      instructor: this.moduleForm.value.instructor
    }

    this.coursesService
      .addModule(this.currentModule.courseId, payload)
      .subscribe((res: any) => {
        console.log(res);
        if(res.status === true) {
          this.showAlertPopup(res.message, 'success')
          this.moduleForm.reset()
          this.objectivesList = []
          this.classActivityList = []
          this.loading = false
        }
      });
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
