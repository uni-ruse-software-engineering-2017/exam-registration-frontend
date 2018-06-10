import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from '../../core/authentication.service';

@Component({
  selector: 'ru-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.auth
      .isUserLogged()
      .pipe(filter(loggedIn => !loggedIn))
      .subscribe(() => this.router.navigate(['login']));

    this.auth.userProfile$.pipe(filter(user => !!user)).subscribe(user => {
      this.router.navigate([this.auth.getBaseRouteForUser(user.role)]);
    });
  }
}
