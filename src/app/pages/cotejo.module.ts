import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotejoRoutingModule } from './cotejo-routing.module';
import { MenuComponent } from './menu/menu.component';
import { ComponentsModule } from '../components/components.module';
import { PlayerComponent } from './player/player.component';
import { MatchComponent } from './match/match.component';

@NgModule({
  declarations: [
    MenuComponent,
    PlayerComponent,
    MatchComponent
  ],
  imports: [
    CommonModule,
    CotejoRoutingModule,
    ComponentsModule
  ]
})
export class CotejoModule { }
