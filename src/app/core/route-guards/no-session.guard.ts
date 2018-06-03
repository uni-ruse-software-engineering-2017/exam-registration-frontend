import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthenticationService } from './../authentication.service';

@Injectable()
export class NoSessionGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.isUserLogged().pipe(
      map(
        isLoggedIn => {
          if (!isLoggedIn) {
            return true;
          }

          this.auth.userProfile$
            .pipe(filter(profile => !!profile))
            .subscribe(profile =>
              this.router.navigate([
                this.auth.getBaseRouteForUser(profile.role)
              ])
            );

          return false;
        },
        error => {
          return of(true);
        }
      )
    );
  }
}
