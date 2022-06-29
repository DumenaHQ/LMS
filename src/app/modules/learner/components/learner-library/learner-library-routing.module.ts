import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryCoursesInfoComponent } from '../library-courses-info/library-courses-info.component';
import { LearnerLibraryOverviewComponent } from './learner-library-overview/learner-library-overview.component';
import { LearnerLibraryComponent } from './learner-library.component';

const routes: Routes = [
  {
    path: '', component: LearnerLibraryComponent, children: [
      {
        path: '',
        component: LearnerLibraryOverviewComponent,
        data: {
          title: 'Library',
          description: 'Description Meta Tag Content'
        }
      },
      {
        path: 'course-info',
        component: LibraryCoursesInfoComponent,
        data: {
          title: 'Library',
          description: 'Description Meta Tag Content'
        }
      },
      { path: '', redirectTo: 'library', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnerLibraryRoutingModule { }
