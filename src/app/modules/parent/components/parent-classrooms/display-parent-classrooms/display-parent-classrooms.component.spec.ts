import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayParentClassroomsComponent } from './display-parent-classrooms.component';

describe('DisplayParentClassroomsComponent', () => {
  let component: DisplayParentClassroomsComponent;
  let fixture: ComponentFixture<DisplayParentClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayParentClassroomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayParentClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
