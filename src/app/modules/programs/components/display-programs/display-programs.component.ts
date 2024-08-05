import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-display-programs',
  templateUrl: './display-programs.component.html',
  styleUrls: ['./display-programs.component.scss']
})
export class DisplayProgramsComponent implements OnInit {

  dataLoading: boolean;
  programs: any;
  user: any;

  constructor(
    private programsService: ProgramsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user= this.authService.getUser().user;
    this.getPrograms();
  }

  getPrograms() {
    this.dataLoading = true;
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

  goToAddProgram() {
    this.router.navigate([`/admin/programs/add-program`]);
  }

}
