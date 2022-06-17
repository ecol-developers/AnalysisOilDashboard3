import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogHistory } from '../models/logHistory';
import { endpointPath } from '../shared/globals';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http:HttpClient
  ) { }

  GetUsersLogHistory():Observable<LogHistory[]>
  {
    let endpoint = endpointPath+"/User/GetUsersLogHistory";
    return this.http.get<LogHistory[]>(endpoint);  
  }

  GetUserList():Observable<User[]>
  {
    let endpoint = endpointPath+"/User/GetList";
    return this.http.get<User[]>(endpoint);  
  }

  GetClientList():Observable<Client[]>
  {
    let endpoint = endpointPath+"/Client/GetList";
    return this.http.get<Client[]>(endpoint);  
  }
}
