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

  // Edit classroom
  editClassroom() {
    this.router.navigate([`/school/classrooms/${this.currentClassroomId.classroomId}/edit-classroom`]);
  }

  // Tab change
  tabChange(ids: any) {
    this.contentId = ids;
  }

}
