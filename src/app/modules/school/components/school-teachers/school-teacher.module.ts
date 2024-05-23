import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolTeacherRoutingModule } from './school-teacher-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DisplaySchoolTeachersComponent } from './display-school-teachers/display-school-teachers.component';
import { ListDisplaySchoolTeachersComponent } from './display-school-teachers/list-display-school-teachers/list-display-school-teachers.component';
import { BlankDisplaySchoolTeacherComponent } from './display-school-teachers/blank-display-school-teacher/blank-display-school-teacher.component';
import { AddEditSchoolTeacherComponent } from './add-edit-school-teacher/add-edit-school-teacher.component';



@NgModule({
  declarations: [
    DisplaySchoolTeachersComponent,
    ListDisplaySchoolTeachersComponent,
    BlankDisplaySchoolTeacherComponent,
    AddEditSchoolTeacherComponent,
  ],
  imports: [
    CommonModule,
    SchoolTeacherRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class SchoolTeacherModule { }
