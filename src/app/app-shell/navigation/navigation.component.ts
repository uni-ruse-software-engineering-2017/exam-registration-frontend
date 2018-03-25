import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/authentication.service';

@Component({
  selector: 'ru-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  constructor(private router: Router, private auth: AuthenticationService) {}

  ngOnInit() {}

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
}
