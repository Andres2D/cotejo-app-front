import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotejoRoutingModule } from './cotejo-routing.module';
import { MenuComponent } from './menu/menu.component';
import { ComponentsModule } from '../components/components.module';
import { PlayerComponent } from './player/player.component';
import { MatchComponent } from './matchs/match/match.component';
import { ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule
  ]
})
export class CotejoModule { }
