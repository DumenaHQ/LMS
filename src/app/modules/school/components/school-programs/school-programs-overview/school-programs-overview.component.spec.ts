import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolProgramsOverviewComponent } from './school-programs-overview.component';

describe('SchoolProgramsOverviewComponent', () => {
  let component: SchoolProgramsOverviewComponent;
  let fixture: ComponentFixture<SchoolProgramsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolProgramsOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolProgramsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
