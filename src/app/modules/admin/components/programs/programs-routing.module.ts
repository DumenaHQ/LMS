import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramCreateComponent } from './program-create/program-create.component';
import { ProgramsDetailsComponent } from './programs-details/programs-details.component';
import { ProgramsOverviewComponent } from './programs-overview/programs-overview.component';
import { ProgramsComponent } from './programs.component';

const routes: Routes = [
  {
    path: '',
    component: ProgramsComponent,
    children: [
      {
        path: '',
        component: ProgramsOverviewComponent,
        data: {
          title: 'Programs',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: ':programId/view-program',
        component: ProgramsDetailsComponent,
        data: {
          title: 'Programs',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'create-program',
        component: ProgramCreateComponent,
        data: {
          title: 'Programs',
          description: 'Description Meta Tag Content',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramsRoutingModule {}
