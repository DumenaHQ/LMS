import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDisplayLearnerClassroomsComponent } from './grid-display-learner-classrooms.component';

describe('GridDisplayLearnerClassroomsComponent', () => {
  let component: GridDisplayLearnerClassroomsComponent;
  let fixture: ComponentFixture<GridDisplayLearnerClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridDisplayLearnerClassroomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridDisplayLearnerClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
