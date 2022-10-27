import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolProgramsDetailsComponent } from './school-programs-details.component';

describe('SchoolProgramsDetailsComponent', () => {
  let component: SchoolProgramsDetailsComponent;
  let fixture: ComponentFixture<SchoolProgramsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolProgramsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolProgramsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
