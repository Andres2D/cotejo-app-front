import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MatchService } from 'src/app/services/match.service';

@Injectable({
  providedIn: 'root'
})
export class MatchResolver implements Resolve<boolean> {

  constructor(private matchService: MatchService, private router: Router){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    
    return this.matchService.getMatchs()
      .pipe(
        map(res => {
          const {matchs} = res;
          return matchs;
        }),
        catchError((err) => {
          console.log(err);
          this.router.navigateByUrl('cotejo');
          return of(err)
        })
      );
  }
}
