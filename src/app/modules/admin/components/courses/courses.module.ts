import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CoursesGridComponent } from './display-courses/courses-grid/courses-grid.component';
import { CourseDetailsComponent } from './display-courses/course-details/course-details.component';
import { CoursesListComponent } from './display-courses/courses-list/courses-list.component';
import { CoursesBlankComponent } from './display-courses/courses-blank/courses-blank.component';
import { DragDropDirective } from 'src/app/directives/drag-drop.directive';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { AddQuizQuestionComponent } from './add-quiz-question/add-quiz-question.component';
import { DisplayCoursesComponent } from './display-courses/display-courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddCourseModuleComponent } from './add-course/add-course-module/add-course-module.component';
import { AddCourseModuleLessonComponent } from './add-course/add-course-module-lesson/add-course-module-lesson.component';

@NgModule({
  declarations: [
    DragDropDirective,
    CoursesComponent,
    CoursesGridComponent,
    CoursesListComponent,
    CoursesBlankComponent,
    CourseDetailsComponent,
    AddQuizComponent,
    AddQuizQuestionComponent,
    DisplayCoursesComponent,
    AddCourseComponent,
    AddCourseModuleComponent,
    AddCourseModuleLessonComponent,
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
