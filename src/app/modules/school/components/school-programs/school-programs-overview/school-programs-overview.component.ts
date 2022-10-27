import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-school-programs-overview',
  templateUrl: './school-programs-overview.component.html',
  styleUrls: ['./school-programs-overview.component.scss'],
})
export class SchoolProgramsOverviewComponent implements OnInit {
  dataLoading: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
