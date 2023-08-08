import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAdminClassTemplateComponent } from './components/admin-class-templates/components/add-admin-class-template/add-admin-class-template.component';
import { DisplayAdminClassTemplateComponent } from './components/admin-class-templates/components/display-admin-class-template/display-admin-class-template.component';
import { GridDisplayAdminClassTemplateComponent } from './components/admin-class-templates/components/display-admin-class-template/grid-display-admin-class-template/grid-display-admin-class-template.component';
import { BlankDisplayAdminClassTemplateComponent } from './components/admin-class-templates/components/display-admin-class-template/blank-display-admin-class-template/blank-display-admin-class-template.component';
import { DetailsDisplayAdminClassTemplateComponent } from './components/admin-class-templates/components/display-admin-class-template/details-display-admin-class-template/details-display-admin-class-template.component';

@NgModule({
  declarations: [
    AdminComponent, 
    AdminOverviewComponent, 
    TransactionsComponent, 
    AddAdminClassTemplateComponent, 
    DisplayAdminClassTemplateComponent, 
    GridDisplayAdminClassTemplateComponent, 
    BlankDisplayAdminClassTemplateComponent, 
    DetailsDisplayAdminClassTemplateComponent
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, ReactiveFormsModule, FormsModule],
})
export class AdminModule {}
