import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayCourseInfoComponent } from './components/display-course-info/display-course-info.component';
import { DisplayCourseLessonComponent } from './components/display-course-lesson/display-course-lesson.component';
import { DisplayCourseQuizComponent } from './components/display-course-quiz/display-course-quiz.component';

const routes: Routes = [
  {
    path: ':courseId',
    component: DisplayCourseInfoComponent,
    data: {
      title: 'Course',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: ':courseId/lessons',
    component: DisplayCourseLessonComponent,
    data: {
      title: 'Course',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: ':courseId/lessons/quiz/:quizId',
    component: DisplayCourseQuizComponent,
    data: {
      title: 'Course',
      description: 'Description Meta Tag Content',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
