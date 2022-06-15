import { Injectable } from '@angular/core';
import {
  Resolve
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Profile } from '../../interfaces/profile.interface';
import { PlayerService } from '../../services/player.service';
import { playerMock } from './player.mock';

@Injectable()
export class PlayerResolver implements Resolve<Profile> {

  readonly playerMock = playerMock;

  constructor(private playerService: PlayerService) {}  

  resolve(): Observable<Profile> {

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
