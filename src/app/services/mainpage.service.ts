import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DataChart } from '../metadata/dataChart';
import { MainPageChart } from '../models/mainPageChart';
import { MainPageSamplePercentInfo } from '../models/mainPageSamplePercentInfo';
import { MainPageSummaryClient } from '../models/mainPageSummaryClient';
import { MainPageSummarySampleStatusInfo } from '../models/mainPageSummarySampleStatusInfo';
import { User } from '../models/user';
import { endpointPath } from '../shared/globals';

@Injectable({
  providedIn: 'root'
})
export class MainpageService {

  public sampleCountByLastYearData:DataChart;
  public sampleCountPositiveLastYearData:DataChart;
  public sampleCountNegativeLastYearData:DataChart;
  private mainPageSummaryClient:MainPageSummaryClient;
 

  constructor(private http:HttpClient ) { }

  GetSampleCountByLastYear(clientId:number):DataChart{

    let endpoint = endpointPath+"/MainPage/GetSampleCountByLastYear/"+clientId;
    this.http.get<MainPageChart[]>(endpoint)
    .subscribe(
      {
        next:(res:MainPageChart[])=>{
          this.sampleCountByLastYearData = {
            labels:res.map((obj)=>obj.title.substring(0,3)),
            series: [
              res.map((obj)=>obj.value)
            ]
        }
      }
    })
      
   return this.sampleCountByLastYearData;
 }

 GetSampleCountPositiveNoteLastYear(clientId:number):DataChart{
    
  let endpoint = endpointPath+"/MainPage/GetSampleCountPositiveNoteLastYear/"+clientId;
  this.http.get<MainPageChart[]>(endpoint)
  .subscribe(
    {
      next:(res:MainPageChart[])=>{
        this.sampleCountPositiveLastYearData = {
          labels:res.map((obj)=>obj.title.substring(0,3)),
          series: [
            res.map((obj)=>obj.value)
          ]
      }
    }
  })
    
 return this.sampleCountPositiveLastYearData;
}

GetSampleCountNegativeNoteLastYear(clientId:number):DataChart{
    
  let endpoint = endpointPath+"/MainPage/GetSampleCountNegativeNoteLastYear/"+clientId;
  this.http.get<MainPageChart[]>(endpoint)
  .subscribe(
    {
      next:(res:MainPageChart[])=>{
        this.sampleCountNegativeLastYearData = {
          labels:res.map((obj)=>obj.title.substring(0,3)),
          series: [
            res.map((obj)=>obj.value)
          ]
      }
    }
  })
    
 return this.sampleCountNegativeLastYearData;
}

GetSummaryInfoAboutByClient(clientId: number): MainPageSummaryClient {
  let endpoint = endpointPath+"/MainPage/GetSummaryInfoAboutByClient/"+clientId;
  this.http.get<MainPageSummaryClient>(endpoint)
  .pipe(tap(console.log))
            .subscribe({
              next:(res:MainPageSummaryClient)=>this.mainPageSummaryClient = res
            });

  return this.mainPageSummaryClient;
}

GetSummaryInfoAboutSampleStateByClient():Observable<MainPageSummarySampleStatusInfo>{
  let clientId = localStorage.getItem("clientId");
  let endpoint = endpointPath+"/MainPage/GetSummaryInfoAboutSampleStateByClient/"+clientId;
  return this.http.get<MainPageSummarySampleStatusInfo>(endpoint);
}

GetSummaryInfoAboutSampleNoteByClient():Observable<MainPageSamplePercentInfo[]>{
  let clientId = localStorage.getItem("clientId");
  let endpoint = endpointPath+"/MainPage/GetSummaryInfoAboutSampleNoteByClient/"+clientId;
  return this.http.get<MainPageSamplePercentInfo[]>(endpoint);
}

}
