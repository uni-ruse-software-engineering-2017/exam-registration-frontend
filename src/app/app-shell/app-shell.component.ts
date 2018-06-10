import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { MatDrawer } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingService } from '../core/loading.service';
import { IUserProfile } from '../models/authentication-models';

@Component({
  selector: 'ru-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnDestroy, AfterViewInit {
  @Input() userProfile: IUserProfile;
  @Output() logoutClicked = new EventEmitter();
  @ViewChild('drawer') drawer: MatDrawer;

  private mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public loading: LoadingService,
    private translate: TranslateService,
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
    return !this.shouldHideToolbar() && !this.isMobile();
  }

  shouldHideToolbar() {
    return !this.userProfile;
  }

  onLogoutClicked() {
    this.logoutClicked.emit();
  }
}
