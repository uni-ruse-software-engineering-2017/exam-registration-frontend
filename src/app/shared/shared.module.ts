import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmModalComponent } from './confirmation-modal/confirmation-modal.component';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { HomeComponent } from './home/home.component';
import { MaterialComponentsModule } from './material-components.module';

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
    ConfirmModalComponent
  ],
  declarations: [HeroCardComponent, HomeComponent, ConfirmModalComponent],
  entryComponents: [ConfirmModalComponent]
})
export class SharedModule {}
