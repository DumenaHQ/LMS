import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProgramDetailsComponent } from './display-program-details.component';

describe('DisplayProgramDetailsComponent', () => {
  let component: DisplayProgramDetailsComponent;
  let fixture: ComponentFixture<DisplayProgramDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayProgramDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayProgramDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
