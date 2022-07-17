import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-parent-overview',
  templateUrl: './parent-overview.component.html',
  styleUrls: ['./parent-overview.component.scss']
})
export class ParentOverviewComponent implements OnInit {

  billingId: string = 'monthly'

  constructor() { }

  ngOnInit(): void {
  }

  // Tab change
  tabChange(ids: any) {
    this.billingId = ids
  }



}
