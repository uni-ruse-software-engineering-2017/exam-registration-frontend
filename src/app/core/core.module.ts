import { NgModule } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { AdminGuard } from './route-guards/admin.guard';
import { LoggedInGuard } from './route-guards/logged-in.guard';
import { NoSessionGuard } from './route-guards/no-session.guard';
import { ProfessorGuard } from './route-guards/professor.guard';
import { StudentGuard } from './route-guards/student.guard';
import { ConfirmationModalService } from './services/confirmation-modal.service';
import { ExamService } from './services/exam.service';
import { SubjectService } from './services/subject.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AuthenticationService,
    SubjectService,
    ExamService,
    LoggedInGuard,
    NoSessionGuard,
    StudentGuard,
    ProfessorGuard,
    AdminGuard,
    HttpErrorHandlerService,
    ConfirmationModalService
  ]
})
export class CoreModule {}
