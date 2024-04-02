import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-details-display-admin-class-template',
  templateUrl: './details-display-admin-class-template.component.html',
  styleUrls: ['./details-display-admin-class-template.component.scss']
})
export class DetailsDisplayAdminClassTemplateComponent implements OnInit {

  contentId: any = 'courses';
  currentClassTemplateId: any;
  classTemplate: any;
  dataLoading: boolean = true;
  addCourseToTemplate: boolean = false;
  addLearnerToClassroom: boolean = false;

  constructor(
    private classroomService: ClassroomService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private changeDectetorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Get Current classroom
    this.currentClassTemplateId = this.activatedRoute.snapshot.params;

    // Get classrooms
    this.classroomService
      .getClassroomTemplateById(this.currentClassTemplateId.classTemplateId)
      .subscribe({
        next: (res: any) => {
          this.classTemplate = res.data.classTemplate
          ;
          this.changeDectetorRef.detectChanges();
        },
        error: (e) => console.error(e),
        // complete: () => {
        //   this.dataLoading = false;
        // },
      });
  }

  // Open add course to class Template modal
  openAddCourseToTemplateModal() {
    this.addCourseToTemplate = true;
  }

  // Close add course to class Template modal
  closeAddCourseToTemplateModal() {
    this.addCourseToTemplate = false;
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
    this.router.navigate([`/admin/class-templates/${this.currentClassTemplateId.classTemplateId}/edit-class-template`]);
  }

  // Tab change
  tabChange(ids: any) {
    this.contentId = ids;
  }

}

