import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoSessionGuard } from '../core/no-session.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoSessionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {}
