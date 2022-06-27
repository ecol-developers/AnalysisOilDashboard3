import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Login } from '../models/login';
import { SharedService } from '../shared/shared.service';
import { endpointPath } from '../shared/globals';
import { LoginResultMd } from '../models/loginResultMd';
import { LoginMd } from '../models/loginMd';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  GetUserLogin(): string {
    return localStorage.getItem("userLogin");
  }


  constructor(
    private http:HttpClient,
    private sharedService:SharedService
    ) { }

  Login(loginObj: Login):Observable<LoginResultMd>  {

      let loginMdObj = this.getLoginMdObj(loginObj);
      return this.http.post<LoginResultMd>(endpointPath+"/User/LoginUR",loginMdObj)
                  .pipe(catchError(this.sharedService.handleError));
   }

   refreshToken(refreshToken:string):Observable<LoginResultMd>{
    return this.http.post<LoginResultMd>(endpointPath+"/User/RefreshToken",refreshToken)
                .pipe(catchError(this.sharedService.handleError));
  }

  getLoginMdObj(obj: Login):LoginMd {
    let loginObj: LoginMd = {
      hashedPassword: obj.password,
      login:obj.login
    }
    return loginObj;
  }

  Logout(){
      let ln = localStorage.getItem("language");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.clear();
      localStorage.setItem("language",ln);
  }


  public isLoggedIn(){
      let isExpiration = this.isExpired();
      return isExpiration;
  }

  public isLoggedOut(){
      return !this.isLoggedIn();
  }

  SaveJwtToken(res: LoginResultMd) {
      localStorage.setItem("token",res.accessToken.value)
      localStorage.setItem("refreshToken",res.refreshToken.value);
      let decodate = JSON.parse(window.atob(res.accessToken.value.split('.')[1]))
      localStorage.setItem("tokenExp", decodate['exp']);
      localStorage.setItem("userId", res.userId.toString());
  }

  public isExpired():boolean{
    if(localStorage.getItem("refreshToken")){
      let exp =parseInt(localStorage.getItem("tokenExp"));
      let actualDate = (new Date().getTime()+1)/1000;
      //console.log("exp: "+exp+" actualDate:"+actualDate+" różnica: "+(exp-actualDate).toString());
      if(exp>=actualDate)
          return true;
      else
          return false;
    }
   
    return false;
  }



}
