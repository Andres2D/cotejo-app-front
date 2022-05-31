import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { 
  PlayerUpdate, 
  SearchPlayer, 
  UpdatePlayerTeamRequest 
} from '../interfaces/player.interface';
import { Profile } from '../interfaces/profile.interface';
import { RatingUpdate } from '../interfaces/rating.interface';
import { AuthService } from './auth.service';
import { TeamPlayer, ReplacePlayerReq } from '../interfaces/team.interface';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  urlBasePlayer: string = `${environment.urlServices}/players`;
  urlBaseRating: string = `${environment.urlServices}/rating`;
  urlBaseTeamPlayer: string = `${environment.urlServices}/team_player`;

  get playerId(): string {
    return this.authService.getPlayerId();
  }

  getFullProfile(): Observable<Profile> {
    const url = `${this.urlBasePlayer}/${this.playerId}`;
    return this.http.get<Profile>(url)
  }

  updatePlayer(req: any): Observable<PlayerUpdate> {
    const url = `${this.urlBasePlayer}/${this.playerId}`;
    return this.http.put<PlayerUpdate>(url, req);
  }

  updateRating(req: any): Observable<RatingUpdate> {
    const url = `${this.urlBaseRating}/${this.playerId}`;
    return this.http.put<RatingUpdate>(url, req);
  }

  searchPlayer(query: string): Observable<SearchPlayer> {
    const url = `${this.urlBasePlayer}?q=${query}`;
    return this.http.get<SearchPlayer>(url);
  }

  postTeamPlayer(teamPlayers: TeamPlayer[]): Observable<any> {
    const url = this.urlBaseTeamPlayer;
    return this.http.post(url, teamPlayers);
  }

  postRating(req: any): Observable<any> {
    const url = `${this.urlBaseRating}/${this.playerId}`;
    return this.http.post(url, req);
  }

  updatePlayerTeam(req: UpdatePlayerTeamRequest): Observable<any> {
    const url = `${this.urlBaseTeamPlayer}/changeplayer`;
    return this.http.put(url, req);
  }

  replacePlayerTeam(req: ReplacePlayerReq): Observable<any> {
    const url = `${this.urlBaseTeamPlayer}/replaceplayer`;
    return this.http.put(url, req);
  }
}
