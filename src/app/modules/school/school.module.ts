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
import { SchoolOnboardComponent } from './components/school-onboard/school-onboard.component';
import { LearningSupportModule } from '../learning-support/learning-support.module';
import { PaymentClassroomLearnersComponent } from './components/school-payment/payment-classroom-learners/payment-classroom-learners.component';

@NgModule({
  declarations: [
    SchoolComponent,
    SchoolOverviewComponent,
    StudentBlankComponent,
    SchoolStudentsComponent,
    SchoolPaymentComponent,
    SchoolDisplayStudentsComponent,
    SchoolEnrollLearnersComponent,
    SchoolOnboardComponent,
    PaymentClassroomLearnersComponent,
  ],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LearningSupportModule
  ],
})
export class SchoolModule {}
