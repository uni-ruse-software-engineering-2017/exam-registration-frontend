import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/authentication.service';
import { IUserProfile } from '../../models/authentication-models';

@Component({
  selector: 'ru-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  userDetails: IUserProfile;

  constructor(private router: Router, public auth: AuthenticationService) {
    this.auth.userProfile$.subscribe(profile => {
      this.userDetails = profile;
    });
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
}
