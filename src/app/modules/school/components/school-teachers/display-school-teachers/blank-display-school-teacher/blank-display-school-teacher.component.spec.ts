import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankDisplaySchoolTeacherComponent } from './blank-display-school-teacher.component';

describe('BlankDisplaySchoolTeacherComponent', () => {
  let component: BlankDisplaySchoolTeacherComponent;
  let fixture: ComponentFixture<BlankDisplaySchoolTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlankDisplaySchoolTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankDisplaySchoolTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
