import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-blank-display-admin-user',
  templateUrl: './blank-display-admin-user.component.html',
  styleUrls: ['./blank-display-admin-user.component.scss']
})
export class BlankDisplayAdminUserComponent implements OnInit {

  @Output() addEditUser: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  addUser() {
    this.addEditUser.emit();
  }

}
