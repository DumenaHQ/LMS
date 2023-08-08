import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDisplaySchoolClassroomComponent } from './details-display-school-classroom.component';

describe('DetailsDisplaySchoolClassroomComponent', () => {
  let component: DetailsDisplaySchoolClassroomComponent;
  let fixture: ComponentFixture<DetailsDisplaySchoolClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDisplaySchoolClassroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDisplaySchoolClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
