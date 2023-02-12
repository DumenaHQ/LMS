import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseModuleLessonComponent } from './add-course-module-lesson.component';

describe('AddCourseModuleLessonComponent', () => {
  let component: AddCourseModuleLessonComponent;
  let fixture: ComponentFixture<AddCourseModuleLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourseModuleLessonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCourseModuleLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
