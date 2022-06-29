import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerOverviewComponent } from './learner-overview.component';

describe('LearnerOverviewComponent', () => {
  let component: LearnerOverviewComponent;
  let fixture: ComponentFixture<LearnerOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnerOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
