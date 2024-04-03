import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseQuizResultsComponent } from './view-course-quiz-results.component';

describe('ViewCourseQuizResultsComponent', () => {
  let component: ViewCourseQuizResultsComponent;
  let fixture: ComponentFixture<ViewCourseQuizResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCourseQuizResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCourseQuizResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
