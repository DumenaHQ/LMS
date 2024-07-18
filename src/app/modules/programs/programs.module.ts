import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsRoutingModule } from './programs-routing.module';
import { DisplayProgramsComponent } from './components/display-programs/display-programs.component';
import { BlankDisplayProgramComponent } from './components/display-programs/blank-display-program/blank-display-program.component';
import { GridDisplayProgramsComponent } from './components/display-programs/grid-display-programs/grid-display-programs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AddProgramComponent } from './components/add-program/add-program.component';
import { ViewProgramComponent } from './components/view-program/view-program.component';
import { EditProgramComponent } from './components/edit-program/edit-program.component';
import { AddProgramLearnersComponent } from './components/add-program-learners/add-program-learners.component';
import { AddProgramCoursesComponent } from './components/add-program-courses/add-program-courses.component';


@NgModule({
  declarations: [
    DisplayProgramsComponent,
    BlankDisplayProgramComponent,
    GridDisplayProgramsComponent,
    AddProgramComponent,
    ViewProgramComponent,
    EditProgramComponent,
    AddProgramLearnersComponent,
    AddProgramCoursesComponent
  ],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ProgramsModule { }
