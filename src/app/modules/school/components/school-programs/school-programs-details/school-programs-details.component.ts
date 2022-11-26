import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-school-programs-details',
  templateUrl: './school-programs-details.component.html',
  styleUrls: ['./school-programs-details.component.scss'],
})
export class SchoolProgramsDetailsComponent implements OnInit {
  contentId: any = 'content';
  addChildToProgramModal: boolean = false;
  title: string = 'child';
  isAlert: boolean = false;
  alertMessage: string = '';
  currentProgramId: any;
  program: any;
  programId: string;
  programCourses: any;

  constructor(
    private programsService: ProgramsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get Current Program
    this.currentProgramId = this.activatedRoute.snapshot.params;

    // Get programs
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

    // Get programs
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
  // Open Add Child Modal
  openAddChildToProgramModal() {
    this.addChildToProgramModal = true;
  }

  // Close Add Child Modal
  closeAddChildToProgramModal() {
    this.addChildToProgramModal = false;
  }

  // Show alert
  showAlertPopup() {
    // Show Alert
    this.isAlert = true;

    // Hide Alert
    setTimeout(() => {
      this.isAlert = false;
    }, 2000);
  }

  // Set alert message
  setAlertMessage(message: any) {
    this.alertMessage = message;
  }
}
