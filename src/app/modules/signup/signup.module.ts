import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { ParentSignupComponent } from './components/parent-signup/parent-signup.component';
import { SignupOverviewComponent } from './components/signup-overview/signup-overview.component';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { SchoolSignupComponent } from './components/school-signup/school-signup.component';
import { StudentSignupComponent } from './components/student-signup/student-signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SignupComponent,
    SignupOverviewComponent,
    ParentSignupComponent,
    SchoolSignupComponent,
    StudentSignupComponent,
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SignupModule { }
