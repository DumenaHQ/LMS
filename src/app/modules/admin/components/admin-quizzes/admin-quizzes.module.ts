import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminQuizzesRoutingModule } from './admin-quizzes-routing.module';
import { AdminQuizzesComponent } from './admin-quizzes.component';
import { DisplayAdminQuizzesComponent } from './display-admin-quizzes/display-admin-quizzes.component';
import { ViewAdminQuizzeComponent } from './view-admin-quizze/view-admin-quizze.component';
import { ListDisplayAdminQuizzesComponent } from './display-admin-quizzes/list-display-admin-quizzes/list-display-admin-quizzes.component';
import { BlankDisplayAdminQuizComponent } from './display-admin-quizzes/blank-display-admin-quiz/blank-display-admin-quiz.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminQuizzesComponent,
    DisplayAdminQuizzesComponent,
    ViewAdminQuizzeComponent,
    ListDisplayAdminQuizzesComponent,
    BlankDisplayAdminQuizComponent
  ],
  imports: [
    CommonModule,
    AdminQuizzesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminQuizzesModule { }
