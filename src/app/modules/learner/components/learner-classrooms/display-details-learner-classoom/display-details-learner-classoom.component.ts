import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-display-details-learner-classoom',
  templateUrl: './display-details-learner-classoom.component.html',
  styleUrls: ['./display-details-learner-classoom.component.scss']
})
export class DisplayDetailsLearnerClassoomComponent implements OnInit {
  
  contentId: any = 'courses';
  currentClassroomId: any;
  classroom: any;
  dataLoading: boolean = true;
  addCourseToClassroom: boolean = false;
  addLearnerToClassroom: boolean = false;

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
          console.log({
            title: 'Classroom',
            data: res
          });
          this.changeDectetorRef.detectChanges();
        },
        error: (e) => console.error(e),
        // complete: () => {
        //   this.dataLoading = false;
        // },
      });
  }

  // Take course
  takeCourse(courseId: string) {
    console.log(courseId);
    
    this.router.navigate([
      `/learner/library/${courseId}`,
    ]);
  }

  // Tab change
  tabChange(ids: any) {
    this.contentId = ids;
  }
}
