import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LearningSupportModule } from '../learning-support/learning-support.module';
import { DisplayClassroomsComponent } from './components/display-classrooms/display-classrooms.component';
import { GridDisplayClassroomsComponent } from './components/display-classrooms/grid-display-classrooms/grid-display-classrooms.component';
import { BlankDisplayClassroomComponent } from './components/display-classrooms/blank-display-classroom/blank-display-classroom.component';
import { ViewClassroomComponent } from './components/view-classroom/view-classroom.component';
import { SharedModule } from '../shared/shared.module';
import { AddClassroomCourseComponent } from './components/add-classroom-course/add-classroom-course.component';
import { AddClassroomLearnerComponent } from './components/add-classroom-learner/add-classroom-learner.component';
import { ViewCourseQuizReportComponent } from './components/view-classroom/view-course-quiz-report/view-course-quiz-report.component';
import { AddClassroomComponent } from './components/add-classroom/add-classroom.component';
import { EditClassroomComponent } from './components/edit-classroom/edit-classroom.component';
import { ClassroomRouterModule } from './classroom.routing.module';
import { ClassroomLearnersActivityComponent } from './components/view-classroom/classroom-learners-activity/classroom-learners-activity.component';


@NgModule({
  declarations: [
    DisplayClassroomsComponent,
    GridDisplayClassroomsComponent,
    BlankDisplayClassroomComponent,
    ViewClassroomComponent,
    AddClassroomCourseComponent,
    AddClassroomLearnerComponent,
    ViewCourseQuizReportComponent,
    AddClassroomComponent,
    EditClassroomComponent,
    ClassroomLearnersActivityComponent
  ],
  imports: [
    CommonModule,
    ClassroomRouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    LearningSupportModule
  ],
  exports: [
    DisplayClassroomsComponent,
    ViewClassroomComponent,
    AddClassroomComponent,
    EditClassroomComponent
  ]
})
export class ClassroomModule { }
