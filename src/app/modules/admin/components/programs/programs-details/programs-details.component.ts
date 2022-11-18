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
  schools: any;
  dataLoading: boolean = true;

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
    this.programsService.getSchools(this.currentProgramId.programId).subscribe({
      next: (res: any) => {
        this.schools = res.data.schools;
        console.log(this.schools);
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  // Tab change
  tabChange(ids: any) {
    this.contentId = ids;
  }
}
