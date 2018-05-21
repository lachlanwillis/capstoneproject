import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { take, map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

const API_PREFIX = "api";
const LOGIN_URL = `/${API_PREFIX}/login`;
const LOGOUT_URL = `/${API_PREFIX}/logout`;
const SIGNUP_URL = `/${API_PREFIX}/signup`;
const PING_URL = `/${API_PREFIX}/auth/ping`;

// ADMIN URLS //
const ISADMIN_URL = `/${API_PREFIX}/isadmin`;

@Injectable()
export class AuthService {

  private authChange$: Subject<any> = new Subject();

  constructor(private readonly http: HttpClient) {
    this.authChange$.next();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<IAuthSuccess>(LOGIN_URL, { username, password })
      .pipe(map(res => { 
        this.authChange$.next();
        return res.success;
      }), take(1));
  }

  signup(username: string, password: string): Observable<any> {
    return this.http.post<IAuthSuccess>(SIGNUP_URL, { username, password })
      .pipe(map(res => { 
        this.authChange$.next();
        return res.success;
      }), take(1));
  }

  deleteUser(id: string) {

  }

  logout(): Observable<any> {
    return this.http.get<IAuthSuccess>(LOGOUT_URL)
      .pipe(map(res => { 
        this.authChange$.next();
        return res.success;
      }), take(1));
  }

  ping(): Observable<boolean> {
    return this.http.get<{ auth: boolean }>(PING_URL)
      .pipe(map(res => res.auth), take(1));
  }

  isLoggedIn() {
    return this.ping();
  }

  isAdmin() {
    return this.http.get<IAuthSuccess>(ISADMIN_URL)
      .pipe(map(res => res.success), take(1));
  }

  loginChanged() {
    return this.authChange$.asObservable();
  }

}

interface IAuthSuccess {
  success: boolean;
}