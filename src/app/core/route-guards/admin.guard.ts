import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.userProfile$.pipe(
      map(profile => {
        const role = profile.role;
        const hasRole = role === 'ADMIN';

        if (hasRole) {
          return true;
        } else {
          this.router.navigate([this.auth.getBaseRouteForUser(role)]);
          return false;
        }
      })
    );
  }
}
