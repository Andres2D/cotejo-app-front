import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Profile } from 'src/app/interfaces/profile.interface';
import { playerMock } from './player.mock';

@Injectable({
  providedIn: 'root'
})
export class PlayerResolver implements Resolve<Profile> {

  readonly playerMock = playerMock;

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Profile> {
    return of(playerMock);
  }
}
