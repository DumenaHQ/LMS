import { TestBed } from '@angular/core/testing';

import { LearningSupportService } from './learning-support.service';

describe('LearningSupportService', () => {
  let service: LearningSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningSupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
