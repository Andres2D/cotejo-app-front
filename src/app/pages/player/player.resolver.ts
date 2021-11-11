import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Profile } from 'src/app/interfaces/profile.interface';
import { PlayerService } from 'src/app/services/player.service';
import { playerMock } from './player.mock';

@Injectable({
  providedIn: 'root'
})
export class PlayerResolver implements Resolve<Profile> {

  readonly playerMock = playerMock;

  constructor(private playerService: PlayerService) {}  

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Profile> {

    return this.playerService.getFullProfile().pipe(
      map((profile) => {
        const {player, _id, overall, ...rates} = profile.rating;
        return {
          ...profile,
          rates,
          overall
        };
      }),
      catchError((err) => {
        console.log(err);
        return of(err);
      })
    )
  }
}
