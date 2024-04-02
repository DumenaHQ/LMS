import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInstructorClassroomsComponent } from './display-instructor-classrooms.component';

describe('DisplayInstructorClassroomsComponent', () => {
  let component: DisplayInstructorClassroomsComponent;
  let fixture: ComponentFixture<DisplayInstructorClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayInstructorClassroomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayInstructorClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
