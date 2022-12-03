import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ProgramsService } from 'src/app/services/programs.service';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-school-programs-details',
  templateUrl: './school-programs-details.component.html',
  styleUrls: ['./school-programs-details.component.scss'],
})
export class SchoolProgramsDetailsComponent implements OnInit {
  contentId: any = 'content';
  addChildToProgramModal: boolean = false;
  currentProgramId: any;
  program: any;
  programId: string;
  programCourses: any;
  hasJoined: any;
  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string
  user: any;

  constructor(
    private programsService: ProgramsService,
    private activatedRoute: ActivatedRoute, 
    private schoolServvice: SchoolService,
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
      .getAllPrograms()
      .subscribe({
        next: (res: any) => {
          let result = res.data.programs; 
          result.forEach((p: any) => {
            if(p.id === this.currentProgramId.programId) {
              this.hasJoined = p.hasJoined
              console.log(this.hasJoined);
            }
          });
        },
        error: (e) => console.error(e),
      });

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
      
    // Get program courses
    this.programsService
      .getProgramCourses(this.currentProgramId.programId)
      .subscribe({
        next: (res: any) => {
          this.programCourses = res.data.courses;
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
            this.ngOnInit()
          }, 3000);
        }
      },
      error: (e) => console.error(e),
    });
  }

  // Open Add Child Modal
  openAddChildToProgramModal() {
    this.addChildToProgramModal = true;
  }

  // Close Add Child Modal
  closeAddChildToProgramModal() {
    this.addChildToProgramModal = false;
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
