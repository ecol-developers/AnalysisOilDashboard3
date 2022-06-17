import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { endpointPath } from '../shared/globals';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {
  public tree:TreeNode[];

  constructor(private http:HttpClient) { }

  GetEquipmentTree():Observable<TreeNode<any>[]>{
    let clientId = localStorage.getItem("clientId");
    let endpoint = endpointPath+"/Equipment/GetTreeEquipmentByClientId/"+clientId;
    return this.http.get<TreeNode<any>[]>(endpoint);
  }


}
