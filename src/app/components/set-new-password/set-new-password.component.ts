import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss']
})
export class SetNewPasswordComponent implements OnInit {

  @Output() pageId = new EventEmitter<string>();

  hide: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  // Close Add Modal
  showSect(value: string) {
    this.pageId.emit(value);
  }

}
