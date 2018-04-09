import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { map } from 'rxjs/operators';
import { IApplicationUser } from './../models/authentication-models';

@Injectable()
export class AuthenticationService {
  private loggedUser: IApplicationUser;

  constructor() {}

  login(user: IApplicationUser): Observable<IApplicationUser> {
    if (!user || !user.username || !user.password) {
      return _throw('Invalid credentials!');
    }

    this.loggedUser = user;

    return of(user);
  }

  signUp(emailAddress: string) {
    if (!emailAddress) {
      return _throw('Email address must be provided!');
    }

    return of(null);
  }

  logout() {
    this.loggedUser = null;
    return of(null);
  }

  isUserLogged() {
    return of(!!this.loggedUser);
  }
}
