import { NgModule } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { LoggedInGuard } from './logged-in.guard';
import { NoSessionGuard } from './no-session.guard';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AuthenticationService,
    LoggedInGuard,
    NoSessionGuard,
    HttpErrorHandlerService
  ]
})
export class CoreModule {}
