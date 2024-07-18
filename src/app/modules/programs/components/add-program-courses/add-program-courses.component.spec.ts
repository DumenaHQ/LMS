import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramCoursesComponent } from './add-program-courses.component';

describe('AddProgramCoursesComponent', () => {
  let component: AddProgramCoursesComponent;
  let fixture: ComponentFixture<AddProgramCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgramCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProgramCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
