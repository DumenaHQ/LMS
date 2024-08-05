import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
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
  formGroup: any = FormGroup;
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
    private authService: AuthService,
    private appAlertService: AppAlertService,
  ) {}

  ngOnInit(): void {
     this.user = this.authService.getUser().user;
     this.currentModule = this.activatedRoute.snapshot.params;
     this.getCourseByCourseId();
     this.initForm();
  }

  getCourseByCourseId() {
    this.coursesService.getCourse(this.currentModule.courseId).subscribe({
      next: (res: any) => {
        this.course = res.data.course;
      },
      error: (e) => console.error(e),
    });
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
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
    if (this.formGroup.value.objectives !== '') {
      this.isObjectivesList = true;
      this.objectivesList.push(this.formGroup.value.objectives);
    }
    this.formGroup.get('objectives').setValue('');
  }

  // Remove objective
  removeObjective(index: any) {
    this.objectivesList.splice(index, 1);
  }

   // Add Class activity
   addClassActivity() {
    // Show added class activity(s)
    if (this.formGroup.value.class_activities !== '') {
      // Show added class activity(s)
      this.isClassActivityList = true;
      this.classActivityList.push(this.formGroup.value.class_activities);
    }
    // Clear input field
    this.formGroup.get('class_activities').setValue('');
  }

  // Remove class activity
  removeClassActivity(index: any) {
    this.classActivityList.splice(index, 1);
  }
  
   // Add Further reading link
   addFurtherReadingLink() {
    if (this.formGroup.value.further_reading_links_caption !== '' && this.formGroup.value.further_reading_links_url !== '') {
      // Show added further reading links
      this.isFurtherReadingLinksList = true;
      this.furtherReadingLinksList.push(
        {
          caption: this.formGroup.value.further_reading_links_caption,
          url: this.formGroup.value.further_reading_links_url
        }
      );
    }

    // Clear input field
    this.formGroup.get('further_reading_links_caption').setValue('');
    this.formGroup.get('further_reading_links_url').setValue('');
  }

  // Remove further reading link
  removeFurtherReadingLink(index: any) {
    this.furtherReadingLinksList.splice(index, 1);
  }

  // Add Module
  addModule(submitType: string) {
    this.loading = true;
    
    let payload = {
      title: this.formGroup.value.title,
      objectives: this.objectivesList,
      further_reading: this.formGroup.value.further_reading,
      class_activities: this.classActivityList,
      further_reading_links: this.furtherReadingLinksList,
      code_example: this.formGroup.value.code_example,
      instructor: this.formGroup.value.instructor
    }

    this.coursesService
    .addModule(this.currentModule.courseId, payload)
    .subscribe((res: any) => {
        this.appAlertService.showAlert(res.message, AlertType.Success);
        if(res.status === true) {
          if(submitType === 'Save and New') {
            // Reset all forms
            this.formGroup.get('title').setValue('');
            this.objectivesList = [];
            this.classActivityList = [];
            this.furtherReadingLinksList = [];
            this.loading = false;      
          } else {
            this.router.navigate([`admin/courses/${this.currentModule.courseId}/modules`]);
          }
        }
      });
  }
}
