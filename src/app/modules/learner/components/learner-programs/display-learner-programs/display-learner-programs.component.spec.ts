import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayLearnerProgramsComponent } from './display-learner-programs.component';

describe('DisplayLearnerProgramsComponent', () => {
  let component: DisplayLearnerProgramsComponent;
  let fixture: ComponentFixture<DisplayLearnerProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayLearnerProgramsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayLearnerProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
