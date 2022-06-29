import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenComponent implements OnInit {

  addModal: boolean = false;
  showAlert: boolean = false;
  user: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Get user data from localstorage
    // this.authService.allUser().subscribe((res: any) => {
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
