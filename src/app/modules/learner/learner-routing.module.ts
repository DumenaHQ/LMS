import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from '../shared/user-profile/user-profile.component';
import { LearnerOverviewComponent } from './components/learner-overview/learner-overview.component';
import { DisplayLearnerProgramDetailsComponent } from './components/learner-programs/display-learner-program-details/display-learner-program-details.component';
import { DisplayLearnerProgramsComponent } from './components/learner-programs/display-learner-programs/display-learner-programs.component';
import { LearnerComponent } from './learner.component';
import { DisplayLearnerClassoomsComponent } from './components/learner-classrooms/display-learner-classooms/display-learner-classooms.component';
import { DisplayDetailsLearnerClassoomComponent } from './components/learner-classrooms/display-details-learner-classoom/display-details-learner-classoom.component';

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
      {
        path: 'programs',
        component: DisplayLearnerProgramsComponent,
        data: {
          title: 'Programs',
          description: 'Description Meta Tag Content'
        }
      },
      {
        path: 'programs/:programId',
        component: DisplayLearnerProgramDetailsComponent,
        data: {
          title: 'Program',
          description: 'Description Meta Tag Content'
        }
      },
      {
        path: 'classrooms',
        component: DisplayLearnerClassoomsComponent,
        data: {
          title: 'Clasrooms',
          description: 'Description Meta Tag Content'
        }
      },
      {
        path: 'classrooms/:classroomId',
        component: DisplayDetailsLearnerClassoomComponent,
        data: {
          title: 'Classroom',
          description: 'Description Meta Tag Content'
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
