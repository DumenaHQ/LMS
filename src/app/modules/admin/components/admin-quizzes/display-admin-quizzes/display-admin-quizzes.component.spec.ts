import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAdminQuizzesComponent } from './display-admin-quizzes.component';

describe('DisplayAdminQuizzesComponent', () => {
  let component: DisplayAdminQuizzesComponent;
  let fixture: ComponentFixture<DisplayAdminQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAdminQuizzesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAdminQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
