import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolProgramsComponent } from './school-programs.component';

describe('SchoolProgramsComponent', () => {
  let component: SchoolProgramsComponent;
  let fixture: ComponentFixture<SchoolProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolProgramsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
