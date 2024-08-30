import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentCartComponent } from './components/payment-cart/payment-cart.component';

const routes: Routes = [
  {
    path: 'cart',
    component: PaymentCartComponent,
    data: {
      title: 'Cart',
      description: 'Description Meta Tag Content',
    },
  },
  { path: '', redirectTo: 'cart', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
