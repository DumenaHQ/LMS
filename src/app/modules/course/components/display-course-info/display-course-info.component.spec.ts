import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCourseInfoComponent } from './display-course-info.component';

describe('DisplayCourseInfoComponent', () => {
  let component: DisplayCourseInfoComponent;
  let fixture: ComponentFixture<DisplayCourseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCourseInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCourseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
