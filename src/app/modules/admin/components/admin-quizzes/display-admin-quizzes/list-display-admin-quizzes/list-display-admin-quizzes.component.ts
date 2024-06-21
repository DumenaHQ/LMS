import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-display-admin-quizzes',
  templateUrl: './list-display-admin-quizzes.component.html',
  styleUrls: ['./list-display-admin-quizzes.component.scss']
})
export class ListDisplayAdminQuizzesComponent implements OnInit {

  @Input() allquizzes: any;
  activeIndex: number | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  toggleAction(index: number) {
    if (this.activeIndex === index) {
      this.activeIndex = null;
    } else {
      this.activeIndex = index;
    }
  }

}
