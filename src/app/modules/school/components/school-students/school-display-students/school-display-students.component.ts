import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-school-display-students',
  templateUrl: './school-display-students.component.html',
  styleUrls: ['./school-display-students.component.scss'],
})
export class SchoolDisplayStudentsComponent implements OnInit {
  @Input() students: any;
  @Input() user: any;
  @Output() reloadData: EventEmitter<any> = new EventEmitter();
  confirmModal: boolean = false;
  confirmUrl: string;
  confirmMessage: string;
  activeIndex: number | null = null;
  
  constructor() {}

  ngOnInit(): void {
  }

  // Open Confirm Delete Modal
  openConfirmModal(student: any) {
    this.confirmModal = true;
    this.confirmMessage = `Are you sure you want to delete ${student.fullname}?`;
    this.confirmUrl = `schools/${this.user.id}/learners/${student.id}`;
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
