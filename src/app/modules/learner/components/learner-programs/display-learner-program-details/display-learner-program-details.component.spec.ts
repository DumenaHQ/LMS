import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayLearnerProgramDetailsComponent } from './display-learner-program-details.component';

describe('DisplayLearnerProgramDetailsComponent', () => {
  let component: DisplayLearnerProgramDetailsComponent;
  let fixture: ComponentFixture<DisplayLearnerProgramDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayLearnerProgramDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayLearnerProgramDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
