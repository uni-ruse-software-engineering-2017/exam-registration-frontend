import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorsManagementComponent } from './professors-management/professors-management.component';
import { SubjectsManagementComponent } from './subjects-management/subjects-management.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'professors' },
  { path: 'professors', component: ProfessorsManagementComponent },
  { path: 'subjects', component: SubjectsManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
