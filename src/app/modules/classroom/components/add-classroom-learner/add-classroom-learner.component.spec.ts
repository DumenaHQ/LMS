import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassroomLearnerComponent } from './add-classroom-learner.component';

describe('AddClassroomLearnerComponent', () => {
  let component: AddClassroomLearnerComponent;
  let fixture: ComponentFixture<AddClassroomLearnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClassroomLearnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClassroomLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
