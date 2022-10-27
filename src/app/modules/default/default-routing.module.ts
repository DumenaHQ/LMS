import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { RoboticsChampComponent } from './components/robotics-champ/robotics-champ.component';
import { SummerschoolComponent } from './components/summerschool/summerschool.component';
import { DefaultComponent } from './default.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          title: 'Dumena Education',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'pricing',
        component: PricingComponent,
        data: {
          title: 'Pricing',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'summerschool',
        component: SummerschoolComponent,
        data: {
          title: 'Robotics Summer Bootcamp',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'robotics-championship',
        component: RoboticsChampComponent,
        data: {
          title: 'Robotics Championship',
          description: 'Description Meta Tag Content',
        },
      },
      { path: '', redirectTo: '/', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultRoutingModule {}
