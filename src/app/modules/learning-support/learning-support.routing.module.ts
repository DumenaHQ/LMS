import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayQuestionsAdminComponent } from './display-questions-admin/display-questions-admin.component';

const routes: Routes = [
  {
    path: '',
    component: DisplayQuestionsAdminComponent,
    data: {
      title: 'Learning Support',
      description: 'Description Meta Tag Content',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningSupportRouterModule {}