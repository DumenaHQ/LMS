import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learner-library-overview',
  templateUrl: './learner-library-overview.component.html',
  styleUrls: ['./learner-library-overview.component.scss'],
})
export class LearnerLibraryOverviewComponent implements OnInit {
  quadrant: string = 'Developer';

  constructor() {}

  ngOnInit(): void {}

  // Tab change
  tabChange(ids: any) {
    this.quadrant = ids;
  }
}
