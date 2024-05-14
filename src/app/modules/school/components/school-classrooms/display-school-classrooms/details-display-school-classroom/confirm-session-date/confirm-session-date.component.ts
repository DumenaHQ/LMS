import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClassroomModel, Term } from '../../models/classroom.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-confirm-session-date',
  templateUrl: './confirm-session-date.component.html',
  styleUrls: ['./confirm-session-date.component.scss']
})
export class ConfirmSessionDateComponent implements OnInit {
  @Output() confirmSessionDateAction: EventEmitter<any> = new EventEmitter();

  @Input() classroom?: ClassroomModel;
  @Input() loading: boolean;
  formGroup: FormGroup;
  isChange: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  // Initialize form
  initForm() {
    this.formGroup = this.formBuilder.group({
      active_term_start_date: ['', [Validators.required]],
      active_term_end_date: ['', [Validators.required]],
    });
  }

  changeDatesToggle() {
    this.isChange = !this.isChange;
  }

  get minDate(): string | undefined {
    const startDate = this.classroom?.active_term?.start_date;
    if (!startDate) return;

    return moment(startDate).format('YYYY-MM-DD');
  }

  get maxDate(): string | undefined {
    const endDate = this.classroom?.active_term?.end_date;
    if (!endDate) return;

    return moment(endDate).format('YYYY-MM-DD');
  }

  // Close modal
  confirmAction() {
    const { value } = this.formGroup;
    let confrimType;
    if (this.isChange && value.active_term_start_date && value.active_term_end_date) {
      confrimType = 'withEdit';
    } else {
      confrimType = 'withoutEdit';
    }
    
    this.confirmSessionDateAction.emit({confrimType, value});
  } 
}
