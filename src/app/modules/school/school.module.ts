import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { SchoolComponent } from './school.component';
import { SharedModule } from '../shared/shared.module';
import { SchoolOverviewComponent } from './components/school-overview/school-overview.component';
import { SchoolStudentsComponent } from './components/school-students/school-students.component';
import { SchoolPaymentComponent } from './components/school-payment/school-payment.component';
import { StudentBlankComponent } from './components/school-students/student-blank/student-blank.component';
import { SchoolDisplayStudentsComponent } from './components/school-students/school-display-students/school-display-students.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchoolEnrollLearnersComponent } from './components/school-enroll-learners/school-enroll-learners.component';
import { SchoolProgramsComponent } from './components/school-programs/school-programs.component';
import { SchoolOnboardComponent } from './components/school-onboard/school-onboard.component';
import { SchoolClassroomBlankComponent } from './components/school-classrooms/school-classroom-blank/school-classroom-blank.component';
import { DisplaySchoolClassroomsComponent } from './components/school-classrooms/display-school-classrooms/display-school-classrooms.component';
import { GridDisplaySchoolClassroomsComponent } from './components/school-classrooms/display-school-classrooms/grid-display-school-classrooms/grid-display-school-classrooms.component';
import { AddSchoolClassroomComponent } from './components/school-classrooms/add-school-classroom/add-school-classroom.component';
import { DetailsDisplaySchoolClassroomComponent } from './components/school-classrooms/display-school-classrooms/details-display-school-classroom/details-display-school-classroom.component';
import { EditSchoolClassroomComponent } from './components/school-classrooms/edit-school-classroom/edit-school-classroom.component';
import { AddSchoolClassroomLearnersComponent } from './components/school-classrooms/add-school-classroom-learners/add-school-classroom-learners.component';
import { AddSchoolClassroomCoursesComponent } from './components/school-classrooms/add-school-classroom-courses/add-school-classroom-courses.component';

@NgModule({
  declarations: [
    SchoolComponent,
    SchoolOverviewComponent,
    StudentBlankComponent,
    SchoolStudentsComponent,
    SchoolPaymentComponent,
    SchoolDisplayStudentsComponent,
    SchoolEnrollLearnersComponent,
    SchoolProgramsComponent,
    SchoolOnboardComponent,
    SchoolClassroomBlankComponent,
    DisplaySchoolClassroomsComponent,
    GridDisplaySchoolClassroomsComponent,
    AddSchoolClassroomComponent,
    DetailsDisplaySchoolClassroomComponent,
    EditSchoolClassroomComponent,
    AddSchoolClassroomLearnersComponent,
    AddSchoolClassroomCoursesComponent,
  ],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SchoolModule {}
