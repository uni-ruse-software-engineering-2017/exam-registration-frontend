import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ExamsArchiveComponent } from './archive/exams-archive.component';
import { ProfessorDashboardComponent } from './dashboard/professor-dashboard.component';
import { ProfessorExamDateDetailsComponent } from './exams/exam-date-details/professor-exam-date-details.component';
import { ProfessorExamDatesBySubjectComponent } from './exams/exam-dates-by-subject/professor-exam-dates-by-subject.component';
import { AddExamModalComponent } from './exams/modals/add-exam-modal/add-exam-modal.component';
import { ProfessorExamDatesComponent } from './exams/professor-exam-dates.component';
import { ProfessorRoutingModule } from './professor-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, ProfessorRoutingModule],
  declarations: [
    ProfessorDashboardComponent,
    ProfessorExamDatesComponent,
    ExamsArchiveComponent,
    ProfessorExamDatesBySubjectComponent,
    AddExamModalComponent,
    ProfessorExamDateDetailsComponent
  ],
  entryComponents: [AddExamModalComponent]
})
export class ProfessorModule {}
