import { Component, OnInit, SimpleChange } from '@angular/core';
import { SimpleTable } from 'src/app/metadata/simpleTable';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  public summaryData:SimpleTable;

  startAnimationForBarChart(chart: any) {
    let seq2: any, delays2: any, durations2: any;
    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function(data: any) {
      if (data.type === 'bar') {
          seq2++;
          data.element.animate({
            opacity: {
              begin: seq2 * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: 'ease'
            }
          });
      }
    });

    seq2 = 0;
}

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

  constructor() { }

  ngOnInit(): void {
    // this.summaryData = {
    //   headerRow: ['Description', 'Summary'],
    //   dataRow:[
    //     ['Ilośc wszystkich urządzeń','524'],
    //     ['Ilość wszystkich raportów', '1544'],
    //     ['Ilość nieprzeczytanych raportów', '54'],
    //     ['Ilość nieprzeczytanych raportów w statusie \'UWAGA\'', '44'],
    //   ]
    // }

    const samplesCountByMonthChartData = {
      labels: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
      ]
    };

    const samplesCountByMonthChart = new Chartist.Bar('#samplesCountByMonthChart', samplesCountByMonthChartData);
    this.startAnimationForBarChart(samplesCountByMonthChart);


//success
    const samplesSuccessCountByMonthChartData = {
      labels: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
      ]
    };

    const samplesSuccessCountByMonthChart = new Chartist.Line('#samplesSuccessCountByMonthChart', samplesSuccessCountByMonthChartData);
    this.startAnimationForLineChart(samplesSuccessCountByMonthChart);

    //warning
    const samplesWarningCountByMonthChartData = {
      labels: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 350, 300, 100]
      ]
    };

    const samplesWarningCountByMonthChart = new Chartist.Line('#samplesWarningCountByMonthChart', samplesWarningCountByMonthChartData);
    this.startAnimationForLineChart(samplesWarningCountByMonthChart);


  }

}
