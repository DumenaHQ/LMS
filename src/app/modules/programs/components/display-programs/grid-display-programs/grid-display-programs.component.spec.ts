import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDisplayProgramsComponent } from './grid-display-programs.component';

describe('GridDisplayProgramsComponent', () => {
  let component: GridDisplayProgramsComponent;
  let fixture: ComponentFixture<GridDisplayProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridDisplayProgramsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridDisplayProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
