import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsOverviewComponent } from './programs-overview.component';

describe('ProgramsOverviewComponent', () => {
  let component: ProgramsOverviewComponent;
  let fixture: ComponentFixture<ProgramsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramsOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
