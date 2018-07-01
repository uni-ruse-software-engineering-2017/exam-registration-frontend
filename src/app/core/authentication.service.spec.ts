import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import { IJwtUserData } from '../models/authentication-models';
import { MaterialComponentsModule } from '../shared/material-components.module';
import { AuthenticationService } from './authentication.service';
import { CoreModule } from './core.module';

const API_URL = environment.API_URL;
const JWT_KEY = 'jwt';

const STUDENT_CREDENTIALS = {
  password: '123321',
  username: 's136510@stud.uni-ruse.bg'
};

const TEST_JWT =
  // tslint:disable-next-line:max-line-length
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzMTM2NTEwQHN0dWQudW5pLXJ1c2UuYmciLCJpc3MiOiJleGFtcy5hbWkudW5pLXJ1c2UuYmciLCJleHAiOjE1MjMzMTY2NzYsImlhdCI6MTUyMzMxMzA3Niwicm9sZSI6IlNUVURFTlQifQ.tbxUYT02oIpeMpltA7TMdl1AomDEkzji3CARfzH5b4UEKUDlD-xpR3-wr2wOl3rYFiBagg1mLDy-bJLiEm_uig';

describe('AuthenticationService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let jwtHelper: JwtHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService, JwtHelperService],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        CoreModule,
        TranslateModule.forRoot(),
        MaterialComponentsModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem(JWT_KEY);
            }
          }
        })
      ]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

    // Inject the JWT helper service
    jwtHelper = TestBed.get(JwtHelperService);
  });

  it(
    'should be created',
    inject([AuthenticationService], (service: AuthenticationService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    '#login should log in a user',
    inject([AuthenticationService], (service: AuthenticationService) => {
      service.login(STUDENT_CREDENTIALS).subscribe(
        loginSuccess => {
          expect(loginSuccess.token.length).toBeGreaterThan(0);

          // check if the JWT is saved in localStorage
          expect(localStorage.getItem(JWT_KEY)).toEqual(loginSuccess.token);

          // check if the JWT is parsed successfully
          const userDetails = jwtHelper.decodeToken(
            loginSuccess.token
          ) as IJwtUserData;
          service.userProfile$.subscribe(userProfile => {
            expect(userProfile.role).toEqual(userDetails.role);
            expect(userProfile.username).toEqual(userDetails.sub);
          });

          service.isUserLogged().subscribe(isLogged => {
            expect(isLogged).toBeTruthy();
          });
        },
        error => {
          fail(error);
        }
      );

      const req = httpTestingController.expectOne(`${API_URL}/login`);
      expect(req.request.method === 'POST');

      req.flush({
        token: TEST_JWT
      });
    })
  );

  it(
    '#login should not log in user with invalid credentials',
    inject([AuthenticationService], (service: AuthenticationService) => {
      service
        .login({
          username: 'fake@example.com',
          password: '123456'
        })
        .subscribe(
          () => {
            fail('Should have received an HTTP error response.');
          },
          (error: HttpErrorResponse) => {
            expect(error).toBeTruthy();
            expect(error.status).toBe(401);
            expect(localStorage.getItem(JWT_KEY)).toBeFalsy();
          }
        );

      const req = httpTestingController.expectOne(`${API_URL}/login`);
      expect(req.request.method === 'POST');

      req.flush('Invalid Credentials', {
        status: 401,
        statusText: 'Invalid credentials'
      });
    })
  );

  it(
    '#logout should clear session data',
    inject([AuthenticationService], (service: AuthenticationService) => {
      service.login(STUDENT_CREDENTIALS).subscribe(token => {
        service.logout().subscribe(() => {
          service.isUserLogged().subscribe(isLogged => {
            expect(isLogged).toBeFalsy();
          });

          expect(localStorage.getItem(JWT_KEY)).toBeFalsy();
        }, fail);
      }, fail);

      const loginReq = httpTestingController.expectOne(`${API_URL}/login`);
      expect(loginReq.request.method === 'POST');
      const profileReq = httpTestingController.expectOne(`${API_URL}/profile`);
      expect(loginReq.request.method === 'GET');

      loginReq.flush({
        token: TEST_JWT
      });
    })
  );

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();

    localStorage.removeItem(JWT_KEY);
  });
});
