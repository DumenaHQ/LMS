import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCourseLessonComponent } from './display-course-lesson.component';

describe('DisplayCourseLessonComponent', () => {
  let component: DisplayCourseLessonComponent;
  let fixture: ComponentFixture<DisplayCourseLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCourseLessonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCourseLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
