import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseQuizReportComponent } from './view-course-quiz-report.component';

describe('ViewCourseQuizReportComponent', () => {
  let component: ViewCourseQuizReportComponent;
  let fixture: ComponentFixture<ViewCourseQuizReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCourseQuizReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCourseQuizReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
