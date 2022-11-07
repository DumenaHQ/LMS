import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-school-programs-overview',
  templateUrl: './school-programs-overview.component.html',
  styleUrls: ['./school-programs-overview.component.scss'],
})
export class SchoolProgramsOverviewComponent implements OnInit {
  dataLoading: boolean = true;
  programs: any;

  constructor(
    private programsService: ProgramsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get programs
    this.programsService.getAllPrograms().subscribe({
      next: (res: any) => {
        this.programs = res.data.programs;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  // Display program
  displayProgram(programId: string) {
    this.router.navigate([`/school/programs/${programId}`]);
  }

  // Delete program
  deleteProgram(program: any) {
    // Get programs
    this.programsService.deleteProgram(program.id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.programs;
      },
      error: (e) => console.error(e),
      // complete: () => {
      //   this.dataLoading = false;
      // },
    });
  }
}
