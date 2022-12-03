import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.scss'],
})
export class AlertPopupComponent implements OnInit {
  @Input() alertMessage: string = '';
  @Input() alertColor: string = '';

  constructor() {}

  ngOnInit(): void {
  }
}
