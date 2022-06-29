import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnerRoutingModule } from './learner-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CoursesCardComponent } from './components/courses-card/courses-card.component';
import { LibraryCoursesLessonComponent } from './components/library-courses-lesson/library-courses-lesson.component';
import { LearnerComponent } from './learner.component';
import { LearnerOverviewComponent } from './components/learner-overview/learner-overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LearnerComponent,
    LearnerOverviewComponent,
    CoursesCardComponent,
    LibraryCoursesLessonComponent,
  ],
  imports: [
    CommonModule,
    LearnerRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LearnerModule { }
