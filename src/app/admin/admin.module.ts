import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { ProfessorsManagementComponent } from './professors-management/professors-management.component';
import { SubjectsManagementComponent } from './subjects-management/subjects-management.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [ProfessorsManagementComponent, SubjectsManagementComponent]
})
export class AdminModule { }
