import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../models/login';
import { loginJwt } from '../models/loginJwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint:string = "https://localhost:44387";

  constructor(
    private http:HttpClient,
    private router:Router) { }

  Login(loginObj: Login) {
    if (loginObj.email && loginObj.password){
      this.http.post<loginJwt>(this.endpoint+"/User/GenerateJwt",loginObj)
                .subscribe((res:loginJwt)=> {
                  if(res.jwt != null){
                    localStorage.setItem("access_token",res.jwt)
                    let decodate = JSON.parse(window.atob(res.jwt.split('.')[1]));
                    localStorage.setItem("userName",decodate['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
                    console.log("login succesfull!");
                    this.router.navigate(["/dashboard"]);
                  } else {
                    console.log("login faild!");
                  }
                });
    }
    
  }
}
