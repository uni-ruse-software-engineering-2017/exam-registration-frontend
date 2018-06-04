import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ProfessorsManagementComponent } from './professors-management/professors-management.component';
import { ProfessorService } from './services/professor.service';
import { AddSubjectModalComponent } from './subjects-management/modals/add-subject-modal/add-subject-modal.component';
import { SubjectsManagementComponent } from './subjects-management/subjects-management.component';

@NgModule({
  imports: [CommonModule, SharedModule, AdminRoutingModule],
  declarations: [
    ProfessorsManagementComponent,
    SubjectsManagementComponent,
    AddSubjectModalComponent
  ],
  providers: [ProfessorService],
  entryComponents: [AddSubjectModalComponent]
})
export class AdminModule {}
