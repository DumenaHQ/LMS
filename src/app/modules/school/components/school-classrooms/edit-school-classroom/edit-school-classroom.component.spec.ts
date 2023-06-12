import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchoolClassroomComponent } from './edit-school-classroom.component';

describe('EditSchoolClassroomComponent', () => {
  let component: EditSchoolClassroomComponent;
  let fixture: ComponentFixture<EditSchoolClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSchoolClassroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSchoolClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
