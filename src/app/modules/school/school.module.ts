import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { SchoolComponent } from './school.component';
import { SharedModule } from '../shared/shared.module';
import { SchoolOverviewComponent } from './components/school-overview/school-overview.component';
import { SchoolStudentsComponent } from './components/school-students/school-students.component';
import { SchoolPaymentComponent } from './components/school-payment/school-payment.component';
import { StudentBlankComponent } from './components/school-students/student-blank/student-blank.component';


@NgModule({
  declarations: [
    SchoolComponent,
    SchoolOverviewComponent,
    StudentBlankComponent,
    SchoolStudentsComponent,
    SchoolPaymentComponent,
  ],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    SharedModule
  ]
})
export class SchoolModule { }
