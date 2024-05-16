import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayQuestionCommentsComponent } from './display-question-comments.component';

describe('DisplayQuestionCommentsComponent', () => {
  let component: DisplayQuestionCommentsComponent;
  let fixture: ComponentFixture<DisplayQuestionCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayQuestionCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayQuestionCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
