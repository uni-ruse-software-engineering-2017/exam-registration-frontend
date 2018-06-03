import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  IJwtUserData,
  IUserCredentials,
  IUserProfile,
  UserRole
} from './../models/authentication-models';

const API_URL = environment.API_URL;
const JWT_KEY = 'jwt';

interface ILoginSuccessResponse {
  token: string;
  profile: IUserProfile;
}

@Injectable()
export class AuthenticationService {
  private authToken: string;
  private jwtDurationTimeout: any;
  private user: IUserProfile;

  public userProfile$: ReplaySubject<IUserProfile> = new ReplaySubject();

  constructor(
    private http: HttpClient,
    private jwtUtil: JwtHelperService,
    private router: Router,
    private snackbar: MatSnackBar,
    private translate: TranslateService
  ) {
    // get JWT from local storage (if it is saved)
    const jwt = localStorage.getItem(JWT_KEY);

    if (jwt) {
      this.authToken = jwt;
      const jwtPayload = this.parseJwt(jwt);
      this.user = this.constructUserProfile(jwtPayload);
      this.userProfile$.next(this.user);

      // set a timer which will log out the user when the JWT expires
      this.jwtDurationTimeout = setTimeout(
        () => this.logout(),
        Math.max(jwtPayload.exp * 1000 - Date.now(), 0)
      );
    }
  }

  login(credentials: IUserCredentials): Observable<ILoginSuccessResponse> {
    return this.http.post(`${API_URL}/login`, credentials).pipe(
      map(response => {
        // get JWT from the JSON response body
        this.authToken = response['token'];

        // save JWT in local storage
        localStorage.setItem(JWT_KEY, this.authToken);

        // parse the JWT payload
        const jwtPayload = this.parseJwt(this.authToken) as IJwtUserData;

        // set the user profile data
        this.user = this.constructUserProfile(jwtPayload);
        this.userProfile$.next(this.user);

        // set a timer which will log out the user when the JWT expires
        this.jwtDurationTimeout = setTimeout(
          () => this.logout(),
          (jwtPayload.exp - jwtPayload.iat) * 1000
        );

        return { token: this.authToken, profile: this.user };
      })
    );
  }

  signUp(signUpData: IUserCredentials) {
    return this.http.post(`${API_URL}/sign-up`, signUpData);
  }

  logout() {
    clearTimeout(this.jwtDurationTimeout);

    // display a message to the user that their
    // session has expired
    if (this.jwtUtil.isTokenExpired()) {
      this.snackbar.open(
        this.translate.instant('Session expired'),
        this.translate.instant('Dismiss'),
        {
          duration: 3500
        }
      );
    }

    // clear session data
    this.authToken = '';
    localStorage.removeItem(JWT_KEY);
    this.userProfile$.next(null);

    this.router.navigate(['login']);
    return of(this.authToken);
  }

  isUserLogged() {
    return of(!!this.authToken);
  }

  getUserDetails() {
    return this.user;
  }

  getBaseRouteForUser(role: UserRole) {
    if (role === 'ADMIN') {
      return 'administration';
    } else if (role === 'STUDENT' || role === 'PROFESSOR') {
      return role.toLowerCase();
    } else {
      return '';
    }
  }

  private parseJwt(jwt: string) {
    return this.jwtUtil.decodeToken() as IJwtUserData;
  }

  private constructUserProfile(jwtPayload: IJwtUserData): IUserProfile {
    return {
      fullName: jwtPayload.sub,
      role: jwtPayload.role,
      username: jwtPayload.sub
    };
  }
}
