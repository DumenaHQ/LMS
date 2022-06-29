import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesOverviewComponent } from './courses-overview/courses-overview.component';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
  {
    path: '', component: CoursesComponent, children: [
      {
        path: '',
        component: CoursesOverviewComponent,
        data: {
          title: 'Courses',
          description: 'Description Meta Tag Content'
        }
      },
      {
        path: ':id',
        component: CourseDetailsComponent,
        data: {
          title: 'Course',
          description: 'Description Meta Tag Content'
        }
      },
      { path: '', redirectTo: 'courses', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
