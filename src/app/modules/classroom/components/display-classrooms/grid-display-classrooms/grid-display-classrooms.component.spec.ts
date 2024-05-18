import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDisplayClassroomsComponent } from './grid-display-classrooms.component';

describe('GridDisplayClassroomsComponent', () => {
  let component: GridDisplayClassroomsComponent;
  let fixture: ComponentFixture<GridDisplayClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridDisplayClassroomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridDisplayClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
