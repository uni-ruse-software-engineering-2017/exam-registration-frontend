import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { MatDrawer } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators/map';
import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'ru-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.css']
})
export class AppShellComponent implements OnDestroy, AfterViewInit {
  @ViewChild('drawer') drawer: MatDrawer;

  private mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private translate: TranslateService,
    private auth: AuthenticationService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1024px)');
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngAfterViewInit() {
    // close the side drawer on navigation completed
    this.router.events.subscribe(routeEvent => {
      if (routeEvent instanceof NavigationEnd && this.isMobile()) {
        this.drawer.close();
      }
    });
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  isMobile() {
    return this.mobileQuery.matches;
  }

  getDrawerMode() {
    return this.isMobile() ? 'over' : 'side';
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }

  shouldRenderDrawer() {
    return this.shouldHideToolbar().pipe(
      map(toolbarHidden => !toolbarHidden && !this.isMobile())
    );
  }

  shouldHideToolbar() {
    return this.auth.isUserLogged().pipe(map(x => !x));
  }
}
