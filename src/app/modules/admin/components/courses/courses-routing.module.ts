import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './display-courses/course-details/course-details.component';
import { CoursesComponent } from './courses.component';
import { DisplayCoursesComponent } from './display-courses/display-courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddCourseModuleComponent } from './add-course/add-course-module/add-course-module.component';
import { DisplayCourseModulesComponent } from './add-course/display-course-modules/display-course-modules.component';
import { ViewQuizComponent } from './view-quiz/view-quiz.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      {
        path: '',
        component: DisplayCoursesComponent,
        data: {
          title: 'Courses',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: ':courseId/details',
        component: CourseDetailsComponent,
        data: {
          title: 'Course',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'add-course',
        component: AddCourseComponent,
        data: {
          title: 'Add Course',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: ':courseId/modules',
        component: DisplayCourseModulesComponent,
        data: {
          title: 'Modules',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: ':courseId/modules/add-module',
        component: AddCourseModuleComponent,
        data: {
          title: 'Add Modules',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: ':courseId/:moduleName/:moduleId/:lessonName/:lessonId/quiz/:quizId/details',
        component: ViewQuizComponent,
        data: {
          title: 'Quiz',
          description: 'Description Meta Tag Content',
        },
      },
      { path: '', redirectTo: 'courses', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
