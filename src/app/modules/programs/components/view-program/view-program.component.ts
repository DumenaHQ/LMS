import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { QueryActiveTabService } from 'src/app/services/utils/query-active-tab.service';
import { ProgramsService } from 'src/app/services/programs.service';
type Tabs = 'courses' | 'learners' | 'schools';

@Component({
  selector: 'app-view-program',
  templateUrl: './view-program.component.html',
  styleUrls: ['./view-program.component.scss']
})
export class ViewProgramComponent implements OnInit {

  activeTab: Tabs = 'courses';
  currentProgramId: any;
  program?: any;
  dataLoading: boolean = true;
  addCourseToProgram: boolean = false;
  addLearnerToProgram: boolean = false;
  course: any;
  user: any;

  constructor(
    private programsService: ProgramsService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private changeDectetorRef: ChangeDetectorRef,
    private appAlertService: AppAlertService,
    private queryActiveTabService: QueryActiveTabService,
  ) {}

  ngOnInit(): void {
    this.currentProgramId = this.activatedRoute.snapshot.params;
    this.user = this.authService.getUser().user;

    this.activatedRoute.queryParams.subscribe((params) => {
      if(params['activeTab']) {
        this.activeTab = params['activeTab'];
      }
    });
    this.getPrograms();
  }

  // Get programs
  getPrograms() {
    this.programsService
      .getProgramsById(this.currentProgramId.programId)
      .subscribe({
        next: (res: any) => {
          this.program = res.data.programs;
          this.changeDectetorRef.detectChanges();
        },
        error: (e) => console.error(e),
      });
  }

  // Open add course to program modal
  openAddCourseToProgramModal() {
    this.addCourseToProgram = true;
  }

  // Close add course to program modal
  closeAddCourseToProgramModal() {
    this.addCourseToProgram = false;
  }

  // Open add leaPner to program modal
  openAddLearnerToProgramModal() {
    this.addLearnerToProgram = true;
  }

  // Close add leaPner to program modal
  closeAddLearnerToProgramModal() {
    this.addLearnerToProgram = false;
  }

  // Edit program
  editProgram() {
    this.router.navigate([
      `/${this.user.role}/programs/${this.currentProgramId.programId}/edit-program`,
    ]);
  }

  watchCourse(courseId: string) {    
    this.router.navigate([
      `/${this.user.role}/programs/courses/${courseId}`,
    ]);
  }

  goToViewAllPrograms() {
    this.router.navigate([`/${this.user.role}/programs`]);
  }

  // Set Active Tab
  setActiveTab(tab: Tabs) {
    this.activeTab = tab;
    this.queryActiveTabService.setActiveTabInQueryParams(tab);
  }

}

