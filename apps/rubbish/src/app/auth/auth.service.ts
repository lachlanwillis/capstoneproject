import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { take, map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

const API_PREFIX = "api";
const LOGIN_URL = `/${API_PREFIX}/login`;
const LOGOUT_URL = `/${API_PREFIX}/logout`;
const SIGNUP_URL = `/${API_PREFIX}/signup`;
const PING_URL = `/${API_PREFIX}/auth/ping`;
const GET_USER_URL = `/${API_PREFIX}/auth/user`;
const POSTCODE_URL = `/${API_PREFIX}/user/postcode`;

// ADMIN URLS //
const ISADMIN_URL = `/${API_PREFIX}/isadmin`;

@Injectable()
export class AuthService {

  private authChange$: Subject<any> = new Subject();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.authChange$.next();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<IAuthSuccess>(LOGIN_URL, { email, password })
      .pipe(map(res => { 
        this.authChange$.next();
        if (res.redirect) {
          this.router.navigateByUrl(res.redirect);
        }
        return res.success;
      }), take(1));
  }

  signup(email: string, password: string): Observable<any> {
    return this.http.post<IAuthSuccess>(SIGNUP_URL, { email, password })
      .pipe(map(res => { 
        this.authChange$.next();
        return res.success;
      }), take(1));
  }

  setPostcode(position: Position): Observable<any> {
    console.log(position)
    return this.http.put(POSTCODE_URL, { lat: position.coords.latitude, long: position.coords.longitude });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(GET_USER_URL);
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
  redirect?: string;
}