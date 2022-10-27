import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-programs-details',
  templateUrl: './programs-details.component.html',
  styleUrls: ['./programs-details.component.scss'],
})
export class ProgramsDetailsComponent implements OnInit {
  contentId: any = 'content';

  constructor() {}

  ngOnInit(): void {}

  // Tab change
  tabChange(ids: any) {
    this.contentId = ids;
  }
}
