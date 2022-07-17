import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-school-students',
  templateUrl: './school-students.component.html',
  styleUrls: ['./school-students.component.scss']
})
export class SchoolStudentsComponent implements OnInit {

  addModal: boolean = false;
  showAlert: boolean = false;
  user: any;
  title: string = 'student'

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Get User data from localstorage
    let userData = this.authService.getUser()
    this.user = userData.user

    // Get user data from localstorage
    // this.authService.getParentChildren(this.user.id).subscribe((res: any) => {
    //   console.log(res)
    // })

  }

  openAddModal() {
    this.addModal = true
  }

  closeAddModal() {
    this.addModal = false
  }

  showAlertPopup() {
    this.showAlert = true
    // Hide after some seconds
    setTimeout(() => {
      this.showAlert = false
    }, 2000);
  }

}
