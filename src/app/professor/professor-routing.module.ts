import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamsArchiveComponent } from './exams-archive/exams-archive.component';
import { ProfessorDashboardComponent } from './professor-dashboard/professor-dashboard.component';
// tslint:disable-next-line:max-line-length
import { ProfessorExamDatesBySubjectComponent } from './professor-exam-dates/professor-exam-dates-by-subject/professor-exam-dates-by-subject.component';
import { ProfessorExamDatesComponent } from './professor-exam-dates/professor-exam-dates.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ProfessorDashboardComponent },
  { path: 'exam-dates', component: ProfessorExamDatesComponent },
  {
    path: 'exam-dates/:subjectId',
    component: ProfessorExamDatesBySubjectComponent
  },
  { path: 'archive', component: ExamsArchiveComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule {}
