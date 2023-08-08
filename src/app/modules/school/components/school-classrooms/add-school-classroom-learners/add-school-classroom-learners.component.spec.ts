import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchoolClassroomLearnersComponent } from './add-school-classroom-learners.component';

describe('AddSchoolClassroomLearnersComponent', () => {
  let component: AddSchoolClassroomLearnersComponent;
  let fixture: ComponentFixture<AddSchoolClassroomLearnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSchoolClassroomLearnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSchoolClassroomLearnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
