import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../interfaces/profile.interface';
import { RatingReq, RatingUpdate } from '../interfaces/rating.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  urlBasePlayer: string = `${environment.urlServices}/players`;
  urlBaseRating: string = `${environment.urlServices}/rating`;

  get playerId(): string {
    return this.authService.getPlayerId();
  }

  getFullProfile(): Observable<Profile> {
    const url = `${this.urlBasePlayer}/${this.playerId}`;
    return this.http.get<Profile>(url)
  }

  updateRating(req: any): Observable<RatingUpdate> {
    const url = `${this.urlBaseRating}/${this.playerId}`;
    return this.http.put<RatingUpdate>(url, req);
  }
}
