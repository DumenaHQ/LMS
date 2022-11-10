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
import { SchoolProgramsOverviewComponent } from './components/school-programs/school-programs-overview/school-programs-overview.component';
import { SchoolProgramsDetailsComponent } from './components/school-programs/school-programs-details/school-programs-details.component';
import { AddChildToProgramComponent } from './components/school-programs/add-child-to-program/add-child-to-program.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchoolEnrollLearnersComponent } from './components/school-enroll-learners/school-enroll-learners.component';

@NgModule({
  declarations: [
    SchoolComponent,
    SchoolOverviewComponent,
    StudentBlankComponent,
    SchoolStudentsComponent,
    SchoolPaymentComponent,
    SchoolDisplayStudentsComponent,
    SchoolProgramsOverviewComponent,
    SchoolProgramsDetailsComponent,
    AddChildToProgramComponent,
    SchoolEnrollLearnersComponent,
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
