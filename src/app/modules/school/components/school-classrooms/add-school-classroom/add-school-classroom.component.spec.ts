import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchoolClassroomComponent } from './add-school-classroom.component';

describe('AddSchoolClassroomComponent', () => {
  let component: AddSchoolClassroomComponent;
  let fixture: ComponentFixture<AddSchoolClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSchoolClassroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSchoolClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
