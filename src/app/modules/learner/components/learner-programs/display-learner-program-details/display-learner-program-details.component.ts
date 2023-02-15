import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProgramsService } from 'src/app/services/programs.service';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-display-learner-program-details',
  templateUrl: './display-learner-program-details.component.html',
  styleUrls: ['./display-learner-program-details.component.scss']
})
export class DisplayLearnerProgramDetailsComponent implements OnInit {

  contentId: any = 'courses';
  addLearnerToProgramModal: boolean = false;
  currentProgramId: any;
  program: any;
  programId: string;
  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string
  user: any;

  constructor(
    private programsService: ProgramsService,
    private activatedRoute: ActivatedRoute, 
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get Current Program
    this.currentProgramId = this.activatedRoute.snapshot.params;

    // Get User data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;
    
    // Get program
    this.programsService
      .getProgramsById(this.currentProgramId.programId)
      .subscribe({
        next: (res: any) => {
          this.program = res.data.program;
          this.programId = this.program.id;
        },
        error: (e) => console.error(e),
        // complete: () => {
        //   this.dataLoading = false;
        // },
      });
    
  }

  // Tab change
  tabChange(ids: any) {
    this.contentId = ids;
  }

  // Take course
  takeCourse(courseId: string) {
    console.log(courseId);
    
    this.router.navigate([
      `/learner/library/${courseId}`,
    ]);
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
