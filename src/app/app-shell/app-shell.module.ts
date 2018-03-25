import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { AppShellComponent } from './app-shell.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  imports: [SharedModule, LayoutModule, RouterModule],
  declarations: [AppShellComponent, NavigationComponent],
  exports: [AppShellComponent]
})
export class AppShellModule {}
