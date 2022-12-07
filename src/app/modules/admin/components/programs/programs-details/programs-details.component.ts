import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-programs-details',
  templateUrl: './programs-details.component.html',
  styleUrls: ['./programs-details.component.scss'],
})
export class ProgramsDetailsComponent implements OnInit {
  contentId: any = 'content';
  currentProgramId: any;
  program: any;
  programSchools: any;
  dataLoading: boolean = true;
  programLearners: any;

  constructor(
    private programsService: ProgramsService,
    private activatedRoute: ActivatedRoute
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
        },
        error: (e) => console.error(e),
        // complete: () => {
        //   this.dataLoading = false;
        // },
      });

    // Get programs schools
    this.programsService
      .getProgramSchools(this.currentProgramId.programId)
      .subscribe({
        next: (res: any) => {
          this.programSchools = res.data.schools;
          console.log(this.programSchools);
        },
        error: (e) => console.error(e),
        complete: () => {
          this.dataLoading = false;
        },
      });

    // Get programs learners
    // this.programsService
    //   .getProgramLearners(this.currentProgramId.programId)
    //   .subscribe({
    //     next: (res: any) => {
    //       this.programLearners = res.data.learners;
    //       console.log(this.programLearners);
    //     },
    //     error: (e) => console.error(e),
    //     complete: () => {
    //       this.dataLoading = false;
    //     },
    //   });
  }

  // Tab change
  tabChange(ids: any) {
    this.contentId = ids;
  }
}
