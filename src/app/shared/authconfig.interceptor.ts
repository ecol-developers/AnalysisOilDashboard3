import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, take, throwError } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoginResultMd } from '../models/loginResultMd';

@Injectable()
export class AuthconfigInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

  

     if (!localStorage.getItem('token')) {
        return next.handle(req);
     } else {

      req = this.applyToken(req, localStorage.getItem('token'));
      return next.handle(req).pipe(
        catchError((err:any) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            return this.refreshToken(req, next);
          } else {
            this.authService.Logout();
          }
        })
      );
   }
  }


  refreshToken(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);

      return this.authService.refreshToken(localStorage.getItem('refreshToken')).pipe(
        switchMap((res: LoginResultMd) => {
          this.authService.SaveJwtToken(res);
          this.isRefreshingToken = false;
          this.tokenSubject.next(res.accessToken.value);
          return next.handle(this.applyToken(request, res.accessToken.value));
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.applyToken(request, jwt));
        })
      );
    }
  }


  applyToken(req: any, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
     });
  }
}
