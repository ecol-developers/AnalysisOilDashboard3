import { Component, OnInit } from '@angular/core';
import { MainPageSamplePercentInfo } from 'src/app/models/mainPageSamplePercentInfo';
import { MainpageService } from 'src/app/services/mainpage.service';

@Component({
  selector: 'app-summary-sample-doughnut-cahrt',
  templateUrl: './summary-sample-doughnut-cahrt.component.html',
  styleUrls: ['./summary-sample-doughnut-cahrt.component.css']
})
export class SummarySampleDoughnutCahrtComponent implements OnInit {
  options: any;
  sampleInfo:any;

  constructor(private service:MainpageService) { }

  ngOnInit(): void {

    this.service.GetSummaryInfoAboutSampleNoteByClient().subscribe({
      next:(res:MainPageSamplePercentInfo[])=>{
        this.sampleInfo = {
          labels: ["Brak oceny","UWAGA","W NORMIE", "WSKAZÓWKA"],
          datasets: [
              {
                  data: [res[0].percent, res[1].percent, res[2].percent, res[3].percent],
                  backgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56",
                      "#cccccc"
                  ],
                  hoverBackgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56",
                      "#999999"
                  ]
              }
          ]
      };
      }
    })
  
  }

}
