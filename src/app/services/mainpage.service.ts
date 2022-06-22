import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { DataChart } from '../metadata/dataChart';
import { MainPageChart } from '../models/mainPageChart';
import { MainPageSamplePercentInfo } from '../models/mainPageSamplePercentInfo';
import { MainPageSummaryClient } from '../models/mainPageSummaryClient';
import { MainPageSummarySampleStatusInfo } from '../models/mainPageSummarySampleStatusInfo';
import { endpointPath } from '../shared/globals';

@Injectable({
  providedIn: 'root'
})
export class MainpageService {

  public sampleCountByLastYearData:DataChart;
  public sampleCountPositiveLastYearData:DataChart;
  public sampleCountNegativeLastYearData:DataChart;

  constructor(private http:HttpClient ) { }

GetSampleCountByLastYear(clientId:number):Observable<MainPageChart[]>{
  let endpoint = endpointPath+"/MainPage/GetSampleCountByLastYear/"+clientId;
  return this.http.get<MainPageChart[]>(endpoint);
}

 GetSampleCountPositiveNoteLastYear(clientId:number):Observable<MainPageChart[]>{
  let endpoint = endpointPath+"/MainPage/GetSampleCountPositiveNoteLastYear/"+clientId;
  return this.http.get<MainPageChart[]>(endpoint);
}

GetSampleCountNegativeNoteLastYear(clientId:number):Observable<MainPageChart[]>{   
  let endpoint = endpointPath+"/MainPage/GetSampleCountNegativeNoteLastYear/"+clientId;
  return this.http.get<MainPageChart[]>(endpoint);
}

GetSummaryInfoAboutByClient(clientId: number): Observable<MainPageSummaryClient> {
  let endpoint = endpointPath+"/MainPage/GetSummaryInfoAboutByClient/"+clientId;
  return this.http.get<MainPageSummaryClient>(endpoint);
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
