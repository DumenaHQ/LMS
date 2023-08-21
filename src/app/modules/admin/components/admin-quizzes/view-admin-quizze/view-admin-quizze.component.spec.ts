import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdminQuizzeComponent } from './view-admin-quizze.component';

describe('ViewAdminQuizzeComponent', () => {
  let component: ViewAdminQuizzeComponent;
  let fixture: ComponentFixture<ViewAdminQuizzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdminQuizzeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAdminQuizzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
