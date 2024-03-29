import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayAdminClassTemplateComponent } from './display-admin-class-template/display-admin-class-template.component';
import { AddAdminClassTemplateComponent } from './add-admin-class-template/add-admin-class-template.component';
import { DetailsDisplayAdminClassTemplateComponent } from './display-admin-class-template/details-display-admin-class-template/details-display-admin-class-template.component';
import { EditAdminClassTemplateComponent } from './edit-admin-class-template/edit-admin-class-template.component';

const routes: Routes = [
  {
    path: '',
    component: DisplayAdminClassTemplateComponent,
    data: {
      title: 'Class Templates',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: 'add-class-template',
    component: AddAdminClassTemplateComponent,
    data: {
      title: 'Add Class Template',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: ':classTemplateId/edit-class-template',
    component: EditAdminClassTemplateComponent,
    data: {
      title: 'Edit Class Template',
      description: 'Description Meta Tag Content',
    },
  },
  {
    path: ':classTemplateId/view-class-template',
    component: DetailsDisplayAdminClassTemplateComponent,
    data: {
      title: 'View Class Template',
      description: 'Description Meta Tag Content',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassTemplateRoutingModule {}
