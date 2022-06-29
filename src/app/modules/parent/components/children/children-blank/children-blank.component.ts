import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-children-blank',
  templateUrl: './children-blank.component.html',
  styleUrls: ['./children-blank.component.scss']
})
export class ChildrenBlankComponent implements OnInit {

  @Output() addModal: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // Close Add Modal
  openAddModal() {
    this.addModal.emit();
  }

}
