import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankDisplayClassroomComponent } from './blank-display-classroom.component';

describe('BlankDisplayClassroomComponent', () => {
  let component: BlankDisplayClassroomComponent;
  let fixture: ComponentFixture<BlankDisplayClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlankDisplayClassroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankDisplayClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
