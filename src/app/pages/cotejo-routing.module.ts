import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchComponent } from './match/match.component';
import { MenuComponent } from './menu/menu.component';
import { PlayerComponent } from './player/player.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent
  },
  {
    path: 'player',
    component: PlayerComponent
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
