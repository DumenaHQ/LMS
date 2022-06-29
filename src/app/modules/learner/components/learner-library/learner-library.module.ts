import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnerLibraryRoutingModule } from './learner-library-routing.module';
import { LearnerLibraryOverviewComponent } from './learner-library-overview/learner-library-overview.component';
import { LearnerLibraryComponent } from './learner-library.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LearnerLibraryComponent,
    LearnerLibraryOverviewComponent
  ],
  imports: [
    CommonModule,
    LearnerLibraryRoutingModule,
    RouterModule
  ]
})
export class LearnerLibraryModule { }
