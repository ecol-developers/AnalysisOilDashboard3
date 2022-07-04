import { Component,Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService} from 'primeng/dynamicdialog';
import {  Observable } from 'rxjs';

@Component({
  selector: 'app-universal-table',
  templateUrl: './universal-table.component.html',
  styleUrls: ['./universal-table.component.css'],
  providers: [DialogService, MessageService]
})
export class UniversalTableComponent implements OnChanges {
 dataLoading: boolean;
 dataSource: any;
 cols: any[] | undefined;

 @Input() outsideData: Observable<any[]>;
 @Input() outsideCols: any[];

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
   this.populateSourceDataByOutsideData();
  }

  populateSourceDataByOutsideData() {
    this.dataLoading = true;
    this.outsideData.subscribe({
      next: (res: any) => {
        this.dataSource = res;
      },
      complete: () => {
        this.cols = this.outsideCols;
        this.dataLoading = false;
      }
    });
  }



}
