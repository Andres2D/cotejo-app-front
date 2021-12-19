import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { CotejoButtonComponent } from './cotejo-button/cotejo-button.component';
import { CotejoPlayerPreviewComponent } from './cotejo-player-preview/cotejo-player-preview.component';
import { CotejoRatingComponent } from './cotejo-rating/cotejo-rating.component';
import { CotejoModalComponent } from './cotejo-modal/cotejo-modal.component';
import { CotejoVersusComponent } from './cotejo-versus/cotejo-versus.component';
import { CotejoFieldComponent } from './cotejo-field/cotejo-field.component';

@NgModule({
  declarations: [
    AlertComponent,
    CotejoButtonComponent,
    CotejoPlayerPreviewComponent,
    CotejoRatingComponent,
    CotejoModalComponent,
    CotejoVersusComponent,
    CotejoFieldComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    CotejoButtonComponent,
    CotejoPlayerPreviewComponent,
    CotejoRatingComponent,
    CotejoModalComponent,
    CotejoVersusComponent,
    CotejoFieldComponent
  ]
})
export class ComponentsModule { }
