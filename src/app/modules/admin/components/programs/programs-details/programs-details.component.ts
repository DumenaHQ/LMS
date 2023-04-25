import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-programs-details',
  templateUrl: './programs-details.component.html',
  styleUrls: ['./programs-details.component.scss'],
})
export class ProgramsDetailsComponent implements OnInit {


  contentId: any = 'courses';
  currentProgramId: any;
  program: any;
  dataLoading: boolean = true;
  addCourseToProgram: boolean = false;

  constructor(
    private programsService: ProgramsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private changeDectetorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Get Current Program
    this.currentProgramId = this.activatedRoute.snapshot.params;

    // Get programs
    this.programsService
      .getProgramsById(this.currentProgramId.programId)
      .subscribe({
        next: (res: any) => {
          this.program = res.data.program;
          console.log({
            title: 'Programs',
            data: this.program
          });
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
