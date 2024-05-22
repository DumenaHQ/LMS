import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-blank-display-school-teacher',
  templateUrl: './blank-display-school-teacher.component.html',
  styleUrls: ['./blank-display-school-teacher.component.scss']
})
export class BlankDisplaySchoolTeacherComponent implements OnInit {
  @Output() addEditTeacher: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  addTeacher() {
    this.addEditTeacher.emit();
  }

}
