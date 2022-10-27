import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-school-programs-details',
  templateUrl: './school-programs-details.component.html',
  styleUrls: ['./school-programs-details.component.scss'],
})
export class SchoolProgramsDetailsComponent implements OnInit {
  contentId: any = 'content';
  addModal: boolean = false;
  title: string = 'child';
  isAlert: boolean = false;
  alertMessage: string = '';

  constructor() {}

  ngOnInit(): void {}

  // Tab change
  tabChange(ids: any) {
    this.contentId = ids;
  }
  // Open Add Child Modal
  openAddModal() {
    this.addModal = true;
  }

  // Close Add Child Modal
  closeAddModal() {
    this.addModal = false;
  }

  // Show alert
  showAlert() {
    // Show Alert
    this.isAlert = true;

    // Hide Alert
    setTimeout(() => {
      this.isAlert = false;
    }, 2000);
  }

  // Set alert message
  setAlertMessage(message: any) {
    this.alertMessage = message;
  }
}
