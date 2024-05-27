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
import { DisplayAdminUsersComponent } from './components/admin-users/display-admin-users/display-admin-users.component';
import { ListDisplayAdminUsersComponent } from './components/admin-users/display-admin-users/list-display-admin-users/list-display-admin-users.component';
import { BlankDisplayAdminUserComponent } from './components/admin-users/display-admin-users/blank-display-admin-user/blank-display-admin-user.component';
import { AddEditAdminUserComponent } from './components/admin-users/add-edit-admin-user/add-edit-admin-user.component';

@NgModule({
  declarations: [
    AdminComponent, 
    AdminOverviewComponent, 
    TransactionsComponent, 
    DetailsDisplayAdminClassTemplateComponent, 
    AddCourseAdminClassTemplateComponent, 
    EditAdminClassTemplateComponent, 
    DisplayAdminUsersComponent, 
    ListDisplayAdminUsersComponent, 
    BlankDisplayAdminUserComponent, 
    AddEditAdminUserComponent
  ],
  imports: [
    CommonModule, 
    AdminRoutingModule, 
    SharedModule, 
    ReactiveFormsModule, 
    FormsModule,
    SharedModule
  ],
})
export class AdminModule {}
