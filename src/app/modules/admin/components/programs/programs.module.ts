import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramsComponent } from './programs.component';
import { ProgramsOverviewComponent } from './programs-overview/programs-overview.component';
import { ProgramsBlankComponent } from './programs-blank/programs-blank.component';
import { ProgramsGridComponent } from './programs-grid/programs-grid.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ProgramsDetailsComponent } from './programs-details/programs-details.component';
import { ProgramCreateComponent } from './program-create/program-create.component';
import { AddCourseModalComponent } from './add-course-modal/add-course-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProgramsComponent,
    ProgramsOverviewComponent,
    ProgramsBlankComponent,
    ProgramsGridComponent,
    ProgramsDetailsComponent,
    ProgramCreateComponent,
    AddCourseModalComponent,
  ],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProgramsModule {}
