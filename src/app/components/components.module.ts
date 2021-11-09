import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { CotejoButtonComponent } from './cotejo-button/cotejo-button.component';
import { CotejoPlayerPreviewComponent } from './cotejo-player-preview/cotejo-player-preview.component';
import { CotejoRatingComponent } from './cotejo-rating/cotejo-rating.component';

@NgModule({
  declarations: [
    AlertComponent,
    CotejoButtonComponent,
    CotejoPlayerPreviewComponent,
    CotejoRatingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    CotejoButtonComponent,
    CotejoPlayerPreviewComponent,
    CotejoRatingComponent
  ]
})
export class ComponentsModule { }
