import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayProgramsComponent } from './components/display-programs/display-programs.component';
import { AddProgramComponent } from './components/add-program/add-program.component';
import { ViewProgramComponent } from './components/view-program/view-program.component';
import { EditProgramComponent } from './components/edit-program/edit-program.component';

const routes: Routes = [
  {
    path: '',
    component: DisplayProgramsComponent,
    data: {
      title: 'Programs',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'add-program',
    component: AddProgramComponent,
    data: {
      title: 'Add program',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: ':programId/view-program',
    component: ViewProgramComponent,
    data: {
      title: 'View Program',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: ':programId/edit-program',
    component: EditProgramComponent,
    data: {
      title: 'Edit Program',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'courses',
    loadChildren: () => import('../../modules/course/course.module').then((m) => m.CourseModule),
    data: {
      title: 'Courses',
      description: 'Description Meta Tag Content',
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule { }
