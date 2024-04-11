import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInstructorClassroomComponent } from './view-instructor-classroom.component';

describe('ViewInstructorClassroomComponent', () => {
  let component: ViewInstructorClassroomComponent;
  let fixture: ComponentFixture<ViewInstructorClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInstructorClassroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInstructorClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
