import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/authentication.service';
import { IUserProfile } from '../../models/authentication-models';

@Component({
  selector: 'ru-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() userDetails: IUserProfile;
  @Output() logoutClicked = new EventEmitter();

  logout() {
    this.logoutClicked.emit();
  }

  isUserLoggedIn() {
    return !!this.userDetails;
  }

  isStudent() {
    return this.isUserLoggedIn() && this.userDetails.role === 'STUDENT';
  }

  isProfessor() {
    return this.isUserLoggedIn() && this.userDetails.role === 'PROFESSOR';
  }

  isAdmin() {
    return this.isUserLoggedIn() && this.userDetails.role === 'ADMIN';
  }
}
