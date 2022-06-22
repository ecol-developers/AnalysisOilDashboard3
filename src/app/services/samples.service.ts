import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, } from 'rxjs';
import { Sample } from '../models/sample';
import { SampleAttachment } from '../models/sampleAttachment';
import { endpointPath } from '../shared/globals';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class SamplesService {

  constructor(
    private http:HttpClient) { }

  GetListByClientId():Observable<Sample[]>{
    let clientId = localStorage.getItem("clientId");
    if(clientId){
      let endpoint = endpointPath+"/Sample/GetListByClientId/"+clientId;
      return this.http.get<Sample[]>(endpoint);
    }
  }
  
  GetListByEquipmentId(id:number):Observable<Sample[]>{
    let endpoint = endpointPath+"/Sample/GetListByEquipmentId/"+id;
    return this.http.get<Sample[]>(endpoint);
  }

  DownloadReport(id:number):Observable<SampleAttachment>{
    let endpoint = endpointPath+"/Sample/GetAttachmentBySample/"+id;
    return this.http.get<SampleAttachment>(endpoint);
  }
}
