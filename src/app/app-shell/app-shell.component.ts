import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { OnInit, SimpleChanges } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingService } from '../core/loading.service';
import { IUserProfile } from '../models/authentication-models';

@Component({
  selector: 'ru-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnDestroy, OnInit, OnChanges {
  shouldRenderDrawer: boolean;
  drawerMode: string;
  isLoading = false;
  @Input() userProfile: IUserProfile;
  @Output() logoutClicked = new EventEmitter();
  @ViewChild('drawer') drawer: MatDrawer;

  private mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  public shouldHideToolbar = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public loading: LoadingService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1024px)');
    this._mobileQueryListener = () => {
      this.shouldHideToolbar = !this.userProfile;
      this.drawerMode = this.isMobile() ? 'over' : 'side';
      this.shouldRenderDrawer = !this.shouldHideToolbar && !this.isMobile();
      this.changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    // close the side drawer on navigation completed
    this.router.events.subscribe(routeEvent => {
      if (routeEvent instanceof NavigationEnd && this.isMobile()) {
        this.drawer.close();
      }
    });

    this.loading.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const userProfile = changes['userProfile'].currentValue;

    this.shouldHideToolbar = !userProfile;
    this.drawerMode = this.isMobile() ? 'over' : 'side';
    this.shouldRenderDrawer = !this.shouldHideToolbar && !this.isMobile();
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  isMobile() {
    return this.mobileQuery.matches;
  }

  onLogoutClicked() {
    this.logoutClicked.emit();
  }
}
