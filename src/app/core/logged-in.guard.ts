import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.isUserLogged().pipe(
      map(
        isLoggedIn => {
          if (!isLoggedIn) {
            this.router.navigate(['login']);
            return false;
          }
          return true;
        },
        error => {
          return of(false);
        }
      )
    );
  }
}
