import { Component, DoCheck, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ClientCols } from 'src/app/metadata/cols/clientCols';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit,DoCheck {
  public dataSource:Observable<any>;
  public cols:any;

  constructor(
    private adminService:AdminService,
    private translateService:TranslateService
  ) { }

  ngDoCheck(): void {
    this.translateCols();
  }

  ngOnInit(): void {
    this.populateDataSource();
  }

  populateDataSource(){
    this.dataSource =   this.adminService.GetClientList();
    this.translateCols();
  }

  translateCols(){
    ClientCols.forEach(el => {
      el.header = this.translateService.instant(el.key);
    });
    this.cols = ClientCols;
  }

}
