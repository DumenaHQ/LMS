import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomLearnersActivityComponent } from './classroom-learners-activity.component';

describe('ClassroomLearnersActivityComponent', () => {
  let component: ClassroomLearnersActivityComponent;
  let fixture: ComponentFixture<ClassroomLearnersActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomLearnersActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomLearnersActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
