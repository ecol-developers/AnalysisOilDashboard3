import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginResultMd } from '../models/loginResultMd';

@Injectable()
export class AuthconfigInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    var token = localStorage.getItem("token");
    if(token){

        // if(!this.authService.isExpired()){
        //   this.authService.refreshToken(localStorage.getItem("refreshToken"))
        //             .subscribe({
        //               next:(res:LoginResultMd)=>this.authService.SaveJwtToken(res)
        //             });

        // }
          const cloned = request.clone({
            headers:request.headers.set("Authorization", "Bearer "+token)
          });
  
          return next.handle(cloned);
        
    }

    return next.handle(request);
  }
}
