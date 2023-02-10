import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { AddQuizQuestionComponent } from './add-quiz-question/add-quiz-question.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesOverviewComponent } from './courses-overview/courses-overview.component';
import { CoursesComponent } from './courses.component';
import { CreateCourseComponent } from './create-course/create-course.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      {
        path: '',
        component: CoursesOverviewComponent,
        data: {
          title: 'Courses',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'course-details/:id', // Change this to course/:id 
        component: CourseDetailsComponent,
        data: {
          title: 'Course',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'create-course',
        component: CreateCourseComponent,
        data: {
          title: 'Create Course',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'create-course/:courseId/add-module',
        component: AddLessonComponent,
        data: {
          title: 'Add Lesson',
          description: 'Description Meta Tag Content',
        },
      },
      // {
      //   path: 'create-course/add-lesson',
      //   component: AddLessonComponent,
      //   data: {
      //     title: 'Add Lesson',
      //     description: 'Description Meta Tag Content',
      //   },
      // },
      {
        path: 'create-course/quiz',
        component: AddQuizComponent,
        data: {
          title: 'Quiz',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'create-course/quiz/add-question',
        component: AddQuizQuestionComponent,
        data: {
          title: 'Add Quiz',
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
