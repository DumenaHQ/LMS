import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClassTemplateRoutingModule } from './class-template-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAdminClassTemplateComponent } from './add-admin-class-template/add-admin-class-template.component';
import { DisplayAdminClassTemplateComponent } from './display-admin-class-template/display-admin-class-template.component';
import { GridDisplayAdminClassTemplateComponent } from './display-admin-class-template/grid-display-admin-class-template/grid-display-admin-class-template.component';
import { BlankDisplayAdminClassTemplateComponent } from './display-admin-class-template/blank-display-admin-class-template/blank-display-admin-class-template.component';
import { DetailsDisplayAdminClassTemplateComponent } from './display-admin-class-template/details-display-admin-class-template/details-display-admin-class-template.component';
import { AddCourseModalToClassComponent } from './components/add-course-to-class-modal/add-course-to-class-modal.component';
import { RouterModule } from '@angular/router';
import { ClassTemplateComponent } from './class-template.component';
import { EditAdminClassTemplateComponent } from './edit-admin-class-template/edit-admin-class-template.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ClassTemplateRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AddAdminClassTemplateComponent,
    EditAdminClassTemplateComponent,
    DisplayAdminClassTemplateComponent,
    GridDisplayAdminClassTemplateComponent,
    BlankDisplayAdminClassTemplateComponent,
    DetailsDisplayAdminClassTemplateComponent,
    AddCourseModalToClassComponent,
    ClassTemplateComponent,
  ],
})
export class ClassTemplateModule {}
