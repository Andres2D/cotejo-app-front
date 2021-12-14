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
    const teams = [
      this.matchservice.getMatch(route?.params?.match),
      this.teamService.getTeam(route?.params?.home),
      this.teamService.getTeam(route?.params?.away),
    ];
    return combineLatest(teams).pipe(
      map((team) => {
        const [match, home, away] = team;
        return {
          match,
          home,
          away,
        }
      }),
      catchError((error) => {
        return of(error);
      })
    )
  }
}
