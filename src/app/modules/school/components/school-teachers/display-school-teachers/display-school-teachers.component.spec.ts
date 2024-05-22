import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySchoolTeachersComponent } from './display-school-teachers.component';

describe('DisplaySchoolTeachersComponent', () => {
  let component: DisplaySchoolTeachersComponent;
  let fixture: ComponentFixture<DisplaySchoolTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySchoolTeachersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySchoolTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
