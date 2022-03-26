import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatchPlayer } from '../interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {

  playerSelected$: Subject<MatchPlayer | null> = new Subject();
  playerChanges$: Subject<boolean> = new Subject();

}
