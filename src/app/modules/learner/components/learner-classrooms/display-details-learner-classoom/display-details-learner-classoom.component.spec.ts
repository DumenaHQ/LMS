import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDetailsLearnerClassoomComponent } from './display-details-learner-classoom.component';

describe('DisplayDetailsLearnerClassoomComponent', () => {
  let component: DisplayDetailsLearnerClassoomComponent;
  let fixture: ComponentFixture<DisplayDetailsLearnerClassoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayDetailsLearnerClassoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayDetailsLearnerClassoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
