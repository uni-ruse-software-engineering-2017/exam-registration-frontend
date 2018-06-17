import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ExamsArchiveComponent } from './exams-archive/exams-archive.component';
import { ProfessorDashboardComponent } from './professor-dashboard/professor-dashboard.component';
// tslint:disable-next-line:max-line-length
import { ProfessorExamDatesBySubjectComponent } from './professor-exam-dates/professor-exam-dates-by-subject/professor-exam-dates-by-subject.component';
import { ProfessorExamDatesComponent } from './professor-exam-dates/professor-exam-dates.component';
import { AddExamModalComponent } from './professor-exam-dates/professor-exam-dates/modals/add-exam-modal/add-exam-modal.component';
import { ProfessorRoutingModule } from './professor-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, ProfessorRoutingModule],
  declarations: [
    ProfessorDashboardComponent,
    ProfessorExamDatesComponent,
    ExamsArchiveComponent,
    ProfessorExamDatesBySubjectComponent,
    AddExamModalComponent
  ],
  entryComponents: [AddExamModalComponent]
})
export class ProfessorModule {}
