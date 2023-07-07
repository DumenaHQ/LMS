import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankDisplayLearnerClassroomComponent } from './blank-display-learner-classroom.component';

describe('BlankDisplayLearnerClassroomComponent', () => {
  let component: BlankDisplayLearnerClassroomComponent;
  let fixture: ComponentFixture<BlankDisplayLearnerClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlankDisplayLearnerClassroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankDisplayLearnerClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
