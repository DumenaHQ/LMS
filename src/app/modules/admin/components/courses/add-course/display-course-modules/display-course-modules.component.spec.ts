import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCourseModulesComponent } from './display-course-modules.component';

describe('DisplayCourseModulesComponent', () => {
  let component: DisplayCourseModulesComponent;
  let fixture: ComponentFixture<DisplayCourseModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCourseModulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCourseModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
