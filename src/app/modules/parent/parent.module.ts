import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentRoutingModule } from './parent-routing.module';
import { ParentComponent } from './parent.component';
import { ChildrenComponent } from './components/children/children.component';
import { ParentOverviewComponent } from './components/parent-overview/parent-overview.component';
import { ChildrenBlankComponent } from './components/children/children-blank/children-blank.component';
import { SharedModule } from '../shared/shared.module';
import { PaymentComponent } from './components/payment/payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PricingPlanComponent } from './components/pricing-plan/pricing-plan.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ManageChildComponent } from './components/children/manage-child/manage-child.component';
import { EditChildComponent } from './components/children/edit-child/edit-child.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
import { ParentOnboardComponent } from './components/parent-onboard/parent-onboard.component';
import { ParentEnrollLearnersComponent } from './components/parent-enroll-learners/parent-enroll-learners.component';
import { ParentProgramsComponent } from './components/parent-programs/parent-programs.component';
import { DisplayParentClassroomsComponent } from './components/parent-classrooms/display-parent-classrooms/display-parent-classrooms.component';
import { GridDisplayParentClassroomsComponent } from './components/parent-classrooms/display-parent-classrooms/grid-display-parent-classrooms/grid-display-parent-classrooms.component';
import { DetailsDisplayParentClassroomComponent } from './components/parent-classrooms/display-parent-classrooms/details-display-parent-classroom/details-display-parent-classroom.component';
import { BlankDisplayParentClassroomComponent } from './components/parent-classrooms/display-parent-classrooms/blank-display-parent-classroom/blank-display-parent-classroom.component';
import { AddParentClassroomLearnersComponent } from './components/parent-classrooms/add-parent-classroom-learners/add-parent-classroom-learners.component';

@NgModule({
  declarations: [
    ParentComponent,
    ParentOverviewComponent,
    ChildrenComponent,
    ChildrenBlankComponent,
    PaymentComponent,
    PricingPlanComponent,
    ShoppingCartComponent,
    ManageChildComponent,
    EditChildComponent,
    PaymentHistoryComponent,
    ParentOnboardComponent,
    ParentEnrollLearnersComponent,
    ParentProgramsComponent,
    DisplayParentClassroomsComponent,
    GridDisplayParentClassroomsComponent,
    DetailsDisplayParentClassroomComponent,
    BlankDisplayParentClassroomComponent,
    AddParentClassroomLearnersComponent,
  ],
  imports: [
    CommonModule,
    ParentRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ParentModule {}
