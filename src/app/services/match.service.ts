import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FullMatch, Match, MatchDB, FormCreateMatch, CreateMatch } from '../interfaces/match.interface';
import { CreateTeamRequest } from '../interfaces/team.interface';

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

  createMatch(formData: CreateMatch): Observable<any> {
    return this.http.post(`${this.urlBaseMatch}`, formData);
  }

  deleteMatch(idMatch: string): Observable<any> {
    return this.http.delete(`${this.urlBaseMatch}/${idMatch}`);
  }
}
