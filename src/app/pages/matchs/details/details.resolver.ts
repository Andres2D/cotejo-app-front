import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MatchService } from 'src/app/services/match.service';
import { TeamService } from 'src/app/services/team.service';

@Injectable({
  providedIn: 'root'
})
export class DetailsResolver implements Resolve<any> {

  constructor(private matchservice: MatchService, private teamService: TeamService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const {id} = route.params;
    return this.matchservice.getFullMatch(id);
  }
}
