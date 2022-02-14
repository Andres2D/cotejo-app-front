import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse, SignUpRequest } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    const url = `${environment.urlServices}/auth`;
    return this.http.post<LoginResponse>(url, request)
      .pipe(
        tap((res) => {
          this.setToken(res.token);
          this.setPlayerId(res?.player?._id);
          return res;
        }),
        catchError(err => {
          return of(err.error);
        })
      )
  }

  signUp(request: SignUpRequest): Observable<any> {
    const url = `${environment.urlServices}/players`;
    return this.http.post<any>(url, request)
      .pipe(
        tap((res) => {
          this.setToken(res.token);
          this.setPlayerId(res?.player?._id);
          return res;
        }),
        catchError(err => {
          return of(err.error);
        })
      )
  }

  validateToken(): Observable<boolean> {
    const url = `${environment.urlServices}/auth/validate`;
    return this.http.get<LoginResponse>(url)
    .pipe(
      map((res) => {
        const {token} = res;
        this.setToken(token);
        return true;
      }),
      catchError(err => {
        return of(false); 
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  setPlayerId(id: string): void {
    localStorage.setItem('player', id);
  }

  getPlayerId(): string {
    return localStorage.getItem('player') || '';
  }

  removeToken(): void {
    localStorage.clear();
  }
}
