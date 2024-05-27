import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-display-admin-users',
  templateUrl: './list-display-admin-users.component.html',
  styleUrls: ['./list-display-admin-users.component.scss']
})
export class ListDisplayAdminUsersComponent implements OnInit {

  @Input() users: any;
  deleteModal: boolean = false;
  deleteUrl: string;
  deleteRoutePath: string;
  userName!: string;

  constructor() { }

  ngOnInit(): void {
  }

  // Open Confirm Delete Modal
  openDeleteModal(user: any) {
    // this.userName = teacher.fullname || '';
    // this.deleteModal = true;
    // this.deleteUrl = `users/teacher/${teacher.id}`;
    // this.deleteRoutePath = '';
  }

  // Close Confirm Delete Modal
  closeDeleteModal() {
    this.deleteModal = false;
  }

}
