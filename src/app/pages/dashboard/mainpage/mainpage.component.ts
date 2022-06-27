import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { MainpageService } from 'src/app/services/mainpage.service';
import { DataChart } from 'src/app/metadata/dataChart';
import { MainPageSummaryClient } from 'src/app/models/mainPageSummaryClient';
import { MainPageChart } from 'src/app/models/mainPageChart';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit{
  private samplesCountByLastYearData :DataChart;
  private samplesCountPositiveLastYearData :DataChart;
  private samplesCountNegativeLastYearData :DataChart;
  public mainPageSummaryClient:MainPageSummaryClient = {};

  constructor(
    private service:MainpageService,
    private translateService:TranslateService
  ) { }


startAnimationForLineChart(chart: any) {
  let seq: any, delays: any, durations: any;
  seq = 0;
  delays = 80;
  durations = 500;
  chart.on('draw', function(data: any) {

    if (data.type === 'line' || data.type === 'area') {
      data.element.animate({
        d: {
          begin: 600,
          dur: 700,
          from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
          to: data.path.clone().stringify(),
          easing: Chartist.Svg.Easing.easeOutQuint
        }
      });
    } else if (data.type === 'point') {
          seq++;
          data.element.animate({
            opacity: {
              begin: seq * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'ease'
            }
          });
      }
  });

  seq = 0;
}



  ngOnInit(): void {
    var clientId = Number.parseInt(localStorage.getItem("clientId"));
    
    this.service.GetSampleCountByLastYear(clientId).subscribe(
      {
        next:(res:MainPageChart[])=>{
          this.samplesCountByLastYearData = {
            labels:res.map((obj)=>obj.title.substring(0,3)),
            series: [
              res.map((obj)=>obj.value)
            ]}
        },
        complete:()=>{
          const samplesCountByMonthChart = new Chartist.Line('#samplesCountByMonthChart',this.samplesCountByLastYearData);
          this.startAnimationForLineChart(samplesCountByMonthChart);
        }
    });           
      
    this.service.GetSampleCountPositiveNoteLastYear(clientId).subscribe(
      {
        next:(res:MainPageChart[])=>{
          this.samplesCountPositiveLastYearData = {
            labels:res.map((obj)=>obj.title.substring(0,3)),
            series: [
              res.map((obj)=>obj.value)
            ]}
      },
      complete:()=>{
        const samplesSuccessCountByMonthChart = new Chartist.Line('#samplesSuccessCountByMonthChart', this.samplesCountPositiveLastYearData);
        this.startAnimationForLineChart(samplesSuccessCountByMonthChart);
      }
    })

    this.service.GetSampleCountNegativeNoteLastYear(clientId).subscribe(
      {
        next:(res:MainPageChart[])=>{
          this.samplesCountNegativeLastYearData = {
            labels:res.map((obj)=>obj.title.substring(0,3)),
            series: [
              res.map((obj)=>obj.value)
            ]}
          },
          complete:()=>{
            const samplesWarningCountByMonthChart = new Chartist.Line('#samplesWarningCountByMonthChart', this.samplesCountNegativeLastYearData);
            this.startAnimationForLineChart(samplesWarningCountByMonthChart);
          }
    })

    this.service.GetSummaryInfoAboutByClient(clientId).subscribe({
      next:(res:MainPageSummaryClient)=>{
        this.mainPageSummaryClient = res;
      }
    })
  }

}
