import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryCoursesLessonComponent } from './library-courses-lesson.component';

describe('LibraryCoursesLessonComponent', () => {
  let component: LibraryCoursesLessonComponent;
  let fixture: ComponentFixture<LibraryCoursesLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryCoursesLessonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryCoursesLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
