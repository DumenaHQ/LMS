import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { DisplayCourseInfoComponent } from './components/display-course-info/display-course-info.component';
import { DisplayCourseLessonComponent } from './components/display-course-lesson/display-course-lesson.component';
import { DisplayCourseQuizComponent } from './components/display-course-quiz/display-course-quiz.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DisplayCourseInfoComponent,
    DisplayCourseLessonComponent,
    DisplayCourseQuizComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule
  ]
})
export class CourseModule { }
