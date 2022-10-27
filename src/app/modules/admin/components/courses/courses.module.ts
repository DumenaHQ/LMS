import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesOverviewComponent } from './courses-overview/courses-overview.component';
import { CoursesComponent } from './courses.component';
import { CoursesGridComponent } from './courses-grid/courses-grid.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesBlankComponent } from './courses-blank/courses-blank.component';
import { DragDropDirective } from 'src/app/directives/drag-drop.directive';
import { CreateCourseComponent } from './create-course/create-course.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { AddQuizQuestionComponent } from './add-quiz-question/add-quiz-question.component';

@NgModule({
  declarations: [
    DragDropDirective,
    CoursesComponent,
    CoursesOverviewComponent,
    CoursesGridComponent,
    CoursesListComponent,
    CoursesBlankComponent,
    CourseDetailsComponent,
    CreateCourseComponent,
    AddLessonComponent,
    AddQuizComponent,
    AddQuizQuestionComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CoursesModule {}
