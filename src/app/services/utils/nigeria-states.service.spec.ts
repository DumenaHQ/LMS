import { TestBed } from '@angular/core/testing';

import { NigeriaStatesService } from './nigeria-states.service';

describe('NigeriaStatesService', () => {
  let service: NigeriaStatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NigeriaStatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
