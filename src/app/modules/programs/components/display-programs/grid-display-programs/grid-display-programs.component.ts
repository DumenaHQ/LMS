import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-grid-display-programs',
  templateUrl: './grid-display-programs.component.html',
  styleUrls: ['./grid-display-programs.component.scss']
})
export class GridDisplayProgramsComponent implements OnInit {

  @Input() programs: any;
  @Input() user: any;
  @Output() reloadData: EventEmitter<any> = new EventEmitter();
  confirmModal: boolean = false;
  confirmUrl: string;
  confirmMessage: string;
  activeIndex: number | null = null;
  loading: boolean;
  adduserToProgram$: Observable<any>;
  selectedProgramId: any;

  constructor(
    private router: Router,
    private programsService: ProgramsService,
    private appAlertService: AppAlertService
  ) {}

  ngOnInit(): void {
  }

  // View program
  viewProgram(programId?: string, activeTab?: string) {
    this.router.navigate([`/${this.user.role}/programs/${programId}/view-program`], {
      queryParams: { activeTab: activeTab },
    });
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
      this.adduserToProgram$ = this.programsService.addSchoolToProgram(payload, this.selectedProgramId);
    } else {
      this.adduserToProgram$ = this.programsService.addParentToProgram(payload, this.selectedProgramId);
    }
    this.adduserToProgram$.subscribe({
      next: (res: any) => {
        if (res.status === true) {
          this.appAlertService.showAlert(res.message, AlertType.Success);
          this.router.navigate([`/${this.user.role}/programs/${this.selectedProgramId}`]);
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

  // Open Confirm Delete Modal
  openConfirmModal(program: any, type: string) {
    this.confirmModal = true;
    if(type === 'join') {
      this.confirmMessage = `Are you sure you want to join ${program.name}?`;
      this.confirmUrl = '';
      this.selectedProgramId = program.id;    
    } else if(type === 'delete') {
      this.confirmMessage = `Are you sure you want to delete ${program.name}?`;
      this.confirmUrl = `programs/${program.id}`;
    }
  }

  getReloadData() {
    this.reloadData.emit();
  }

  // Close Confirm Delete Modal
  closeConfirmModal() {
    this.confirmModal = false;
  }

  toggleAction(index: number) {
    if (this.activeIndex === index) {
      this.activeIndex = null;
    } else {
      this.activeIndex = index;
    }
  }

}

