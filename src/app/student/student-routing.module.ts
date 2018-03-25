import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentExamDatesComponent } from './student-exam-dates/student-exam-dates.component';

const routes: Routes = [
  { path: '', component: StudentDashboardComponent },
  { path: 'exam-dates', component: StudentExamDatesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
