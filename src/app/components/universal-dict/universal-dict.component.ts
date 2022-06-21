import { Component, OnChanges, OnInit, Optional, SimpleChanges } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClientCols } from 'src/app/metadata/cols/clientCols';
import { Client } from 'src/app/models/client';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-universal-dict',
  templateUrl: './universal-dict.component.html',
  styleUrls: ['./universal-dict.component.css']
})
export class UniversalDictComponent implements OnInit {
  dataLoading:boolean;
  dataSource:any[];
  cols:any[] | undefined;

  constructor(
    private adminService:AdminService,
    public ref:DynamicDialogRef,
    public config:DynamicDialogConfig
  ) { 
    
  }
  ngOnInit(): void {    
    if(this.config.data){
      
      switch (this.config.data) {
        case "clients":
          this.GetClientList(); 
            break;
        default:
          break;
      }
    }
    
  }
  
  private GetClientList() {
    this.dataLoading = true;
    this.adminService.GetClientList().subscribe({
    next: (res: Client[]) => this.dataSource = res,
    complete: () => {
      this.cols = ClientCols;
      this.dataLoading = false;
    }
  });
  }


  selectObj(obj:any){
    this.ref.close(obj);
  }

}
