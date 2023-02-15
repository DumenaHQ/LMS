import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProgramsService } from 'src/app/services/programs.service';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-display-program-details',
  templateUrl: './display-program-details.component.html',
  styleUrls: ['./display-program-details.component.scss']
})
export class DisplayProgramDetailsComponent implements OnInit {

  contentId: any = 'content';
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
    private authService: AuthService
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

          console.log(this.program);
          
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

  // Join Program
  joinProgram() {
    // this.loading = true;

    let payload = {
      schools: [
        {
          user_id: this.user.id,
          name: this.user.fullname,
        },
      ],
    };

    this.programsService.addSchoolToProgram(payload, this.programId).subscribe({
      next: (res: any) => {
        console.log(res);

        if (res.status === true) {
          this.showAlertPopup(res.message, 'success');

          setTimeout(() => {
            this.ngOnInit()
          }, 3000);
        }
      },
      error: (e) => console.error(e),
    });
  }

  // Open Add Child Modal
  openAddLearnerToProgramModal() {
    this.addLearnerToProgramModal = true;
  }

  // Close Add Child Modal
  closeAddLearnerToProgramModal() {
    this.addLearnerToProgramModal = false;
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
