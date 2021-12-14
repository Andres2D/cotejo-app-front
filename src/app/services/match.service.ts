import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Match, MatchDetails } from '../interfaces/match.interface';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  urlBaseRating: string = `${environment.urlServices}/match`;

  getMatchs(): Observable<Match> {
    return this.http.get<Match>(this.urlBaseRating)
  }

  getMatch(id: string): Observable<MatchDetails> {
    return this.http.get<MatchDetails>(`${this.urlBaseRating}/${id}`);    
  }
}
