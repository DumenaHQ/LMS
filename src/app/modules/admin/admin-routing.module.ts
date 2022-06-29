import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from '../shared/user-profile/user-profile.component';
import { AdminComponent } from './admin.component';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { CreateCourseComponent } from './components/courses/create-course/create-course.component';

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
          description: 'Description Meta Tag Content'
        }
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        data: {
          title: 'Profile',
          description: 'Description Meta Tag Content'
        }
      },
      { path: 'courses', loadChildren: () => import('./components/courses/courses.module').then(m => m.CoursesModule) },
      {
        path: 'create-course',
        component: CreateCourseComponent,
        data: {
          title: 'Create Course',
          description: 'Description Meta Tag Content'
        }
      },
      { path: '', redirectTo: '/admin', pathMatch: 'full' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
