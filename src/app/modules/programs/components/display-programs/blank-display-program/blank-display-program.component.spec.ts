import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankDisplayProgramComponent } from './blank-display-program.component';

describe('BlankDisplayProgramComponent', () => {
  let component: BlankDisplayProgramComponent;
  let fixture: ComponentFixture<BlankDisplayProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlankDisplayProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankDisplayProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
