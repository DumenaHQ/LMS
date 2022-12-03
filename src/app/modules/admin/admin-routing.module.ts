import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from '../shared/user-profile/user-profile.component';
import { AdminComponent } from './admin.component';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { AddLessonComponent } from './components/courses/add-lesson/add-lesson.component';
import { CreateCourseComponent } from './components/courses/create-course/create-course.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

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
        path: 'programs',
        loadChildren: () =>
          import('./components/programs/programs.module').then(
            (m) => m.ProgramsModule
          ),
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
