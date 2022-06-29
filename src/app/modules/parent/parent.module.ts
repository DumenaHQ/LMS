import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentRoutingModule } from './parent-routing.module';
import { ParentComponent } from './parent.component';
import { ChildrenComponent } from './components/children/children.component';
import { ParentOverviewComponent } from './components/parent-overview/parent-overview.component';
import { AddChildComponent } from './components/children/add-child/add-child.component';
import { ChildrenBlankComponent } from './components/children/children-blank/children-blank.component';
import { SharedModule } from '../shared/shared.module';
import { PaymentComponent } from './components/payment/payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ParentComponent,
    ParentOverviewComponent,
    ChildrenComponent,
    AddChildComponent,
    ChildrenBlankComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    ParentRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ParentModule { }
