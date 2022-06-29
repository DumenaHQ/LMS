import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducatorSignupComponent } from './components/educator-signup/educator-signup.component';
import { ParentSignupComponent } from './components/parent-signup/parent-signup.component';
import { SchoolSignupComponent } from './components/school-signup/school-signup.component';
import { SignupOverviewComponent } from './components/signup-overview/signup-overview.component';
import { StudentSignupComponent } from './components/student-signup/student-signup.component';
import { SignupComponent } from './signup.component';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
    children: [
      {
        path: '',
        component: SignupOverviewComponent,
        data: {
          title: 'Signup',
          description: 'Description Meta Tag Content'
        }
      },
      {
        path: 'student',
        component: StudentSignupComponent,
        data: {
          title: 'Student Signup',
          description: 'Description Meta Tag Content'
        }
      },
      {
        path: 'parent',
        component: ParentSignupComponent,
        data: {
          title: 'Parent Signup',
          description: 'Description Meta Tag Content'
        }
      },
      {
        path: 'school',
        component: SchoolSignupComponent,
        data: {
          title: 'School Signup',
          description: 'Description Meta Tag Content'
        }
      },
      {
        path: 'educator',
        component: EducatorSignupComponent,
        data: {
          title: 'Educator Signup',
          description: 'Description Meta Tag Content'
        }
      },
      { path: '', redirectTo: '/learner', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
