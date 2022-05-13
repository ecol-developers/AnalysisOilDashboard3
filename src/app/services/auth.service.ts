import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Login } from '../models/login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SharedService } from '../shared/shared.service';
import { endpointPath } from '../shared/globals';
import { LoginResultMd } from '../models/loginResultMd';
import { LoginMd } from '../models/loginMd';


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private sharedService:SharedService
    ) { }

  Login(loginObj: Login):Observable<LoginResultMd>  {
    localStorage.clear(); //do usuniecia
    if (loginObj.login && loginObj.password){
      let loginMdObj = this.getLoginMdObj(loginObj);
      
      return this.http.post<LoginResultMd>(endpointPath+"/User/LoginUR",loginMdObj)
                  .pipe(tap(console.log), catchError(this.sharedService.handleError));
     }
     else
        return  throwError("Jedno z wymaganych pól jest puste!")

   }

  getLoginMdObj(obj: Login):LoginMd {
    let loginObj: LoginMd = {
      hashedPassword: obj.password,
      login:obj.login
    }
    return loginObj;
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

  SaveJwtToken(res: LoginResultMd): void {
      localStorage.setItem("token",res.accessToken.value)
      let decodate = JSON.parse(window.atob(res.accessToken.value.split('.')[1]))
      localStorage.setItem("clientId",res.clientId.toString());
      // localStorage.setItem("userName", decodate['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
      localStorage.setItem("userId", decodate['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
      localStorage.setItem("tokenExp", decodate['exp']);
      console.log(decodate);

      if(this.isLoggedIn())
          this.router.navigate(["/dashboard/mainpage"]);
  }

}
