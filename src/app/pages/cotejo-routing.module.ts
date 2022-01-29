import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './matchs/create/create.component';
import { DetailsComponent } from './matchs/details/details.component';
import { DetailsResolver } from './matchs/details/details.resolver';
import { MatchComponent } from './matchs/match/match.component';
import { MatchResolver } from './matchs/match/match.resolver';
import { MatchsComponent } from './matchs/matchs.component';
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
    component: MatchsComponent,
    children: [
      {
        path: '',
        component: MatchComponent,
        resolve: {
          match: MatchResolver
        },
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        resolve: {
          details: DetailsResolver
        }
      },
      {
        path: 'create',
        component: CreateComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotejoRoutingModule { }
