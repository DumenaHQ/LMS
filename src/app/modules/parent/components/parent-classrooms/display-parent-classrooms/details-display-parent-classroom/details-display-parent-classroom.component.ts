import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-details-display-parent-classroom',
  templateUrl: './details-display-parent-classroom.component.html',
  styleUrls: ['./details-display-parent-classroom.component.scss']
})
export class DetailsDisplayParentClassroomComponent implements OnInit {

  contentId: any = 'courses';
  currentClassroomId: any;
  classroom: any;
  dataLoading: boolean = true;
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

  // Open add learner to classroom modal
  openAddLearnerToClassroomModal() {
    this.addLearnerToClassroom = true;

    console.log(this.addLearnerToClassroom);
    
  }
  
  // Close add learner to classroom modal
  closeAddLearnerToClassroomModal() {
    this.addLearnerToClassroom = false;
  }

  // Tab change
  tabChange(ids: any) {
    this.contentId = ids;
  }

}

