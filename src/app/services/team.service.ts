import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  urlBaseRating: string = `${environment.urlServices}/team_player`;

  constructor(private http: HttpClient) { }

  getTeam(id: string): Observable<any> {
    return this.http.get(`${this.urlBaseRating}/${id}`);
  }
}
