import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankDisplayAdminQuizComponent } from './blank-display-admin-quiz.component';

describe('BlankDisplayAdminQuizComponent', () => {
  let component: BlankDisplayAdminQuizComponent;
  let fixture: ComponentFixture<BlankDisplayAdminQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlankDisplayAdminQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankDisplayAdminQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
