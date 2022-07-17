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
      {
        path: 'students',
        component: SchoolStudentsComponent,
        data: {
          title: 'Students',
          description: 'Description Meta Tag Content'
        }
      },
      {
        path: 'payment',
        component: SchoolPaymentComponent,
        data: {
          title: 'Payment',
          description: 'Description Meta Tag Content'
        }
      },
      { path: '', redirectTo: '/school', pathMatch: 'full' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
