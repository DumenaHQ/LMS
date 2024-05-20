import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstructorOverviewComponent } from './components/instructor-overview/instructor-overview.component';


@NgModule({
  declarations: [
    InstructorComponent,
    InstructorOverviewComponent,
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
