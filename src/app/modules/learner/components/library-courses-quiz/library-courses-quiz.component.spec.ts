import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryCoursesQuizComponent } from './library-courses-quiz.component';

describe('LibraryCoursesQuizComponent', () => {
  let component: LibraryCoursesQuizComponent;
  let fixture: ComponentFixture<LibraryCoursesQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryCoursesQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryCoursesQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
