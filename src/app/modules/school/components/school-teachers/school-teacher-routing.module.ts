import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplaySchoolTeachersComponent } from './display-school-teachers/display-school-teachers.component';

const routes: Routes = [
  {
    path: '',
    component: DisplaySchoolTeachersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolTeacherRoutingModule {}
