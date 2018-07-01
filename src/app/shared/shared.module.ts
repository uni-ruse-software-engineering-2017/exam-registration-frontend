import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmModalComponent } from './confirmation-modal/confirmation-modal.component';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { HomeComponent } from './home/home.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { MaterialComponentsModule } from './material-components.module';
import { TimeInputComponent } from './time-input/time-input.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MaterialComponentsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    HeroCardComponent,
    HomeComponent,
    ConfirmModalComponent,
    TimeInputComponent,
    LanguageSelectorComponent
  ],
  declarations: [
    HeroCardComponent,
    HomeComponent,
    ConfirmModalComponent,
    TimeInputComponent,
    LanguageSelectorComponent
  ],
  entryComponents: [ConfirmModalComponent]
})
export class SharedModule {}
