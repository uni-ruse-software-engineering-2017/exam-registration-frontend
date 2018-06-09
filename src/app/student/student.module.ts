import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EnrollmentService } from './services/enrollment.service';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentExamDatesComponent } from './student-exam-dates/student-exam-dates.component';
import { StudentExamsBySubjectComponent } from './student-exam-dates/student-exams-by-subject/student-exams-by-subject.component';
import { StudentRoutingModule } from './student-routing.module';

@NgModule({
  imports: [SharedModule, StudentRoutingModule],
  declarations: [
    StudentDashboardComponent,
    StudentExamDatesComponent,
    StudentExamsBySubjectComponent
  ],
  providers: [EnrollmentService]
})
export class StudentModule {}
