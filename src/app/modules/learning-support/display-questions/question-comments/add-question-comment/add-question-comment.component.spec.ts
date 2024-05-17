import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionCommentComponent } from './add-question-comment.component';

describe('AddQuestionCommentComponent', () => {
  let component: AddQuestionCommentComponent;
  let fixture: ComponentFixture<AddQuestionCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuestionCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuestionCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
