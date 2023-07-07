import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-display-learner-programs',
  templateUrl: './display-learner-programs.component.html',
  styleUrls: ['./display-learner-programs.component.scss']
})
export class DisplayLearnerProgramsComponent implements OnInit {

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
        console.log(res);
        
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  // Display program
  displayProgram(programId: string) {
    this.router.navigate([`/${this.user.role}/programs/${programId}`]);
  }

  // Delete program
  // deleteProgram(program: any) {
  //   this.programsService.deleteProgram(program.id).subscribe({
  //     next: (res: any) => {
  //       console.log(res);
  //       this.programs;
  //     },
  //     error: (e) => console.error(e),
  //     // complete: () => {
  //     //   this.dataLoading = false;
  //     // },
  //   });
  // }

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
