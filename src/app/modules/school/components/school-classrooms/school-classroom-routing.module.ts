import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplaySchoolClassroomsComponent } from './display-school-classrooms/display-school-classrooms.component';
import { AddSchoolClassroomComponent } from './add-school-classroom/add-school-classroom.component';
import { DetailsDisplaySchoolClassroomComponent } from './display-school-classrooms/details-display-school-classroom/details-display-school-classroom.component';
import { EditSchoolClassroomComponent } from './edit-school-classroom/edit-school-classroom.component';

const routes: Routes = [
  {
    path: '',
    component: DisplaySchoolClassroomsComponent,
    data: {
      title: 'Classrooms',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'classrooms/add-classroom',
    component: AddSchoolClassroomComponent,
    data: {
      title: 'Add Classroom',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'classrooms/:classroomId/view-classroom',
    component: DetailsDisplaySchoolClassroomComponent,
    data: {
      title: 'View Classroom',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'classrooms/:classroomId/edit-classroom',
    component: EditSchoolClassroomComponent,
    data: {
      title: 'Edit Classroom',
      description: 'Description Meta Tag Content',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolClassroomRouterModule {}
