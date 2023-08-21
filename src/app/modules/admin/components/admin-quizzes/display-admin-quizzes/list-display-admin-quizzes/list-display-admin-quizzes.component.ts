import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-display-admin-quizzes',
  templateUrl: './list-display-admin-quizzes.component.html',
  styleUrls: ['./list-display-admin-quizzes.component.scss']
})
export class ListDisplayAdminQuizzesComponent implements OnInit {

  @Input() allquizzes: any;

  constructor() { }

  ngOnInit(): void {
  }

}
