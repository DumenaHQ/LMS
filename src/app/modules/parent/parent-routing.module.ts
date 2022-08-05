import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from '../shared/user-profile/user-profile.component';
import { ChildrenComponent } from './components/children/children.component';
import { ParentOverviewComponent } from './components/parent-overview/parent-overview.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ParentComponent } from './parent.component';

const routes: Routes = [
  {
    path: '',
    component: ParentComponent,
    children: [
      {
        path: '',
        component: ParentOverviewComponent,
        data: {
          title: 'Parent',
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
        path: 'children',
        component: ChildrenComponent,
        data: {
          title: 'Children',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'payment',
        component: PaymentComponent,
        data: {
          title: 'Payment',
          description: 'Description Meta Tag Content',
        },
      },
      { path: '', redirectTo: '/parent', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentRoutingModule {}
