import { TestBed } from '@angular/core/testing';

import { QueryActiveTabService } from './query-active-tab.service';

describe('QueryActiveTabService', () => {
  let service: QueryActiveTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryActiveTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
