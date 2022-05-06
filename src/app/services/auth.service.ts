import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Login } from '../models/login';
import { loginJwt } from '../models/loginJwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SharedService } from '../shared/shared.service';
import { endpointPath } from '../shared/globals';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private sharedService:SharedService
    ) { }

  Login(loginObj: Login):Observable<loginJwt>  {
    localStorage.clear();
    console.log("logowanie! token: "+localStorage.getItem("token"));

    if (loginObj.email && loginObj.password){

    return this.http.post<loginJwt>(endpointPath+"/User/GenerateJwt",loginObj)
                  .pipe(tap(console.log), catchError(this.sharedService.handleError));
     }
     else
        return  throwError("Jedno z wymaganych pól jest puste!")

   }

   Logout() {
    localStorage.clear();
    localStorage.removeItem("token");
    this.router.navigate["/login"];
  }

  public isLoggedIn(){
      const helper = new JwtHelperService();
      let exp = localStorage.getItem("token");
      let isExpiration = !helper.isTokenExpired(exp);
      return isExpiration;
  }

  public isLoggedOut(){
      return !this.isLoggedIn();
  }

  SaveJwtToken(jwt: string): void {
      localStorage.setItem("token",jwt)
      let decodate = JSON.parse(window.atob(jwt.split('.')[1]))
      localStorage.setItem("clientId",decodate['clientId']);
      localStorage.setItem("userName", decodate['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
      localStorage.setItem("userId", decodate['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
      localStorage.setItem("userRole", decodate['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
      localStorage.setItem("tokenExp", decodate['exp']);
      console.log("saveJwt"+localStorage.getItem("token"));
      if(this.isLoggedIn())
          this.router.navigate(["/dashboard/mainpage"]);
  }

}
