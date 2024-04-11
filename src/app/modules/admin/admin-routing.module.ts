import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from '../shared/user-profile/user-profile.component';
import { AdminComponent } from './admin.component';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { EditAdminClassTemplateComponent } from './components/admin-class-templates/components/edit-admin-class-template/edit-admin-class-template.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminOverviewComponent,
        data: {
          title: 'Admin',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'profile/:id',
        component: UserProfileComponent,
        data: {
          title: 'Profile',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        data: {
          title: 'Transactions',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('./components/courses/courses.module').then(
            (m) => m.CoursesModule
          ),
      },
      {
        path: 'quizzes',
        loadChildren: () =>
          import('./components/admin-quizzes/admin-quizzes.module').then(
            (m) => m.AdminQuizzesModule
          ),
      },
      {
        path: 'programs',
        loadChildren: () =>
          import('./components/programs/programs.module').then(
            (m) => m.ProgramsModule
          ),
      },
      {
        path: 'class-templates',
        loadChildren: () => import('./components/class-template/class-template.module').then((m) => m.ClassTemplateModule),
      },
      {
        path: 'class-templates/:classTemplateId/edit-class-template',
        component: EditAdminClassTemplateComponent,
        data: {
          title: 'Edit Class Template',
          description: 'Description Meta Tag Content',
        },
      },
      { path: '', redirectTo: '/admin', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
