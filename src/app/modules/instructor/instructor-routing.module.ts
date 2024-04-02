import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from '../shared/user-profile/user-profile.component';
import { InstructorComponent } from './instructor.component';
import { InstructorOverviewComponent } from './components/instructor-overview/instructor-overview.component';
import { DisplayInstructorClassroomsComponent } from './components/instructor-classrooms/display-instructor-classrooms/display-instructor-classrooms.component';
import { ViewInstructorClassroomComponent } from './components/instructor-classrooms/view-instructor-classroom/view-instructor-classroom.component';


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
        component: DisplayInstructorClassroomsComponent,
        data: {
          title: 'Clasrooms',
          description: 'Description Meta Tag Content'
        }
      },
      {
        path: 'classrooms/:classroomId/view-classroom',
        component: ViewInstructorClassroomComponent,
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
export class InstructorRoutingModule { }
