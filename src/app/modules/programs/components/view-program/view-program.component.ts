import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { QueryActiveTabService } from 'src/app/services/utils/query-active-tab.service';
import { ProgramsService } from 'src/app/services/programs.service';
import { Observable } from 'rxjs';
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
  loading: boolean;
  adduserToProgram$: Observable<any>;
  confirmModal: boolean = false;
  confirmUrl: string;
  confirmMessage: string;

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
          this.program = res.data.program;
          this.changeDectetorRef.detectChanges();
        },
        error: (e) => console.error(e),
      });
  }

  // Open Confirm Delete Modal
  openConfirmModal(program: any, type: string) {
    this.confirmModal = true;
    if(type === 'join') {
      this.confirmMessage = `Are you sure you want to join ${program.name}?`;
      this.confirmUrl = '';   
    }
  }
  
  // Join program
  joinProgram() {
    this.loading = true;

    let payload = {
      [this.user.role === 'school' ? 'schools' : 'parents']: [
        {
          user_id: this.user.id,
          name: this.user.fullname,
        },
      ],
    };

    if(this.user.role === 'school') {
      this.adduserToProgram$ = this.programsService.addSchoolToProgram(payload, this.currentProgramId);
    } else {
      this.adduserToProgram$ = this.programsService.addParentToProgram(payload, this.currentProgramId);
    }
    this.adduserToProgram$.subscribe({
      next: (res: any) => {
        if (res.status === true) {
          this.appAlertService.showAlert(res.message, AlertType.Success);
          this.getPrograms();
        }
      },
      error: (error) => {
        console.error(error);
        this.appAlertService.showAlert(
          error.error.message
            ? error.error.message
            : error.message
            ? error.error.message || error.error.error.errors[0].message
            : error.message,
          AlertType.Error
        );
      },
      complete: () => {
        this.loading = false;
      },
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

  watchCourse(courseId: string) {    
    this.router.navigate([
      `/${this.user.role}/programs/courses/${courseId}`,
    ]);
  }

  // Edit program
  editProgram() {
    this.router.navigate([
      `/${this.user.role}/programs/${this.currentProgramId.programId}/edit-program`,
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

  // Close Confirm Delete Modal
  closeConfirmModal() {
    this.confirmModal = false;
  }

}

