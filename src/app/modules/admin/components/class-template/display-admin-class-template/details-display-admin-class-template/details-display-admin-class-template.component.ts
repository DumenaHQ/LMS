import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from 'src/app/services/classroom.service';
import { ClassTemplateDetailModel } from './interfaces/class-template.model';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';

@Component({
  selector: 'app-details-display-admin-class-template',
  templateUrl: './details-display-admin-class-template.component.html',
  styleUrls: ['./details-display-admin-class-template.component.scss']
})
export class DetailsDisplayAdminClassTemplateComponent implements OnInit {
  
  contentId: any = 'courses';
  currentClassId: any;
  classroomTemplate!: ClassTemplateDetailModel;
  dataLoading: boolean = true;
  addCourseToClass: boolean = false;
  confirmModal: boolean = false;
  confirmMessage: string;
  classTemplateCourse: any;

  constructor(
    // private programsService: ProgramsService,
    private classroomService: ClassroomService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private appAlertService: AppAlertService,
    private changeDectetorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Get Current Program
    this.currentClassId = this.activatedRoute.snapshot.params;
    this.getClassroomTemplateById();
  }
  
  getClassroomTemplateById() {
    this.classroomService
      .getClassroomTemplateById(this.currentClassId.classTemplateId)
      .subscribe({
        next: (res: any) => {
          this.classroomTemplate = res.data.classTemplate;
          this.changeDectetorRef.detectChanges();
        },
        error: (e) => console.error(e),
        // complete: () => {
        //   this.dataLoading = false;
        // },
      });
  }

  // Open add course to class modal
  openAddCourseToClassModal() {
    this.addCourseToClass = true
  }

  // Close add course to class modal
  closeAddCourseToClassModal() {
    this.addCourseToClass = false
  }

  // Edit class
  editClassTemplate() {
    this.router.navigate([`/admin/class-templates/${this.currentClassId.classTemplateId}/edit-class-template`]);
  }

  // Tab change
  tabChange(ids: any) {
    this.contentId = ids;
  }

  openConfirmModal(course: any) {
    this.confirmModal = true;
    this.confirmMessage = `Are you sure you want to remove ${course.title}?`;
    this.classTemplateCourse = course;
  }

  removeCourse() {
    this.classroomService
    .removeCourseFromClassroomTemplate(this.currentClassId.classTemplateId, this.classTemplateCourse.id)
    .subscribe({
      next: (res: any) => {
        this.getClassroomTemplateById();
        this.closeConfirmModal();
        this.appAlertService.showAlert(res.message, AlertType.Success);
      },
      error: (error: any) => {
        console.log(error);
        this.appAlertService.showAlert(
          error.error.error.code == 400
          ? (error.error.error.errors[0].message)
          : (error.error.message),
          AlertType.Error
        );
      }
    });
  }

  // Close Confirm Delete Modal
  closeConfirmModal() {
    this.confirmModal = false;
  }

}

