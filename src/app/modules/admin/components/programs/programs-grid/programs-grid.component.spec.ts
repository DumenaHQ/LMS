import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsGridComponent } from './programs-grid.component';

describe('ProgramsGridComponent', () => {
  let component: ProgramsGridComponent;
  let fixture: ComponentFixture<ProgramsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramsGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
