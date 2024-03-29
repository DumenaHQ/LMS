import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplaySchoolTeachersComponent } from './display-school-teachers.component';
import { DetailsDisplaySchoolTeacherComponent } from './details-display-school-teacher/details-display-school-teacher.component';
import { AddEditTeacherComponent } from './add-edit-teacher/add-edit-teacher.component';

const routes: Routes = [
  {
    path: '',
    component: DisplaySchoolTeachersComponent,
  },
  {
    path: 'add',
    component: AddEditTeacherComponent,
  },
  {
    path: ':teacherId/edit',
    component: AddEditTeacherComponent,
  },
  {
    path: ':teacherId',
    component: DetailsDisplaySchoolTeacherComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolTeacherRoutingModule {}
