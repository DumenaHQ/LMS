import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDisplaySchoolClassroomsComponent } from './grid-display-school-classrooms.component';

describe('GridDisplaySchoolClassroomsComponent', () => {
  let component: GridDisplaySchoolClassroomsComponent;
  let fixture: ComponentFixture<GridDisplaySchoolClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridDisplaySchoolClassroomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridDisplaySchoolClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
