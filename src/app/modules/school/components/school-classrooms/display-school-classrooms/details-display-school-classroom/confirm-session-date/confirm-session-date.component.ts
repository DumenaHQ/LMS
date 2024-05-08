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

  get minDate(): string {
    const termsSorted = (this.classroom?.terms || []).sort(
      (a: Term, b: Term) => moment(a.start_date).diff(b.start_date),
    );

    return moment(termsSorted[0]?.start_date).format('YYYY-MM-DD');
  }
 
  get maxDate(): string {
    const termsSorted = (this.classroom?.terms || []).sort(
      (a: Term, b: Term) => moment(a.end_date).diff(b.end_date),
    );

    return moment(termsSorted[2]?.end_date).format('YYYY-MM-DD');
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
