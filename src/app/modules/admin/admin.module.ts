import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsDisplayAdminClassTemplateComponent } from './components/admin-class-templates/components/display-admin-class-template/details-display-admin-class-template/details-display-admin-class-template.component';
import { AddCourseAdminClassTemplateComponent } from './components/admin-class-templates/components/add-course-admin-class-template/add-course-admin-class-template.component';
import { EditAdminClassTemplateComponent } from './components/admin-class-templates/components/edit-admin-class-template/edit-admin-class-template.component';

@NgModule({
  declarations: [
    AdminComponent, 
    AdminOverviewComponent, 
    TransactionsComponent, 
    DetailsDisplayAdminClassTemplateComponent, AddCourseAdminClassTemplateComponent, EditAdminClassTemplateComponent
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, ReactiveFormsModule, FormsModule],
})
export class AdminModule {}
