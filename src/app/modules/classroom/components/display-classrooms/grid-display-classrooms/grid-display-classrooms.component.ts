import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClassroomModel } from '../../../models/classroom.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-display-classrooms',
  templateUrl: './grid-display-classrooms.component.html',
  styleUrls: ['./grid-display-classrooms.component.scss']
})
export class GridDisplayClassroomsComponent implements OnInit {

  @Input() classrooms?: ClassroomModel[];
  @Input() user: any;
  @Output() reloadData: EventEmitter<any> = new EventEmitter();
  confirmModal: boolean = false;
  confirmUrl: string;
  confirmMessage: string;
  activeIndex: number | null = null;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Display program
  displayClassroom(classroomId?: string) {
    this.router.navigate([`/${this.user.role}/classrooms/${classroomId}/view-classroom`]);
  }

  // Open Confirm Delete Modal
  openConfirmModal(classroom: any) {
    this.confirmModal = true;
    this.confirmMessage = `Are you sure you want to delete ${classroom.name}?`;
    this.confirmUrl = `classes/${classroom.id}`;
  }

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
