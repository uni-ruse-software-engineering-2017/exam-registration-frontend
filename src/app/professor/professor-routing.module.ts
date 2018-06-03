import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamsArchiveComponent } from './exams-archive/exams-archive.component';
import { ProfessorDashboardComponent } from './professor-dashboard/professor-dashboard.component';
import { ProfessorExamDatesComponent } from './professor-exam-dates/professor-exam-dates.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ProfessorDashboardComponent },
  { path: 'exam-dates', component: ProfessorExamDatesComponent },
  { path: 'archive', component: ExamsArchiveComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule {}
