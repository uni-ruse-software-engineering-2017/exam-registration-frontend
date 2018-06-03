import { NgModule } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { AdminGuard } from './route-guards/admin.guard';
import { LoggedInGuard } from './route-guards/logged-in.guard';
import { NoSessionGuard } from './route-guards/no-session.guard';
import { ProfessorGuard } from './route-guards/professor.guard';
import { StudentGuard } from './route-guards/student.guard';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AuthenticationService,
    LoggedInGuard,
    NoSessionGuard,
    StudentGuard,
    ProfessorGuard,
    AdminGuard,
    HttpErrorHandlerService
  ]
})
export class CoreModule {}
