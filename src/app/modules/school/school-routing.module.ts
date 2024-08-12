import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from '../shared/user-profile/user-profile.component';
import { SchoolOverviewComponent } from './components/school-overview/school-overview.component';
import { SchoolPaymentComponent } from './components/school-payment/school-payment.component';
import { SchoolStudentsComponent } from './components/school-students/school-students.component';
import { SchoolComponent } from './school.component';

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
      {
        path: 'teachers',
        loadChildren: () => import('../school/components/school-teachers/school-teacher.module').then((m) => m.SchoolTeacherModule),
        data: {
          title: 'Teachers',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'payment',
        loadChildren: () => import('../../modules/payment/payment.module').then((m) => m.PaymentModule),
        data: {
          title: 'Payment',
          description: 'Description Meta Tag Content',
        },
      },
      // {
      //   path: 'payment',
      //   component: SchoolPaymentComponent,
      //   data: {
      //     title: 'Payment',
      //     description: 'Description Meta Tag Content',
      //   },
      // },
      { path: '', redirectTo: '/school', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolRoutingModule {}
