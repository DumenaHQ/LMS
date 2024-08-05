import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blank-display-classroom',
  templateUrl: './blank-display-classroom.component.html',
  styleUrls: ['./blank-display-classroom.component.scss']
})
export class BlankDisplayClassroomComponent implements OnInit {

  @Input() user: any;
  constructor() { }

  ngOnInit(): void {
  }

}
