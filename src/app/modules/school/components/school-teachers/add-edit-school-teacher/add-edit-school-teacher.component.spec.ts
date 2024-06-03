import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSchoolTeacherComponent } from './add-edit-school-teacher.component';

describe('AddEditSchoolTeacherComponent', () => {
  let component: AddEditSchoolTeacherComponent;
  let fixture: ComponentFixture<AddEditSchoolTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSchoolTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditSchoolTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
