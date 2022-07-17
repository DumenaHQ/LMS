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
      // { path: 'library', component: LearnerLibraryComponent },
      { path: 'library', loadChildren: () => import('./components/learner-library/learner-library.module').then(m => m.LearnerLibraryModule) },
      { path: '', redirectTo: '/learner', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnerRoutingModule { }
