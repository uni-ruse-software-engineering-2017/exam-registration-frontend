import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { AppShellComponent } from './app-shell.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NavigationComponent } from './navigation/navigation.component';
import { ContentComponent } from './content/content.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [SharedModule, LayoutModule, RouterModule],
  declarations: [AppShellComponent, NavigationComponent, ContentComponent],
  exports: [AppShellComponent]
})
export class AppShellModule {}
