import { Component, OnInit } from '@angular/core';
import { MainPageSummarySampleStatusInfo } from 'src/app/models/mainPageSummarySampleStatusInfo';
import { SummaryInfo } from 'src/app/models/summaryInfo';
import { MainpageService } from 'src/app/services/mainpage.service';

@Component({
  selector: 'app-summary-sample-table',
  templateUrl: './summary-sample-table.component.html',
  styleUrls: ['./summary-sample-table.component.css']
})
export class SummarySampleTableComponent implements OnInit {

  public summaryInfo:SummaryInfo[] = [];
  test:SummaryInfo;

  constructor(private service:MainpageService) { }

  ngOnInit(): void {
    this.service.GetSummaryInfoAboutSampleStateByClient().subscribe({
      next:(res:MainPageSummarySampleStatusInfo)=>{
        this.summaryInfo.push(  
        {
          description:"Próbki przyjęte",
          count:res.sampleInsertCount
          },
          {
            description:"Próbki w laboratorium",
            count:res.sampleInLaboratoryCount
          },
          {
            description:"Próbki w interpretacji",
            count:res.sampleInInterpretationCount
          },
          {
            description:"Próbki zatwierdzone",
            count:res.sampleConfirmedCount
          }
        )
    
      }
       
    })
  }

}
