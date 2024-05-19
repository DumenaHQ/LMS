import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnerRoutingModule } from './learner-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LearnerComponent } from './learner.component';
import { LearnerOverviewComponent } from './components/learner-overview/learner-overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LearnerOnboardComponent } from './components/learner-onboard/learner-onboard.component';
import { DisplayLearnerProgramsComponent } from './components/learner-programs/display-learner-programs/display-learner-programs.component';
import { DisplayLearnerProgramDetailsComponent } from './components/learner-programs/display-learner-program-details/display-learner-program-details.component';
import { BlankDisplayLearnerProgramComponent } from './components/learner-programs/display-learner-programs/blank-display-learner-program/blank-display-learner-program.component';

@NgModule({
  declarations: [
    LearnerComponent,
    LearnerOverviewComponent,
    LearnerOnboardComponent,
    DisplayLearnerProgramsComponent,
    DisplayLearnerProgramDetailsComponent,
    BlankDisplayLearnerProgramComponent,
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
