import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCourseQuizComponent } from './display-course-quiz.component';

describe('DisplayCourseQuizComponent', () => {
  let component: DisplayCourseQuizComponent;
  let fixture: ComponentFixture<DisplayCourseQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCourseQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCourseQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
