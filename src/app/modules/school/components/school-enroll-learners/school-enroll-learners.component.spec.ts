import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolEnrollLearnersComponent } from './school-enroll-learners.component';

describe('SchoolEnrollLearnersComponent', () => {
  let component: SchoolEnrollLearnersComponent;
  let fixture: ComponentFixture<SchoolEnrollLearnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolEnrollLearnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolEnrollLearnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
