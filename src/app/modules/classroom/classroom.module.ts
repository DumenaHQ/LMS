import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassroomRoutingModule } from './classroom-routing.module';
import { ClassroomComponent } from './classroom.component';
import { ClassroomBlankComponent } from './components/classroom-blank/classroom-blank.component';


@NgModule({
  declarations: [
    ClassroomComponent,
    ClassroomBlankComponent
  ],
  imports: [
    CommonModule,
    ClassroomRoutingModule
  ]
})
export class ClassroomModule { }
