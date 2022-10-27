import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsBlankComponent } from './programs-blank.component';

describe('ProgramsBlankComponent', () => {
  let component: ProgramsBlankComponent;
  let fixture: ComponentFixture<ProgramsBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramsBlankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramsBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
