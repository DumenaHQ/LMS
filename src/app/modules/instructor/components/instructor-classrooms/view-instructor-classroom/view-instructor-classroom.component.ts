import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-view-instructor-classroom',
  templateUrl: './view-instructor-classroom.component.html',
  styleUrls: ['./view-instructor-classroom.component.scss']
})
export class ViewInstructorClassroomComponent implements OnInit {

  contentId: any = 'courses';
  currentClassroomId: any;
  classroom: any;
  dataLoading: boolean = true;
  addCourseToClassroom: boolean = false;
  addLearnerToClassroom: boolean = false;
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

    // Get classrooms
    this.classroomService
      .getClassroomById(this.currentClassroomId.classroomId)
      .subscribe({
        next: (res: any) => {
          this.classroom = res.data.class;
          this.changeDectetorRef.detectChanges();
        },
        error: (e) => console.error(e),
      });
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

