import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TeacherModel } from '../../models/teacher.model';

@Component({
  selector: 'app-list-display-school-teachers',
  templateUrl: './list-display-school-teachers.component.html',
  styleUrls: ['./list-display-school-teachers.component.scss']
})
export class ListDisplaySchoolTeachersComponent implements OnInit {

  @Input() teachers: TeacherModel[];
  @Output() reloadData: EventEmitter<any> = new EventEmitter();
  confirmModal: boolean = false;
  confirmUrl: string;
  confirmMessage: string;
  activeIndex: number | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  // Open Confirm Delete Modal
  openConfirmModal(teacher: any) {
    this.confirmModal = true;
    this.confirmMessage = `Are you sure you want to delete ${teacher.fullname}?`;
    this.confirmUrl = `users/teacher/${teacher.id}`;
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
