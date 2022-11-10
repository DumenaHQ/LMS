import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-school-students',
  templateUrl: './school-students.component.html',
  styleUrls: ['./school-students.component.scss'],
})
export class SchoolStudentsComponent implements OnInit {
  addLearnerModal: boolean = false;
  isAlert: boolean = false;
  alertMessage: string = '';
  showAlert: boolean = false;
  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Get User data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    // Get user data from localstorage
    // this.authService.getParentChildren(this.user.id).subscribe((res: any) => {
    //   console.log(res)
    // })
  }

  openAddLearnerModal() {
    this.addLearnerModal = true;
  }

  closeAddLearnerModal() {
    this.addLearnerModal = false;
  }

  showAlertPopup() {
    this.showAlert = true;
    // Hide after some seconds
    setTimeout(() => {
      this.showAlert = false;
    }, 2000);
  }

  // Set alert message
  setAlertMessage(message: any) {
    this.alertMessage = message;
  }
}
