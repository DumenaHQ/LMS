import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayClassroomsComponent } from './display-classrooms.component';

describe('DisplayClassroomsComponent', () => {
  let component: DisplayClassroomsComponent;
  let fixture: ComponentFixture<DisplayClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayClassroomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
