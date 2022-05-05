import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Login } from '../models/login';
import { loginJwt } from '../models/loginJwt';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  endpoint:string = "https://localhost:44387";

  constructor(
    private http:HttpClient,
    private router:Router
    ) { }

  Login(loginObj: Login):Observable<loginJwt>  {
    if (loginObj.email && loginObj.password){

    return this.http.post<loginJwt>(this.endpoint+"/User/GenerateJwt",loginObj)
                  .pipe(tap(console.log), catchError(this.handleError));
     }
     else
        return  throwError("Jedno z wymaganych pól jest puste!")

   }

   Logout() {
    localStorage.clear();
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

   private handleError(error:HttpErrorResponse): Observable<never>{
    console.error(
      "Name: "+error.name+"\n"+
      "Meaasage: "+error.message+" \n"+
      "Return code: "+error.status+" \n"
    );   
    return throwError("Błąd logowania: "+ error.statusText+" kod: "+error.status);
   }

   SaveJwtToken(jwt: string): void {
      localStorage.setItem("token",jwt)
      let decodate = JSON.parse(window.atob(jwt.split('.')[1]))
      localStorage.setItem("clientId",decodate['clientId']);
      localStorage.setItem("userName", decodate['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
      localStorage.setItem("userId", decodate['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
      localStorage.setItem("userRole", decodate['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
      localStorage.setItem("tokenExp", decodate['exp']);
      if(this.isLoggedIn())
          this.router.navigate(["/dashboard/mainpage"]);
  }

}
