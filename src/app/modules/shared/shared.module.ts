import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DefaultHeaderComponent } from './default-header/default-header.component';
import { DefaultFooterComponent } from './default-footer/default-footer.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardSidenavComponent } from './dashboard-sidenav/dashboard-sidenav.component';
import { DashboardPopupAlertComponent } from './dashboard-popup-alert/dashboard-popup-alert.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifiPopupComponent } from './notifi-popup/notifi-popup.component';
import { PricingPlanComponent } from '../parent/components/pricing-plan/pricing-plan.component';
import { AlertPopupComponent } from './alert-popup/alert-popup.component';
import { LoaderComponent } from './loader/loader.component';
import { DisplayPaymentHistoryComponent } from './display-payment-history/display-payment-history.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

@NgModule({
  declarations: [
    DefaultHeaderComponent,
    DefaultFooterComponent,
    DashboardHeaderComponent,
    DashboardSidenavComponent,
    DashboardPopupAlertComponent,
    UserProfileComponent,
    NotifiPopupComponent,
    AlertPopupComponent,
    LoaderComponent,
    DisplayPaymentHistoryComponent,
    ConfirmDeleteComponent,
    // PricingPlanComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    DefaultHeaderComponent,
    DefaultFooterComponent,
    DashboardHeaderComponent,
    DashboardSidenavComponent,
    DashboardPopupAlertComponent,
    AlertPopupComponent,
    LoaderComponent,
    ConfirmDeleteComponent
  ],
})
export class SharedModule {}
