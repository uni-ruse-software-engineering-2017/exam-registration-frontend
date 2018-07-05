import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterModule
} from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppShellModule } from './app-shell/app-shell.module';
import { AppComponent } from './app.component';
import { LoadingInterceptor } from './core/loading-interceptor';
import { LoadingService } from './core/loading.service';
import { PublicModule } from './public/public.module';
import { SharedModule } from './shared/shared.module';

import { registerLocaleData } from '@angular/common';
import localeBg from '@angular/common/locales/bg';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

// the second parameter 'fr' is optional
registerLocaleData(localeBg, 'bg');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:8080', 'http://localhost:8080']
      }
    }),
    BrowserAnimationsModule,
    SharedModule,
    AppShellModule,
    PublicModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    LoadingService,
    { provide: LOCALE_ID, useValue: 'bg' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router, private loading: LoadingService) {
    /**
     * Displays loading bar when navigating to other routes
     */
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        loading.start();
      }

      if (
        event instanceof NavigationError ||
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel
      ) {
        loading.complete();
      }
    });
  }
}
