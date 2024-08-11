import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentCartComponent } from './components/payment-cart/payment-cart.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
  
    PaymentCartComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule
  ]
})
export class PaymentModule { }
