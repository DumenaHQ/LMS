import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchoolClassroomCoursesComponent } from './add-school-classroom-courses.component';

describe('AddSchoolClassroomCoursesComponent', () => {
  let component: AddSchoolClassroomCoursesComponent;
  let fixture: ComponentFixture<AddSchoolClassroomCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSchoolClassroomCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSchoolClassroomCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
