import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassroomBlankComponent } from './school-classroom-blank.component';

describe('SchoolClassroomBlankComponent', () => {
  let component: SchoolClassroomBlankComponent;
  let fixture: ComponentFixture<SchoolClassroomBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolClassroomBlankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolClassroomBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
