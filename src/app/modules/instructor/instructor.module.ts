import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstructorOverviewComponent } from './components/instructor-overview/instructor-overview.component';
import { DisplayInstructorClassroomsComponent } from './components/instructor-classrooms/display-instructor-classrooms/display-instructor-classrooms.component';
import { ViewInstructorClassroomComponent } from './components/instructor-classrooms/view-instructor-classroom/view-instructor-classroom.component';
import { GridDisplayComponent } from './components/instructor-classrooms/display-instructor-classrooms/grid-display/grid-display.component';
import { BlankDisplayComponent } from './components/instructor-classrooms/display-instructor-classrooms/blank-display/blank-display.component';


@NgModule({
  declarations: [
    InstructorComponent,
    InstructorOverviewComponent,
    DisplayInstructorClassroomsComponent,
    ViewInstructorClassroomComponent,
    GridDisplayComponent,
    BlankDisplayComponent
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class InstructorModule { }
