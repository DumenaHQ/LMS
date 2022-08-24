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
import { EnrollLearnerComponent } from './enroll-learner/enroll-learner.component';
import { PricingPlanComponent } from '../parent/components/pricing-plan/pricing-plan.component';
import { AlertPopupComponent } from './alert-popup/alert-popup.component';

@NgModule({
  declarations: [
    DefaultHeaderComponent,
    DefaultFooterComponent,
    DashboardHeaderComponent,
    DashboardSidenavComponent,
    DashboardPopupAlertComponent,
    UserProfileComponent,
    NotifiPopupComponent,
    EnrollLearnerComponent,
    AlertPopupComponent,
    // PricingPlanComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    DefaultHeaderComponent,
    DefaultFooterComponent,
    DashboardHeaderComponent,
    DashboardSidenavComponent,
    DashboardPopupAlertComponent,
    EnrollLearnerComponent,
    AlertPopupComponent,
  ],
})
export class SharedModule {}
