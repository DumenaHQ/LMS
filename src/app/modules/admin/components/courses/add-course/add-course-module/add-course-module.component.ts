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
  isObjectivesList: boolean = false;
  objectivesList: any[] = [];
  isClassActivityList: boolean = false;
  classActivityList: any[] = [];
  user: any;
  course: any;
  isFurtherReadingLinksList: boolean = false;
  furtherReadingLinksList: any[] = [];
  submitType: string;

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

     // Get Course
    this.coursesService.getCourse(this.currentModule.courseId).subscribe({
      next: (res: any) => {
        this.course = res.data.course;
        console.log(this.course);
      },
      error: (e) => console.error(e),
      complete: () => {
        // this.dataLoading = false;
      },
    });
     
     
    // Lesson Form
    this.moduleForm = this.formBuilder.group({
      title: ['', Validators.required],
      objectives: [''],
      further_reading: [''],
      class_activities: [''],
      further_reading_links_caption: [''],
      further_reading_links_url: [''],
      code_example: [''],
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
  
   // Add Further reading link
   addFurtherReadingLink() {
    if (this.moduleForm.value.further_reading_links_caption !== '' && this.moduleForm.value.further_reading_links_url !== '') {
      // Show added further reading links
      this.isFurtherReadingLinksList = true;
      this.furtherReadingLinksList.push(
        {
          caption: this.moduleForm.value.further_reading_links_caption,
          url: this.moduleForm.value.further_reading_links_url
        }
      );
    }

    // Clear input field
    this.moduleForm.get('further_reading_links_caption').setValue('');
    this.moduleForm.get('further_reading_links_url').setValue('');
    
  }

  // Remove further reading link
  removeFurtherReadingLink(index: any) {
    this.furtherReadingLinksList.splice(index, 1);
    // this.ngOnInit()
  }

  // Add Module
  addModule(submitType: string) {

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
      further_reading_links: this.furtherReadingLinksList,
      code_example: this.moduleForm.value.code_example,
      instructor: this.moduleForm.value.instructor
    }

    // Check which botton user clicks
    this.coursesService
    .addModule(this.currentModule.courseId, payload)
    .subscribe((res: any) => {
        console.log(res);
        if(res.status === true) {
          this.showAlertPopup(res.message, 'success')
          if(submitType === 'Save and New') {
            console.log({
              title: 'Save and New',
              data: payload
            });
            // Reset all forms
            this.moduleForm.get('title').setValue('');
            this.objectivesList = [];
            this.classActivityList = [];
            this.furtherReadingLinksList = [];
            this.loading = false;
            
          } else {
            console.log({
              title: 'Save and Close',
              data: payload
            });
            // Route to modules page
            setTimeout(() => {
              this.router.navigate([`admin/courses/create-course/${this.currentModule.courseId}/modules`])
            }, 3000);
          }
          
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
