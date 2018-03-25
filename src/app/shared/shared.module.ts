import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialComponentsModule } from '../material-components/material-components.module';

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
    ReactiveFormsModule
  ]
})
export class SharedModule {}
