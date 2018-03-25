import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationService } from './../core/authentication.service';
import { LoginComponent } from './login/login.component';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  imports: [SharedModule, PublicRoutingModule, CoreModule],
  declarations: [LoginComponent],
  providers: [AuthenticationService]
})
export class PublicModule {}
