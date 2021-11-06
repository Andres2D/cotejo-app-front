import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { CotejoButtonComponent } from './cotejo-button/cotejo-button.component';
import { CotejoPlayerPreviewComponent } from './cotejo-player-preview/cotejo-player-preview.component';

@NgModule({
  declarations: [
    AlertComponent,
    CotejoButtonComponent,
    CotejoPlayerPreviewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    CotejoButtonComponent,
    CotejoPlayerPreviewComponent
  ]
})
export class ComponentsModule { }
