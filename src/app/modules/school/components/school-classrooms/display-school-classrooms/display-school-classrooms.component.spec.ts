import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySchoolClassroomsComponent } from './display-school-classrooms.component';

describe('DisplaySchoolClassroomsComponent', () => {
  let component: DisplaySchoolClassroomsComponent;
  let fixture: ComponentFixture<DisplaySchoolClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySchoolClassroomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySchoolClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
