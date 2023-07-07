import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayLearnerClassoomsComponent } from './display-learner-classooms.component';

describe('DisplayLearnerClassoomsComponent', () => {
  let component: DisplayLearnerClassoomsComponent;
  let fixture: ComponentFixture<DisplayLearnerClassoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayLearnerClassoomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayLearnerClassoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
