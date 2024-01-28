import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankDisplayLearnerProgramComponent } from './blank-display-learner-program.component';

describe('BlankDisplayLearnerProgramComponent', () => {
  let component: BlankDisplayLearnerProgramComponent;
  let fixture: ComponentFixture<BlankDisplayLearnerProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlankDisplayLearnerProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankDisplayLearnerProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
