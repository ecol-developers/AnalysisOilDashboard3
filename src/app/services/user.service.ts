import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { LogHistory } from '../models/logHistory';
import { User } from '../models/user';
import { endpointPath } from '../shared/globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  GetClients():Observable<Client[]> {
    let endpoint = endpointPath+"/Client/GetList/";
    return this.http.get<Client[]>(endpoint);
  }

  constructor(
    private http:HttpClient
  ) { }

  GetUserDataById():Observable<User>{
    let userId = localStorage.getItem("userId");
    let endpoint = endpointPath+"/User/GetById/"+userId;
    var res = this.http.get<User>(endpoint);
    return res;   
}

async GetUserDataByIdSync(){
  let userId = localStorage.getItem("userId");
  let endpoint = endpointPath+"/User/GetById/"+userId;
  return await this.http.get<User>(endpoint);  
}
  
  SetLocalStorageUserData(res: User) {
        localStorage.setItem("userLogin", res.login);
        localStorage.setItem("userName", res.name);
        localStorage.setItem("userSurname", res.surname);
        localStorage.setItem("userEmail", res.email);
        localStorage.setItem("clientId", res.clientId.toString());
        localStorage.setItem("clientName", res.clientName);
  }

  async SetLocalStorageClientData(id:number, name:string){
      localStorage.setItem("clientId", id.toString());
      localStorage.setItem("clientName", name);
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

  GetLogHistoryByUserId(id:number):Observable<LogHistory[]>
  {
    let endpoint = endpointPath+"/User/GetLogHistoryByUserId/"+id;
    return this.http.get<LogHistory[]>(endpoint);
  }
}
