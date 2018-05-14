import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { take, map } from 'rxjs/operators';

const API_PREFIX = "api";
const LOGIN_URL = `/${API_PREFIX}/login`;
const LOGOUT_URL = `/${API_PREFIX}/logout`;
const SIGNUP_URL = `/${API_PREFIX}/signup`;
const PING_URL = `/${API_PREFIX}/auth/ping`;

@Injectable()
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<IAuthSuccess>(LOGIN_URL, { username, password })
      .pipe(map(res => res.success), take(1));
  }

  signup(username: string, password: string): Observable<any> {
    return this.http.post<IAuthSuccess>(SIGNUP_URL, { username, password })
      .pipe(map(res => res.success), take(1));
  }

  logout(): Observable<any> {
    return this.http.get<IAuthSuccess>(LOGOUT_URL)
      .pipe(map(res => res.success), take(1));
  }

  ping(): Observable<boolean> {
    return this.http.get<{ auth: boolean }>(PING_URL)
      .pipe(map(res => res.auth), take(1));
  }

  isLoggedIn() {
    return this.ping();
  }

}

interface IAuthSuccess {
  success: boolean;
}