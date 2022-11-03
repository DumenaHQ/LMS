import { Component, OnInit } from '@angular/core';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-school-programs-overview',
  templateUrl: './school-programs-overview.component.html',
  styleUrls: ['./school-programs-overview.component.scss'],
})
export class SchoolProgramsOverviewComponent implements OnInit {
  dataLoading: boolean = true;
  programs: any;

  constructor(private programsService: ProgramsService) {}

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
}
