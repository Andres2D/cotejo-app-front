import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchComponent } from './match/match.component';
import { MenuComponent } from './menu/menu.component';
import { PlayerComponent } from './player/player.component';
import { PlayerResolver } from './player/player.resolver';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent
  },
  {
    path: 'player',
    component: PlayerComponent,
    resolve: {
      player: PlayerResolver
    }
  },
  {
    path: 'match',
    component: MatchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotejoRoutingModule { }
