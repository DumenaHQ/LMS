import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayQuestionsComponent } from './display-questions/display-questions.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DisplayQuestionCommentsComponent } from './display-questions/question-comments/display-question-comments/display-question-comments.component';
import { AddQuestionCommentComponent } from './display-questions/question-comments/add-question-comment/add-question-comment.component';
import { LearningSupportRouterModule } from './learning-support.routing.module';
import { DisplayQuestionsAdminComponent } from './display-questions-admin/display-questions-admin.component';
import { BlankDisplayQuestionAdminComponent } from './display-questions-admin/blank-display-question-admin/blank-display-question-admin.component';



@NgModule({
  declarations: [
    DisplayQuestionsComponent,
    AddQuestionComponent,
    DisplayQuestionCommentsComponent,
    AddQuestionCommentComponent,
    DisplayQuestionsAdminComponent,
    BlankDisplayQuestionAdminComponent
  ],
  imports: [
    CommonModule,
    LearningSupportRouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    DisplayQuestionsComponent,
    AddQuestionComponent,
  ]
})
export class LearningSupportModule { }
