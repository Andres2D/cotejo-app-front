import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FullMatch, Match, MatchDB, MatchDetails } from '../interfaces/match.interface';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  urlBaseMatch: string = `${environment.urlServices}/match`;

  getMatchs(): Observable<Match> {
    return this.http.get<Match>(this.urlBaseMatch)
  }

  getFullMatch(id: string): Observable<FullMatch> {
    return this.http.get<FullMatch>(`${this.urlBaseMatch}/${id}`);    
  }

  updateMatch(id: string, match: MatchDB): Observable<any> {
    return this.http.put(`${this.urlBaseMatch}/${id}`, match);
  }
}
