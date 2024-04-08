import { Component, Input, OnInit } from '@angular/core';
import { AlertType } from 'src/app/services/app-alerts/app-alert.service';

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.scss'],
})
export class AlertPopupComponent implements OnInit {
  @Input() alertMessage: string = '';
  @Input() alertColor: string = '';
  @Input() alertType: AlertType;

  constructor() {}

  ngOnInit(): void {
  }
}
