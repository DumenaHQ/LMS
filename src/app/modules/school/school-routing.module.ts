import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayProgramDetailsComponent } from '../shared/programs/display-program-details/display-program-details.component';
import { UserProfileComponent } from '../shared/user-profile/user-profile.component';
import { SchoolOverviewComponent } from './components/school-overview/school-overview.component';
import { SchoolPaymentComponent } from './components/school-payment/school-payment.component';
import { SchoolProgramsComponent } from './components/school-programs/school-programs.component';
import { SchoolStudentsComponent } from './components/school-students/school-students.component';
import { SchoolComponent } from './school.component';
import { DisplaySchoolClassroomsComponent } from './components/school-classrooms/display-school-classrooms/display-school-classrooms.component';
import { AddSchoolClassroomComponent } from './components/school-classrooms/add-school-classroom/add-school-classroom.component';
import { DetailsDisplaySchoolClassroomComponent } from './components/school-classrooms/display-school-classrooms/details-display-school-classroom/details-display-school-classroom.component';
import { EditSchoolClassroomComponent } from './components/school-classrooms/edit-school-classroom/edit-school-classroom.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolComponent,
    children: [
      {
        path: '',
        component: SchoolOverviewComponent,
        data: {
          title: 'School',
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
        path: 'students',
        component: SchoolStudentsComponent,
        data: {
          title: 'Students',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'payment',
        component: SchoolPaymentComponent,
        data: {
          title: 'Payment',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'programs',
        component: SchoolProgramsComponent,
        data: {
          title: 'Programs',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'programs/:programId',
        component: DisplayProgramDetailsComponent,
        data: {
          title: 'Programs',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'classrooms',
        loadChildren: () => import('../school/components/school-classrooms/school-classroom.module').then((m) => m.SchoolClassroomModule),
        data: {
          title: 'Classrooms',
          description: 'Description Meta Tag Content',
        }
      },
      {
        path: 'teachers',
        loadChildren: () => import('../school/components/school-teachers/school-teacher.module').then((m) => m.SchoolTeacherModule),
        data: {
          title: 'Teachers',
          description: 'Description Meta Tag Content',
        },
      },
      { path: '', redirectTo: '/school', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolRoutingModule {}
