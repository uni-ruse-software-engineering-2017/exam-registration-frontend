import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppShellModule } from './app-shell/app-shell.module';
import { NgModule } from '@angular/core';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { MissingTranslationHandler } from '@ngx-translate/core';
import { GetKeyWhenMissingTranslation } from './core/gey-key-when-missing-translation';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: GetKeyWhenMissingTranslation
      }
    }),
    BrowserAnimationsModule,
    MaterialComponentsModule,
    AppShellModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
