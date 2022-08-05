import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDisplayStudentsComponent } from './school-display-students.component';

describe('SchoolDisplayStudentsComponent', () => {
  let component: SchoolDisplayStudentsComponent;
  let fixture: ComponentFixture<SchoolDisplayStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolDisplayStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolDisplayStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
