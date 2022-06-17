import { Component, OnInit, SimpleChange } from '@angular/core';
import * as Chartist from 'chartist';
import { MainpageService } from 'src/app/services/mainpage.service';
import { DataChart } from 'src/app/metadata/dataChart';
import { MainPageSummaryClient } from 'src/app/models/mainPageSummaryClient';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {


  private samplesCountByLastYearData :DataChart;
  private samplesCountPositiveLastYearData :DataChart;
  private samplesCountNegativeLastYearData :DataChart;
  public mainPageSummaryClient:MainPageSummaryClient = {};


//   startAnimationForBarChart(chart: any) {
//     let seq2: any, delays2: any, durations2: any;
//     seq2 = 0;
//     delays2 = 80;
//     durations2 = 500;
//     chart.on('draw', function(data: any) {
//       if (data.type === 'bar') {
//           seq2++;
//           data.element.animate({
//             opacity: {
//               begin: seq2 * delays2,
//               dur: durations2,
//               from: 0,
//               to: 1,
//               easing: 'ease'
//             }
//           });
//       }
//     });

//     seq2 = 0;
// }

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

  constructor(
    private service:MainpageService
  ) { }

  ngOnInit(): void {
    var clientId = Number.parseInt(localStorage.getItem("clientId"));

    this.samplesCountByLastYearData = this.service.GetSampleCountByLastYear(clientId);
    const samplesCountByMonthChart = new Chartist.Line('#samplesCountByMonthChart',this.samplesCountByLastYearData);
    this.startAnimationForLineChart(samplesCountByMonthChart);

    this.samplesCountPositiveLastYearData = this.service.GetSampleCountPositiveNoteLastYear(clientId);
    const samplesSuccessCountByMonthChart = new Chartist.Line('#samplesSuccessCountByMonthChart', this.samplesCountPositiveLastYearData);
    this.startAnimationForLineChart(samplesSuccessCountByMonthChart);

    this.samplesCountNegativeLastYearData = this.service.GetSampleCountNegativeNoteLastYear(clientId);
    const samplesWarningCountByMonthChart = new Chartist.Line('#samplesWarningCountByMonthChart', this.samplesCountNegativeLastYearData);
    this.startAnimationForLineChart(samplesWarningCountByMonthChart);

    this.mainPageSummaryClient = this.service.GetSummaryInfoAboutByClient(clientId);
  }

}
