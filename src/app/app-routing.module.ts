import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/route-guards/admin.guard';
import { LoggedInGuard } from './core/route-guards/logged-in.guard';
import { ProfessorGuard } from './core/route-guards/professor.guard';
import { StudentGuard } from './core/route-guards/student.guard';
import { HomeComponent } from './shared/home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'student',
    loadChildren: './student/student.module#StudentModule',
    canActivate: [LoggedInGuard, StudentGuard]
  },
  {
    path: 'administration',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [LoggedInGuard, AdminGuard]
  },
  {
    path: 'professor',
    loadChildren: './professor/professor.module#ProfessorModule',
    canActivate: [LoggedInGuard, ProfessorGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
