import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassroomCourseComponent } from './add-classroom-course.component';

describe('AddClassroomCourseComponent', () => {
  let component: AddClassroomCourseComponent;
  let fixture: ComponentFixture<AddClassroomCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClassroomCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClassroomCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
