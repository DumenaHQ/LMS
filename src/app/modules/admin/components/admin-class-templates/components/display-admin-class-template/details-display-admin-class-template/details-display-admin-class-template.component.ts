import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from 'src/app/services/classroom.service';
import { ClassTemplateDetailModel } from './interfaces/class-template.model';

@Component({
  selector: 'app-details-display-admin-class-template',
  templateUrl: './details-display-admin-class-template.component.html',
  styleUrls: ['./details-display-admin-class-template.component.scss']
})
export class DetailsDisplayAdminClassTemplateComponent implements OnInit {
  
  contentId: any = 'courses';
  currentProgramId: any;
  classroomTemplate!: ClassTemplateDetailModel;
  dataLoading: boolean = true;
  addCourseToProgram: boolean = false;

  constructor(
    // private programsService: ProgramsService,
    private classroomService: ClassroomService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private changeDectetorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Get Current Program
    this.currentProgramId = this.activatedRoute.snapshot.params;

    // Get programs
    this.classroomService
      .getClassroomTemplateById(this.currentProgramId.classTemplateId)
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

  // Open add course to program modal
  openAddCourseToProgramModal() {
    this.addCourseToProgram = true
  }

  // Close add course to program modal
  closeAddCourseToProgramModal() {
    this.addCourseToProgram = false
  }

  // Edit program
  editProgram() {
    this.router.navigate([`/admin/programs/${this.currentProgramId.programId}/edit-program`]);
  }

  // Tab change
  tabChange(ids: any) {
    this.contentId = ids;
  }
}

