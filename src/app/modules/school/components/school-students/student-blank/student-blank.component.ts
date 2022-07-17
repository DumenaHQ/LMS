import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-student-blank',
  templateUrl: './student-blank.component.html',
  styleUrls: ['./student-blank.component.scss']
})
export class StudentBlankComponent implements OnInit {

  @Output() addModal: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // Close Add Modal
  openAddModal() {
    this.addModal.emit();
  }


}
