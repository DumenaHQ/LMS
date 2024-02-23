import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseModalToClassComponent } from './add-course-to-class-modal.component';

describe('AddCourseModalComponent', () => {
  let component: AddCourseModalToClassComponent;
  let fixture: ComponentFixture<AddCourseModalToClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourseModalToClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCourseModalToClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
