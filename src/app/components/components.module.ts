import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { CotejoButtonComponent } from './cotejo-button/cotejo-button.component';
import { CotejoPlayerPreviewComponent } from './cotejo-player-preview/cotejo-player-preview.component';
import { CotejoRatingComponent } from './cotejo-rating/cotejo-rating.component';
import { CotejoModalComponent } from './cotejo-modal/cotejo-modal.component';

@NgModule({
  declarations: [
    AlertComponent,
    CotejoButtonComponent,
    CotejoPlayerPreviewComponent,
    CotejoRatingComponent,
    CotejoModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    CotejoButtonComponent,
    CotejoPlayerPreviewComponent,
    CotejoRatingComponent,
    CotejoModalComponent
  ]
})
export class ComponentsModule { }
