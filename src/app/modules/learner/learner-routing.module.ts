import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from '../shared/user-profile/user-profile.component';
import { LearnerOverviewComponent } from './components/learner-overview/learner-overview.component';
import { LearnerComponent } from './learner.component';

const routes: Routes = [
  {
    path: '',
    component: LearnerComponent,
    children: [
      {
        path: '',
        component: LearnerOverviewComponent,
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
      {
        path: 'programs',
        loadChildren: () => import('../../modules/programs/programs.module').then((m) => m.ProgramsModule),
        data: {
          title: 'Programs',
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
export class LearnerRoutingModule { }
