import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDisplaySchoolTeachersComponent } from './list-display-school-teachers.component';

describe('ListDisplaySchoolTeachersComponent', () => {
  let component: ListDisplaySchoolTeachersComponent;
  let fixture: ComponentFixture<ListDisplaySchoolTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDisplaySchoolTeachersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDisplaySchoolTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
