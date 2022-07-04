import { Component, DoCheck, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LogHistoryCols } from 'src/app/metadata/cols/logHistoryCols';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-log-histories',
  templateUrl: './log-histories.component.html',
  styleUrls: ['./log-histories.component.css']
})
export class LogHistoriesComponent implements OnInit, DoCheck {
  public dataSource: Observable<any>;
  public cols: any;

  constructor(
    private adminService: AdminService,
    private translateService: TranslateService
  ) { }

  ngDoCheck(): void {
    this.translateCols();
  }

  ngOnInit(): void {
    this.populateDataSource();
  }

  populateDataSource() {
    this.dataSource = this.adminService.GetUsersLogHistory();
    this.translateCols();
  }

  translateCols(){
    LogHistoryCols.forEach(el => {
      el.header = this.translateService.instant(el.key);
    });
    this.cols = LogHistoryCols;
  }

}
