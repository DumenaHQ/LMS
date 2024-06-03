import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-display-admin-users',
  templateUrl: './list-display-admin-users.component.html',
  styleUrls: ['./list-display-admin-users.component.scss']
})
export class ListDisplayAdminUsersComponent implements OnInit {

  @Input() users: any;
  @Input() loggedInUserData: any;
  @Output() reloadData: EventEmitter<any> = new EventEmitter();
  confirmModal: boolean = false;
  confirmUrl: string;
  confirmMessage: string;
  activeIndex: number | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  // Open Confirm Delete Modal
  openConfirmModal(user: any) {
    this.confirmModal = true;
    this.confirmMessage = `Are you sure you want to ${user.status === 'active' ? 'deactivate' : 'activate'} ${user.fullname}?`;
    if(user.status === 'active') {
      this.confirmUrl = `users/${user.id}/deactivate`; 
    } else {
      this.confirmUrl = `users/${user.id}/activate`;
    }
  }

  // load get user
  getReloadData() {
    this.reloadData.emit();
  }

  // Close Confirm Delete Modal
  closeConfirmModal() {
    this.confirmModal = false;
  }

  toggleAction(index: number) {
    if (this.activeIndex === index) {
      this.activeIndex = null;
    } else {
      this.activeIndex = index;
    }
  }

}
