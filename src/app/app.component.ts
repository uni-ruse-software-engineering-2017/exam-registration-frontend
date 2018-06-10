import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './core/authentication.service';

@Component({
  selector: 'ru-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    public auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.translate.setTranslation('en', require('./../assets/i18n/en.json'));
    this.translate.setTranslation('bg', require('./../assets/i18n/bg.json'));
    this.translate.defaultLang = 'bg';
  }

  onLogoutClicked() {
    this.auth.logout();
  }
}
