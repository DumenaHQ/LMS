import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QueryActiveTabService {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  // Set active tab in query params
  setActiveTabInQueryParams(activeTab: any) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { activeTab: activeTab },
      queryParamsHandling: 'merge'
    });
  }
}
