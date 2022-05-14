import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CotejoRoutingModule } from './cotejo-routing.module';
import { MenuComponent } from './menu/menu.component';
import { ComponentsModule } from '../components/components.module';
import { PlayerComponent } from './player/player.component';
import { MatchComponent } from './matchs/match/match.component';
import { DetailsComponent } from './matchs/details/details.component';
import { MatchsComponent } from './matchs/matchs.component';
import { CreateComponent } from './matchs/create/create.component';

@NgModule({
  declarations: [
    MenuComponent,
    PlayerComponent,
    MatchComponent,
    DetailsComponent,
    MatchsComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    CotejoRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatInputModule,
    MatSliderModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatStepperModule,
    MatTooltipModule
  ]
})
export class CotejoModule { }
