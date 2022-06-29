import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-popup-alert',
  templateUrl: './dashboard-popup-alert.component.html',
  styleUrls: ['./dashboard-popup-alert.component.scss']
})
export class DashboardPopupAlertComponent implements OnInit {

  isEdit: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
