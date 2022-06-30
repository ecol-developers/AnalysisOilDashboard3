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
import { BehaviorSubject, Observable, take } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoginResultMd } from '../models/loginResultMd';

@Injectable()
export class AuthconfigInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
   Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | HttpEvent<Object>> {

    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');


     if (!token) {
       // logowanie
        return next.handle(req);
     } else {

      //do poprawy
      const request = this.applyToken(req);
      return next.handle(request);
    
    // if(this.authService.isExpired()){
    //   const request = this.applyToken(req);
    //   //logowanie z aktualnym tokenem
    //   return next.handle(request);
    // } else {
    //   if (!this.isRefreshingToken) {
    //     this.isRefreshingToken = true;
    //     this.tokenSubject.next(null);

    // console.log('isRefreshing',this.isRefreshingToken);
    // this.authService.refreshToken(refreshToken)
    // .subscribe({
    //   next: (res: LoginResultMd) => {
    //    this.tokenSubject.next(res.accessToken.value);
    //    localStorage.setItem('token', res.accessToken.value);
    //    localStorage.setItem('refreshToken', res.refreshToken.value);
    //    return next.handle(this.applyToken(req));
    //   },
    //   error: (err) =>{
    //     console.log('refresh error',err);
    //     this.authService.Logout();
    //   } ,
    //   complete: () => this.isRefreshingToken = false

    //  });

    // } else {
    //     this.tokenSubject.pipe(
    //     filter(tok => tok != null),
    //     take(1),
    //     switchMap((token:any) => {
    //        return next.handle(this.applyToken(req));
    //     }));
    // }
    // }

   }
  }

  applyToken(req: any): HttpRequest<any> {
    const token = localStorage.getItem('token');
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
     });

     return cloned;
  }

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

  //   let token = localStorage.getItem('token');
  //   let refreshToken = localStorage.getItem('refreshToken');
  //   if (token) {
  //       // if (!this.authService.isExpired() && refreshToken) {
  //       //   let newToken = this.authService.refreshToken(refreshToken);
  //       //   this.authService.SaveJwtToken(newToken).then(res => {
  //       //      token = localStorage.getItem('token');
  //       //      console.log("zaktualizowano token");
  //       //   });
  //       // }

  //         // this.authService.refreshToken(refreshToken)
  //         //           .subscribe({
  //         //             next: (res: LoginResultMd) => {
  //         //               console.log("pyta o nowy token");
  //         //               this.authService.SaveJwtToken(res);
  //         //             },
  //         //             complete: () => {
  //         //               console.log('pobrany swiezy token: ' + localStorage.getItem('token') + ' stary token:' + refreshToken);
  //         //               const cloned = request.clone({
  //         //                 headers: request.headers.set('Authorization', 'Bearer ' + token)
  //         //               });
  //         //               return next.handle(cloned);
  //         //             },
  //         //             error:(err)=>{
  //         //               console.log("refresh błąd: "+err);
  //         //               this.authService.Logout();
  //         //             }

  //         //           });
  //         // }
  //         const cloned = request.clone({
  //           headers: request.headers.set('Authorization', 'Bearer ' + token)
  //         });
  //         return next.handle(cloned);

  //   } else {
  //     return next.handle(request);
  //   }

  // }
}
