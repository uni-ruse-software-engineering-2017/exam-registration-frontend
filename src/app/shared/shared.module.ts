import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialComponentsModule } from '../material-components/material-components.module';

@NgModule({
  imports: [CommonModule, TranslateModule.forChild(), MaterialComponentsModule],
  exports: [CommonModule, TranslateModule, MaterialComponentsModule]
})
export class SharedModule {}
