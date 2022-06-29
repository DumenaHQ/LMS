import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notifi-popup',
  templateUrl: './notifi-popup.component.html',
  styleUrls: ['./notifi-popup.component.scss']
})
export class NotifiPopupComponent implements OnInit {

  @Output() toggleNotifi: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeNotifiPopup() {
    this.toggleNotifi.emit()
  }

}
