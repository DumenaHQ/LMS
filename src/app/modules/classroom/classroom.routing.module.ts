import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayClassroomsComponent } from './components/display-classrooms/display-classrooms.component';
import { AddClassroomComponent } from './components/add-classroom/add-classroom.component';
import { ViewClassroomComponent } from './components/view-classroom/view-classroom.component';
import { EditClassroomComponent } from './components/edit-classroom/edit-classroom.component';

const routes: Routes = [
  {
    path: '',
    component: DisplayClassroomsComponent,
    data: {
      title: 'Classrooms',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'add-classroom',
    component: AddClassroomComponent,
    data: {
      title: 'Add Classroom',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: ':classroomId/view-classroom',
    component: ViewClassroomComponent,
    data: {
      title: 'View Classroom',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: ':classroomId/edit-classroom',
    component: EditClassroomComponent,
    data: {
      title: 'Edit Classroom',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: ':typeId/:typeName/courses',
    loadChildren: () => import('../../modules/course/course.module').then((m) => m.CourseModule),
    data: {
      title: 'Courses',
      description: 'Description Meta Tag Content',
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassroomRouterModule {}