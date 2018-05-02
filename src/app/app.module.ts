import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppShellModule } from './app-shell/app-shell.module';
import { AppComponent } from './app.component';
import { PublicModule } from './public/public.module';
import { SharedModule } from './shared/shared.module';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: [environment.API_URL]
      }
    }),
    BrowserAnimationsModule,
    SharedModule,
    AppShellModule,
    PublicModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
