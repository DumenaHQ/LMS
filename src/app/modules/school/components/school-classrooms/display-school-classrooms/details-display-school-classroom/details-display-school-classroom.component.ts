import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from 'src/app/services/classroom.service';
import { ClassroomModel, Term } from '../models/classroom.model';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';

@Component({
  selector: 'app-details-display-school-classroom',
  templateUrl: './details-display-school-classroom.component.html',
  styleUrls: ['./details-display-school-classroom.component.scss'],
})
export class DetailsDisplaySchoolClassroomComponent implements OnInit {
  contentId: any = 'courses';
  currentClassroomId: any;
  classroom?: ClassroomModel;
  dataLoading: boolean = true;
  addCourseToClassroom: boolean = false;
  addLearnerToClassroom: boolean = false;

  updatingClassDate: boolean = false;
  activeSession?: Term;

  deleteModal: boolean = false;
  deleteUrl: string;
  deleteRoutePath: string;
  teacherName: any;
  courseQuizResult: boolean = false;
  course: any;

  constructor(
    private classroomService: ClassroomService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private changeDectetorRef: ChangeDetectorRef,
    private appAlertService: AppAlertService
  ) {}

  ngOnInit(): void {
    // Get Current classroom
    this.currentClassroomId = this.activatedRoute.snapshot.params;
    this.getClassrooms();
  }

  confirmSessionDates(defaultSessionConfirmed: any) {
    if (defaultSessionConfirmed.confrimType === 'withoutEdit') {
      if (!this.classroom?.active_term?.start_date || !this.classroom?.active_term.end_date) {
        this.appAlertService.showAlert(
          'Something went wrong.\nPlease contact admin.',
          AlertType.Error,
        );
        
        return;
      }
      this.confirmDefaultSessionDates(this.classroom?.active_term?.start_date, this.classroom?.active_term.end_date);
    } else {
      this.confirmDefaultSessionDates(defaultSessionConfirmed.value.active_term_start_date, defaultSessionConfirmed.value.active_term_end_date);
    }
  }

  confirmDefaultSessionDates(startDate: any, endDate: any) {
    this.updatingClassDate = true;

    const start = startDate && new Date(startDate);
    const end = endDate && new Date(endDate);

    var formData: any = new FormData();
    formData.append('active_term_start_date', new Date(start).toISOString());
    formData.append('active_term_end_date', new Date(end).toISOString());

    this.classroomService.editClassroom(formData, this.currentClassroomId.classroomId)
      .then(res => {
        if (res.status === true) {
          this.appAlertService.showAlert(
            res.message,
            AlertType.Success,
          );

          // Set Timeout
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }

        this.updatingClassDate = false;
      })
      .catch(error => {
        console.log(error);
        // Show error message
        this.appAlertService.showAlert(
          error.message,
          AlertType.Error,
        );

        this.updatingClassDate = false;
      });
  }

  // Get classrooms
  getClassrooms() {
    this.classroomService
      .getClassroomById(this.currentClassroomId.classroomId)
      .subscribe({
        next: (res: any) => {
          this.classroom = res.data.class;
          this.changeDectetorRef.detectChanges();
        },
        error: (e) => console.error(e),
        // complete: () => {
        //   this.dataLoading = false;
        // },
      });
  }

  // Open add course to classroom modal
  openAddCourseToClassroomModal() {
    this.addCourseToClassroom = true;
  }

  // Close add course to classroom modal
  closeAddCourseToClassroomModal() {
    this.addCourseToClassroom = false;
  }

  // Open add learner to classroom modal
  openAddLearnerToClassroomModal() {
    this.addLearnerToClassroom = true;
  }

  // Close add learner to classroom modal
  closeAddLearnerToClassroomModal() {
    this.addLearnerToClassroom = false;
  }

  // Remove teacher
  // Open Confirm Delete Modal
  openDeleteModal(teacher: any) {
    // this.teacherName = teacher.username;

    this.deleteModal = true;

    this.deleteUrl = `classes/${this.currentClassroomId.classroomId}/teacher/remove`;
    this.deleteRoutePath = '';
  }

  // Close Confirm Delete Modal
  closeDeleteModal() {
    this.deleteModal = false;
  }

  // Edit classroom
  editClassroom() {
    this.router.navigate([
      `/school/classrooms/${this.currentClassroomId.classroomId}/edit-classroom`,
    ]);
  }

  openViewCourseQuizResult(course: any) {
    this.course = course;
    this.courseQuizResult = true;
  }

  closeViewCourseQuizResult() {
    this.courseQuizResult = false;
  }

  // Tab change
  tabChange(ids: any) {
    this.contentId = ids;
  }
}
