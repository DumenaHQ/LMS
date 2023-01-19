import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnerRoutingModule } from './learner-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LibraryCoursesLessonComponent } from './components/library-courses-lesson/library-courses-lesson.component';
import { LearnerComponent } from './learner.component';
import { LearnerOverviewComponent } from './components/learner-overview/learner-overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LearnerOnboardComponent } from './components/learner-onboard/learner-onboard.component';
import { DisplayLearnerProgramsComponent } from './components/learner-programs/display-learner-programs/display-learner-programs.component';
import { DisplayLearnerProgramDetailsComponent } from './components/learner-programs/display-learner-program-details/display-learner-program-details.component';

@NgModule({
  declarations: [
    LearnerComponent,
    LearnerOverviewComponent,
    LearnerOnboardComponent,
    DisplayLearnerProgramsComponent,
    DisplayLearnerProgramDetailsComponent,
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
