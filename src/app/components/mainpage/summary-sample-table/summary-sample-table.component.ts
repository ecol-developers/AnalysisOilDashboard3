import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(
    private service:MainpageService,
    private translateService:TranslateService) { }

  ngOnInit(): void {
    this.service.GetSummaryInfoAboutSampleStateByClient().subscribe({
      next:(res:MainPageSummarySampleStatusInfo)=>{
        this.summaryInfo.push(  
        {
          description:this.translateService.instant("mainpage_page.summary_chart.sample_insert_count"),
          count:res.sampleInsertCount
          },
          {
            description:this.translateService.instant("mainpage_page.summary_chart.sample_in_laboratory_count"),
            count:res.sampleInLaboratoryCount
          },
          {
            description:this.translateService.instant("mainpage_page.summary_chart.sample_in_interpretation_count"),
            count:res.sampleInInterpretationCount
          },
          {
            description:this.translateService.instant("mainpage_page.summary_chart.sample_confirmed_count"),
            count:res.sampleConfirmedCount
          }
        )
    
      }
       
    })
  }

}
