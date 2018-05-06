import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingService } from '../core/loading.service';
import { SharedModule } from './../shared/shared.module';
import { AppShellComponent } from './app-shell.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  imports: [SharedModule, LayoutModule, RouterModule],
  declarations: [AppShellComponent, NavigationComponent],
  exports: [AppShellComponent],
  providers: [LoadingService]
})
export class AppShellModule {}
