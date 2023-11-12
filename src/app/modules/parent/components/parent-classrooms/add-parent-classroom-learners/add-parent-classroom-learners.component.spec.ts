import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParentClassroomLearnersComponent } from './add-parent-classroom-learners.component';

describe('AddParentClassroomLearnersComponent', () => {
  let component: AddParentClassroomLearnersComponent;
  let fixture: ComponentFixture<AddParentClassroomLearnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParentClassroomLearnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddParentClassroomLearnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
