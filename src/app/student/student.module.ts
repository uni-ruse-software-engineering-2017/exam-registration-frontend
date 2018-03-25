import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentExamDatesComponent } from './student-exam-dates/student-exam-dates.component';
import { StudentRoutingModule } from './student-routing.module';

@NgModule({
  imports: [SharedModule, StudentRoutingModule],
  declarations: [StudentDashboardComponent, StudentExamDatesComponent]
})
export class StudentModule {}
