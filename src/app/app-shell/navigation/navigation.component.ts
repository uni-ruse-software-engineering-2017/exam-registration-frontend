import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/authentication.service';
import { IUserProfile } from '../../models/authentication-models';

@Component({
  selector: 'ru-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Input() userDetails: IUserProfile;
  @Output() logoutClicked = new EventEmitter();

  logout() {
    this.logoutClicked.emit();
  }
}
