import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminQuizzesComponent } from './admin-quizzes.component';
import { DisplayAdminQuizzesComponent } from './display-admin-quizzes/display-admin-quizzes.component';
import { ViewAdminQuizzeComponent } from './view-admin-quizze/view-admin-quizze.component';

const routes: Routes = [
  {
    path: '',
    component: AdminQuizzesComponent,
    children: [
      {
        path: '',
        component: DisplayAdminQuizzesComponent,
        data: {
          title: 'Quizzes',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: ':quizId/details',
        component: ViewAdminQuizzeComponent,
        data: {
          title: 'Quiz',
          description: 'Description Meta Tag Content',
        },
      },
      { path: '', redirectTo: 'courses', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminQuizzesRoutingModule { }
