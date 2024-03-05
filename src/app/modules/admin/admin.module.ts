import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent, 
    AdminOverviewComponent, 
    TransactionsComponent, 
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, ReactiveFormsModule, FormsModule],
})
export class AdminModule {}
