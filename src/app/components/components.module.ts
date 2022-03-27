import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { CotejoButtonComponent } from './cotejo-button/cotejo-button.component';
import { CotejoPlayerPreviewComponent } from './cotejo-player-preview/cotejo-player-preview.component';
import { CotejoRatingComponent } from './cotejo-rating/cotejo-rating.component';
import { CotejoModalComponent } from './cotejo-modal/cotejo-modal.component';
import { CotejoVersusComponent } from './cotejo-versus/cotejo-versus.component';
import { CotejoFieldComponent } from './cotejo-field/cotejo-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CotejoLoaderComponent } from './cotejo-loader/cotejo-loader.component';
import { CotejoPickShieldColorComponent } from './cotejo-pick-shield-color/cotejo-pick-shield-color.component';
import { CotejoPageCardsComponent } from './cotejo-page-cards/cotejo-page-cards.component';
import { CotejoTeamRatioStarsComponent } from './cotejo-team-ratio-stars/cotejo-team-ratio-stars.component';

@NgModule({
  declarations: [
    AlertComponent,
    CotejoButtonComponent,
    CotejoPlayerPreviewComponent,
    CotejoRatingComponent,
    CotejoModalComponent,
    CotejoVersusComponent,
    CotejoFieldComponent,
    CotejoLoaderComponent,
    CotejoPickShieldColorComponent,
    CotejoPageCardsComponent,
    CotejoTeamRatioStarsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AlertComponent,
    CotejoButtonComponent,
    CotejoPlayerPreviewComponent,
    CotejoRatingComponent,
    CotejoModalComponent,
    CotejoVersusComponent,
    CotejoFieldComponent,
    CotejoLoaderComponent,
    CotejoPickShieldColorComponent,
    CotejoPageCardsComponent,
    CotejoTeamRatioStarsComponent
  ]
})
export class ComponentsModule { }
