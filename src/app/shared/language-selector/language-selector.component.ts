import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ru-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }
}
