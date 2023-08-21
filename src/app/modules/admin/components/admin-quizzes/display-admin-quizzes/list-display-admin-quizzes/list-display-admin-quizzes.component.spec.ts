import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDisplayAdminQuizzesComponent } from './list-display-admin-quizzes.component';

describe('ListDisplayAdminQuizzesComponent', () => {
  let component: ListDisplayAdminQuizzesComponent;
  let fixture: ComponentFixture<ListDisplayAdminQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDisplayAdminQuizzesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDisplayAdminQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
