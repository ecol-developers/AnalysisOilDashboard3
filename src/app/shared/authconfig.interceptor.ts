import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthconfigInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem("token");
    if(token){
      //tutaj bedzie sprawdzanie waznosci tokenu, jezeli stary to połączenie po nowy z uzyciem refreshToken i ponowne uruchomienie requesta
        const cloned = request.clone({
          headers:request.headers.set("Authorization", "Bearer "+token)
        });

        return next.handle(cloned);
    }

    return next.handle(request);
  }
}
