import { NgModule } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { LoggedInGuard } from './logged-in.guard';
import { NoSessionGuard } from './no-session.guard';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [AuthenticationService, LoggedInGuard, NoSessionGuard]
})
export class CoreModule {}
