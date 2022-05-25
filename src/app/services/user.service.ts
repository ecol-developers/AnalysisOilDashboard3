import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { User } from '../models/user';
import { endpointPath } from '../shared/globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(
    private http:HttpClient
  ) { }

  GetUserDataById():Observable<User>{
    let userId = localStorage.getItem("userId");
    let endpoint = endpointPath+"/User/GetById/"+userId;
    var res = this.http.get<User>(endpoint).pipe(tap(console.log));
    return res;   
}

async GetUserDataByIdSync(){
  let userId = localStorage.getItem("userId");
  let endpoint = endpointPath+"/User/GetById/"+userId;
  return await this.http.get<User>(endpoint).pipe(tap(console.log)).toPromise();  
}
  
  SetLocalStorageUserData(res: User) {
        localStorage.setItem("userLogin", res.login);
        localStorage.setItem("userName", res.name);
        localStorage.setItem("userSurname", res.surname);
        localStorage.setItem("userEmail", res.email);
  }

  GetLocalStorageUserData():User{
    let user:User = {
      login:localStorage.getItem("userLogin"),
      name:localStorage.getItem("userName"),
      surname:localStorage.getItem("userSurname"),
      email:localStorage.getItem("userEmail"),
      id: Number.parseInt(localStorage.getItem("userId"))
    }
    return user; 

  }
}