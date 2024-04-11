import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolTeacherRoutingModule } from './school-teacher-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { DisplaySchoolTeachersComponent } from './display-school-teachers.component';
import { GridDisplaySchoolTeachersComponent } from './grid-display-school-teachers/grid-display-school-teachers.component';
import { DetailsDisplaySchoolTeacherComponent } from './details-display-school-teacher/details-display-school-teacher.component';
import { AddEditTeacherComponent } from './add-edit-teacher/add-edit-teacher.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DisplaySchoolTeachersComponent,
    GridDisplaySchoolTeachersComponent,
    DetailsDisplaySchoolTeacherComponent,
    AddEditTeacherComponent,
  ],
  imports: [
    CommonModule,
    SchoolTeacherRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class SchoolTeacherModule { }
