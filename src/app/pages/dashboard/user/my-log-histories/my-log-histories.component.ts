import { Component, DoCheck, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LogHistoryCols } from 'src/app/metadata/cols/logHistoryCols';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-log-histories',
  templateUrl: './my-log-histories.component.html',
  styleUrls: ['./my-log-histories.component.css']
})
export class MyLogHistoriesComponent implements OnInit, DoCheck {
  public dataSource:Observable<any>;
  public cols:any;

  constructor(
    private userService:UserService,
    private translateService:TranslateService
  ) { }

  ngDoCheck(): void {
    this.translateCols();
  }



  ngOnInit(): void {
    this.populateDataSource();
  }

  populateDataSource(){
    const userId = Number.parseInt(localStorage.getItem('userId'));
    this.dataSource = this.userService.GetLogHistoryByUserId(userId);
    this.translateCols();
  }

  translateCols(){
    LogHistoryCols.forEach(el => {
      el.header = this.translateService.instant(el.key);
    });
    this.cols = LogHistoryCols;
  }

}
