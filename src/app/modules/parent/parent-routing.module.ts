import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from '../shared/user-profile/user-profile.component';
import { ChildrenComponent } from './components/children/children.component';
import { EditChildComponent } from './components/children/edit-child/edit-child.component';
import { ManageChildComponent } from './components/children/manage-child/manage-child.component';
import { ParentOverviewComponent } from './components/parent-overview/parent-overview.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ParentComponent } from './parent.component';
import { DisplayParentClassroomsComponent } from './components/parent-classrooms/display-parent-classrooms/display-parent-classrooms.component';
import { DetailsDisplayParentClassroomComponent } from './components/parent-classrooms/display-parent-classrooms/details-display-parent-classroom/details-display-parent-classroom.component';
import { AddParentClassroomComponent } from './components/parent-classrooms/add-parent-classroom/add-parent-classroom.component';

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
        path: 'children/:childId',
        component: ManageChildComponent,
        data: {
          title: 'Child',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'children/:childId/edit-child',
        component: EditChildComponent,
        data: {
          title: ':childId',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'classrooms',
        component: DisplayParentClassroomsComponent,
        data: {
          title: 'Classrooms',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'classrooms/add-classroom',
        component: AddParentClassroomComponent,
        data: {
          title: 'Add Classroom',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'classrooms/:classroomId/view-classroom',
        component: DetailsDisplayParentClassroomComponent,
        data: {
          title: 'View Classroom',
          description: 'Description Meta Tag Content',
        },
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
        path: 'payment',
        component: PaymentComponent,
        data: {
          title: 'Payment',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'payment/cart',
        component: ShoppingCartComponent,
        data: {
          title: 'Cart',
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
