import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentExamDatesComponent } from './student-exam-dates/student-exam-dates.component';
import { StudentExamsBySubjectComponent } from './student-exam-dates/student-exams-by-subject/student-exams-by-subject.component';

const routes: Routes = [
  { path: '', component: StudentDashboardComponent },
  { path: 'exam-dates', component: StudentExamDatesComponent },
  {
    path: 'exam-dates/:subjectId',
    component: StudentExamsBySubjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
