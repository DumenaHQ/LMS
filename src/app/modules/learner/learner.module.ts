import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnerRoutingModule } from './learner-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LearnerComponent } from './learner.component';
import { LearnerOverviewComponent } from './components/learner-overview/learner-overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LearnerOnboardComponent } from './components/learner-onboard/learner-onboard.component';

@NgModule({
  declarations: [
    LearnerComponent,
    LearnerOverviewComponent,
    LearnerOnboardComponent,
  ],
  imports: [
    CommonModule,
    LearnerRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LearnerModule {}
