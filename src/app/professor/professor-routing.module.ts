import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamsArchiveComponent } from './archive/exams-archive.component';
import { ProfessorDashboardComponent } from './dashboard/professor-dashboard.component';
import { ProfessorExamDateDetailsComponent } from './exams/exam-date-details/professor-exam-date-details.component';
import { ProfessorExamDatesBySubjectComponent } from './exams/exam-dates-by-subject/professor-exam-dates-by-subject.component';
import { ProfessorExamDatesComponent } from './exams/professor-exam-dates.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ProfessorDashboardComponent },
  { path: 'exam-dates', component: ProfessorExamDatesComponent },
  {
    path: 'exam-dates/:subjectId',
    component: ProfessorExamDatesBySubjectComponent
  },
  {
    path: 'exam-dates/:subjectId/details/:examId',
    component: ProfessorExamDateDetailsComponent
  },
  { path: 'archive', component: ExamsArchiveComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule {}
