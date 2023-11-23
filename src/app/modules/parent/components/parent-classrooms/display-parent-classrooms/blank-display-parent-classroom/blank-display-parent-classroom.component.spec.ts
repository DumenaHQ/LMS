import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankDisplayParentClassroomComponent } from './blank-display-parent-classroom.component';

describe('BlankDisplayParentClassroomComponent', () => {
  let component: BlankDisplayParentClassroomComponent;
  let fixture: ComponentFixture<BlankDisplayParentClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlankDisplayParentClassroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankDisplayParentClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
