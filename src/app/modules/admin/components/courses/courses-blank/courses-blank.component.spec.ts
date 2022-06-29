import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesBlankComponent } from './courses-blank.component';

describe('CoursesBlankComponent', () => {
  let component: CoursesBlankComponent;
  let fixture: ComponentFixture<CoursesBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesBlankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
