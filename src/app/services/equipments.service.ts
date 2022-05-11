import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { EquipmentTree } from '../models/equipmentTree';
import { endpointPath } from '../shared/globals';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

  constructor(private http:HttpClient) { }

  refreshTreeEquipment():Observable<EquipmentTree>{
    let clientId = localStorage.getItem("clientId");
    if(clientId !== ""){
        let endpoint = endpointPath+"/Equipment/GetTreeEquipmentByClientId/"+clientId;
        let res = this.http.get<EquipmentTree>(endpoint);
        return res;
    }
  
  }

}
