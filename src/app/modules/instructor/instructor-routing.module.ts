import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from '../shared/user-profile/user-profile.component';
import { InstructorComponent } from './instructor.component';
import { InstructorOverviewComponent } from './components/instructor-overview/instructor-overview.component';

const routes: Routes = [
  {
    path: '',
    component: InstructorComponent,
    children: [
      {
        path: '',
        component: InstructorOverviewComponent,
        data: {
          title: 'Learner',
          description: 'Description Meta Tag Content'
        }
      },
      {
        path: 'profile/:id',
        component: UserProfileComponent,
        data: {
          title: 'Profile',
          description: 'Description Meta Tag Content'
        }
      },
      {
        path: 'classrooms',
        loadChildren: () => import('../../modules/classroom/classroom.module').then((m) => m.ClassroomModule),
        data: {
          title: 'Classrooms',
          description: 'Description Meta Tag Content',
        }
      },
      { path: '', redirectTo: '/learner', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
