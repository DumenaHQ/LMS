import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProgramsComponent } from './display-programs.component';

describe('DisplayProgramsComponent', () => {
  let component: DisplayProgramsComponent;
  let fixture: ComponentFixture<DisplayProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayProgramsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
