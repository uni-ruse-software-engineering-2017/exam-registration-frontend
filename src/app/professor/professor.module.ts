import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ExamsArchiveComponent } from './exams-archive/exams-archive.component';
import { ProfessorDashboardComponent } from './professor-dashboard/professor-dashboard.component';
import { ProfessorExamDatesComponent } from './professor-exam-dates/professor-exam-dates.component';
import { ProfessorRoutingModule } from './professor-routing.module';

@NgModule({
  imports: [CommonModule, ProfessorRoutingModule],
  declarations: [ProfessorDashboardComponent, ProfessorExamDatesComponent, ExamsArchiveComponent]
})
export class ProfessorModule {}
