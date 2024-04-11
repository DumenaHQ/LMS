import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-details-display-school-teacher',
  templateUrl: './details-display-school-teacher.component.html',
  styleUrls: ['./details-display-school-teacher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsDisplaySchoolTeacherComponent implements OnInit {

  contentId: any = 'courses';
  addLearnerToProgramModal: boolean = false;
  currentProgramId: any;
  program: any;
  programId: string;
  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string
  user: any;
  loading: boolean = false;

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
      .getProgramsById(this.currentProgramId.teacherId)
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

   // Add Parent to Program
   addParentToProgram(programId: string) {
    this.loading = true;

    let payload = {
      parents: [
        {
          user_id: this.user.id,
          name: this.user.fullname,
        },
      ],
    };
    
    this.programsService.addParentToProgram(payload, programId).subscribe({
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
      complete: () => {
        this.loading = false;
      },
    });
  }

  // Add School to program
  addSchoolToProgram(programId: string) {
    this.loading = true;

    let payload = {
      schools: [
        {
          user_id: this.user.id,
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
            this.ngOnInit()
          }, 3000);
        }
      },
      error: (e) => console.error(e),
      complete: () => {
        this.loading = false;
      },
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

