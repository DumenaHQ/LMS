import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDisplayParentClassroomsComponent } from './grid-display-parent-classrooms.component';

describe('GridDisplayParentClassroomsComponent', () => {
  let component: GridDisplayParentClassroomsComponent;
  let fixture: ComponentFixture<GridDisplayParentClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridDisplayParentClassroomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridDisplayParentClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
