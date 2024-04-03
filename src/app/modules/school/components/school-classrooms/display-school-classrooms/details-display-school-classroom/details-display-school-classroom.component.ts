import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-details-display-school-classroom',
  templateUrl: './details-display-school-classroom.component.html',
  styleUrls: ['./details-display-school-classroom.component.scss']
})
export class DetailsDisplaySchoolClassroomComponent implements OnInit {

  contentId: any = 'courses';
  currentClassroomId: any;
  classroom: any;
  dataLoading: boolean = true;
  addCourseToClassroom: boolean = false;
  addLearnerToClassroom: boolean = false;

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
    private changeDectetorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Get Current classroom
    this.currentClassroomId = this.activatedRoute.snapshot.params;
    this.getClassrooms();    
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
    this.router.navigate([`/school/classrooms/${this.currentClassroomId.classroomId}/edit-classroom`]);
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
