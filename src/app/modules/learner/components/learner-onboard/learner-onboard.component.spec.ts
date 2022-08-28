import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerOnboardComponent } from './learner-onboard.component';

describe('LearnerOnboardComponent', () => {
  let component: LearnerOnboardComponent;
  let fixture: ComponentFixture<LearnerOnboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnerOnboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnerOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
