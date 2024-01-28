import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParentClassroomComponent } from './add-parent-classroom.component';

describe('AddParentClassroomComponent', () => {
  let component: AddParentClassroomComponent;
  let fixture: ComponentFixture<AddParentClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParentClassroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddParentClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
