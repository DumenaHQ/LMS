import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ClassroomModel } from '../../models/classroom.model';

@Component({
  selector: 'app-confirm-session-date',
  templateUrl: './confirm-session-date.component.html',
  styleUrls: ['./confirm-session-date.component.scss']
})
export class ConfirmSessionDateComponent implements OnInit {
  @Output() confirmSessionDateAction: EventEmitter<boolean> = new EventEmitter();

  @Input() classroom?: ClassroomModel;
  @Input() loading: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  // Close modal
  confirmAction(confrimType: boolean) {
    this.confirmSessionDateAction.emit(confrimType);
  } 
}
