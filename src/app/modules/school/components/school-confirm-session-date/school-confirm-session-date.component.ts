import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-school-confirm-session-date',
  templateUrl: './school-confirm-session-date.component.html',
  styleUrls: ['./school-confirm-session-date.component.scss']
})
export class SchoolConfirmSessionDateComponent implements OnInit {

  @Input() schoolSettings: any;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter();
  loading: boolean;
  formGroup: FormGroup;
  isChange: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private classroomService: ClassroomService,
    private schoolService: SchoolService,
    private appAlertService: AppAlertService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  // Initialize form
  initForm() {
    this.formGroup = this.formBuilder.group({
      active_term_start_date: [this.formatDateToString(this.schoolSettings?.active_term?.start_date), [Validators.required]],
      active_term_end_date: [this.formatDateToString(this.schoolSettings?.active_term?.end_date), [Validators.required]],
    });
  }

  formatDateToString(dateString: string | undefined): string | null {
    if (!dateString) return null;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  changeDatesToggle() {
    this.isChange = !this.isChange;
  }

  get minDate(): string | undefined {
    const startDate = this.schoolSettings?.active_term?.start_date;
    if (!startDate) return;

    return moment(startDate).format('YYYY-MM-DD');
  }

  get maxDate(): string | undefined {
    const endDate = this.schoolSettings?.active_term?.end_date;
    if (!endDate) return;

    return moment(endDate).format('YYYY-MM-DD');
  }

  confirmSessionDates() {
    const { value } = this.formGroup;
    if (this.isChange && value.active_term_start_date && value.active_term_end_date) { // User wants to edit
      this.confirmDefaultSessionDates(value.active_term_start_date, value.active_term_end_date);
    } else {
      if (!this.schoolSettings?.active_term?.start_date || !this.schoolSettings?.active_term.end_date) {
        this.appAlertService.showAlert(
          'Something went wrong.\nPlease contact admin.',
          AlertType.Error,
        );
        
        return;
      }
      this.confirmDefaultSessionDates(this.schoolSettings?.active_term?.start_date, this.schoolSettings?.active_term.end_date);
    }
  }

  confirmDefaultSessionDates(startDate: any, endDate: any) {
    this.loading = true;

    const start = startDate && new Date(startDate);
    const end = endDate && new Date(endDate);

    var formData: any = new FormData();
    formData.append('active_term_start_date', new Date(start).toISOString());
    formData.append('active_term_end_date', new Date(end).toISOString());

    let payload = {
      active_term: {
        start_date: new Date(start).toISOString(),
        end_date: new Date(end).toISOString()
      }
    }
    
    this.schoolService.updateSchoolSettings(payload).subscribe({
      next: ((res: any) => {
        this.appAlertService.showAlert(res.message, AlertType.Success);
        this.closeModal();
      }),
      error: ((error) => {
        console.log(error);
        this.appAlertService.showAlert(
          error.error.message
            ? error.error.message
            : error.message
            ? error.error.message || error.error.error.errors[0].message
            : error.message,
          AlertType.Error
        );
        this.loading = false;
      })
    })
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}
