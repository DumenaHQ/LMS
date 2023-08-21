import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuizQuestionComponent } from './add-quiz-question/add-quiz-question.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { CourseDetailsComponent } from './display-courses/course-details/course-details.component';
import { CoursesComponent } from './courses.component';
import { DisplayCoursesComponent } from './display-courses/display-courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddCourseModuleComponent } from './add-course/add-course-module/add-course-module.component';
import { DisplayCourseModulesComponent } from './add-course/display-course-modules/display-course-modules.component';

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
        path: 'create-course',
        component: AddCourseComponent,
        data: {
          title: 'Create Course',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'create-course/:courseId/modules',
        component: DisplayCourseModulesComponent,
        data: {
          title: 'Add Modules',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'create-course/:courseId/modules/add-module',
        component: AddCourseModuleComponent,
        data: {
          title: 'Add Modules',
          description: 'Description Meta Tag Content',
        },
      },
      // {
      //   path: 'create-course/quiz',
      //   component: AddQuizComponent,
      //   data: {
      //     title: 'Quiz',
      //     description: 'Description Meta Tag Content',
      //   },
      // },
      // {
      //   path: 'create-course/quiz/add-question',
      //   component: AddQuizQuestionComponent,
      //   data: {
      //     title: 'Add Quiz',
      //     description: 'Description Meta Tag Content',
      //   },
      // },
      { path: '', redirectTo: 'courses', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
