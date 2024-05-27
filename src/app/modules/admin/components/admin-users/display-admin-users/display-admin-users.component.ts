import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-display-admin-users',
  templateUrl: './display-admin-users.component.html',
  styleUrls: ['./display-admin-users.component.scss']
})
export class DisplayAdminUsersComponent implements OnInit {

  users: any;
  dataLoading: boolean = true;
  user: any;
  addEditUser: boolean = false;

  constructor(
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {  
    this.user = this.authService.getUser().user; 
    this.getUsers();
  }

  getUsers() {
    this.authService
      .getAllusers()
      .subscribe({
        next: (res: any) => {
          this.users = res.data.users;
        },
        error: (e) => console.error(e),
        complete: () => {
          this.dataLoading = false;
          this.changeDetectorRef.detectChanges();
        },
      });
  }

  toggleAddEditUser() {
    this.addEditUser = !this.addEditUser;
  }

}

