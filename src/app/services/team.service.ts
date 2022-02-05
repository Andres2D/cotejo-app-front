import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team, TeamPlayer, CreateTeamRequest } from '../interfaces/team.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  urlBaseTeamPlayer: string = `${environment.urlServices}/team_player`;
  urlBaseTeam: string = `${environment.urlServices}/team`;

  constructor(private http: HttpClient) { }

  getTeam(id: string): Observable<any> {
    return this.http.get(`${this.urlBaseTeamPlayer}/${id}`);
  }
  
  postTeam(team: CreateTeamRequest): Observable<any> {
    return this.http.post(`${this.urlBaseTeam}`, team);
  }

  putTeam(team: Team, id: string): Observable<any> {
    return this.http.put(`${this.urlBaseTeam}/${id}`, team);
  }
  
  putTeamPlayer(teamBase: TeamPlayer): Observable<any> {
    return this.http.put(`${this.urlBaseTeamPlayer}`, teamBase);
  }
}
