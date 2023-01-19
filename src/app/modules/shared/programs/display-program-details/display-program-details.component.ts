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
  programCourses: any;
  programSchools: any;
  programLearners: any;
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

    // Get Has joined 
    this.getHasJoinedValue()

    // Get program schools
    this.getProgramSchools()

    // Get program learners
    this.getProgramLearners()

    // Get program courses
    this.getProgramCourses()

    
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

  // Get has joined
  getHasJoinedValue() {
    this.programsService
      .getAllPrograms()
      .subscribe({
        next: (res: any) => {
          let result = res.data.programs; 
          result.forEach((p: any) => {
            if(p.id === this.currentProgramId.programId) {
              this.hasJoined = p.hasJoined
            }
          });
        },
        error: (e) => console.error(e),
      });
  }

  // Get program schools
  getProgramSchools() {
    // Get programs schools
    this.programsService
    .getProgramSchools(this.currentProgramId.programId)
    .subscribe({
      next: (res: any) => {
        this.programSchools = res.data.schools;
      },
      error: (e) => console.error(e),
    });
  }

  // Get program learners
  getProgramLearners() {
    this.programsService
    .getProgramLearners(this.currentProgramId.programId)
    .subscribe({
      next: (res: any) => {
        this.programLearners = res.data.learners;
      },
      error: (e) => console.error(e),
    });
  }

  // Get program courses
  getProgramCourses() {
    this.programsService
      .getProgramCourses(this.currentProgramId.programId)
      .subscribe({
        next: (res: any) => {
          this.programCourses = res.data.courses;
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
