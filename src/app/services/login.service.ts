import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResultMd } from '../models/loginResultMd';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private auth:AuthService,
    private router:Router,
    private userService:UserService) { }

  login(loginResult:LoginResultMd){
    if(loginResult.userId>0){

      this.auth.SaveJwtToken(loginResult);

      if(this.auth.isLoggedIn()){
        this.userService.GetUserDataById().subscribe({
          next:(res:User)=>{
            this.userService.SetLocalStorageUserData(res);
          },
          complete:()=> this.router.navigate(["/dashboard/mainpage"])
        } );
     }
    }

  }
}
