import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnerLibraryRoutingModule } from './learner-library-routing.module';
import { LearnerLibraryOverviewComponent } from './learner-library-overview/learner-library-overview.component';
import { LearnerLibraryComponent } from './learner-library.component';
import { RouterModule } from '@angular/router';
import { CoursesCardComponent } from '../courses-card/courses-card.component';
import { LibraryCoursesInfoComponent } from '../library-courses-info/library-courses-info.component';
import { LibraryCoursesLessonComponent } from '../library-courses-lesson/library-courses-lesson.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { LibraryCoursesQuizComponent } from '../library-courses-quiz/library-courses-quiz.component';

@NgModule({
  declarations: [
    LearnerLibraryComponent,
    LearnerLibraryOverviewComponent,
    LibraryCoursesInfoComponent,
    LibraryCoursesLessonComponent,
    LibraryCoursesQuizComponent,
    CoursesCardComponent,
  ],
  imports: [
    CommonModule,
    LearnerLibraryRoutingModule,
    RouterModule,
    SharedModule,
  ],
})
export class LearnerLibraryModule {}
