import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginResultMd } from '../models/loginResultMd';

@Injectable()
export class AuthconfigInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = localStorage.getItem('token');
    let refreshToken = localStorage.getItem('refreshToken');
    if (token) {
        // if (!this.authService.isExpired() && refreshToken) {
        //   let newToken = this.authService.refreshToken(refreshToken);
        //   this.authService.SaveJwtToken(newToken).then(res => {
        //      token = localStorage.getItem('token');
        //      console.log("zaktualizowano token");
        //   });
        // }
          
          // this.authService.refreshToken(refreshToken)
          //           .subscribe({
          //             next: (res: LoginResultMd) => {
          //               console.log("pyta o nowy token");
          //               this.authService.SaveJwtToken(res);
          //             },
          //             complete: () => {
          //               console.log('pobrany swiezy token: ' + localStorage.getItem('token') + ' stary token:' + refreshToken);
          //               const cloned = request.clone({
          //                 headers: request.headers.set('Authorization', 'Bearer ' + token)
          //               });
          //               return next.handle(cloned);
          //             },
          //             error:(err)=>{
          //               console.log("refresh błąd: "+err);
          //               this.authService.Logout();
          //             }
                      
          //           });
          // }
          const cloned = request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + token)
          });
          return next.handle(cloned);

    } else {
      return next.handle(request);
    }

  }
}
