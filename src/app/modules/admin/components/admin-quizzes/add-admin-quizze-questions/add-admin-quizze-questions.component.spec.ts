import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminQuizzeQuestionsComponent } from './add-admin-quizze-questions.component';

describe('AddAdminQuizzeQuestionsComponent', () => {
  let component: AddAdminQuizzeQuestionsComponent;
  let fixture: ComponentFixture<AddAdminQuizzeQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminQuizzeQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdminQuizzeQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
