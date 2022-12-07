import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentEnrollLearnersComponent } from './parent-enroll-learners.component';

describe('ParentEnrollLearnersComponent', () => {
  let component: ParentEnrollLearnersComponent;
  let fixture: ComponentFixture<ParentEnrollLearnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentEnrollLearnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentEnrollLearnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
