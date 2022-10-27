import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-grid',
  templateUrl: './courses-grid.component.html',
  styleUrls: ['./courses-grid.component.scss'],
})
export class CoursesGridComponent implements OnInit {
  @Input() allCourses: any;

  constructor() {}

  ngOnInit(): void {
    console.log(this.allCourses);
  }
}
