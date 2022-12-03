import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-school-programs-overview',
  templateUrl: './school-programs-overview.component.html',
  styleUrls: ['./school-programs-overview.component.scss'],
})
export class SchoolProgramsOverviewComponent implements OnInit {
  dataLoading: boolean = true;
  programs: any;
  user: any;
  loading: boolean = false;
  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string

  constructor(
    private programsService: ProgramsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get User data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    // Get programs
    this.programsService.getAllPrograms().subscribe({
      next: (res: any) => {
        this.programs = res.data.programs;
        console.log(this.programs);
        
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  // Join Program
  joinProgram(programId: string) {
    // this.loading = true;

    let payload = {
      schools: [
        {
          id: this.user.id,
          name: this.user.fullname,
        },
      ],
    };

    this.programsService.addSchoolToProgram(payload, programId).subscribe({
      next: (res: any) => {
        console.log(res);

        if (res.status === true) {
          this.showAlertPopup(res.message, 'success');

          setTimeout(() => {
            this.router.navigate([`/school/programs/${programId}`]);
          }, 3000);
        }
      },
      error: (e) => console.error(e),
      // complete: () => {
      //   this.dataLoading = false;
      // },
    });
  }

  // Display program
  displayProgram(programId: string) {
    this.router.navigate([`/school/programs/${programId}`]);
  }

  // Delete program
  deleteProgram(program: any) {
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

  // Show alert
  showAlertPopup(message: string, color: string) {
    // Set message
    this.alertMessage = message;
    // Set color
    this.alertColor = color;
    // Show Alert
    this.isAlert = true;
    // Hide Alert
    setTimeout(() => {
      this.isAlert = false;
    }, 3000);
  }
}
