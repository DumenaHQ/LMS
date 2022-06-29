import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryCoursesInfoComponent } from './library-courses-info.component';

describe('LibraryCoursesInfoComponent', () => {
  let component: LibraryCoursesInfoComponent;
  let fixture: ComponentFixture<LibraryCoursesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryCoursesInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryCoursesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
