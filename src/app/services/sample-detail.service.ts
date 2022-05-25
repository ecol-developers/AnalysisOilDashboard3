import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SampleDetail } from '../models/sampleDetail';
import { endpointPath } from '../shared/globals';

@Injectable({
  providedIn: 'root'
})
export class SampleDetailService {

  constructor(
    private http:HttpClient
  ) { }

  getBySampleId(id:number):Observable<SampleDetail[]>{
      let endpoint = endpointPath+"/SampleDetail/GetBySampleId/"+id;
      return this.http.get<SampleDetail[]>(endpoint);    

  }
  

}
