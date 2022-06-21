import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { ClientCols } from 'src/app/metadata/cols/clientCols';
import { LogHistoryCols } from 'src/app/metadata/cols/logHistoryCols';
import { UserCols } from 'src/app/metadata/cols/userCols';
import { Client } from 'src/app/models/client';
import { LogHistory } from 'src/app/models/logHistory';
import { User } from 'src/app/models/user';
import { ClientsComponent } from 'src/app/pages/dashboard/admin/clients/clients.component';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import { UniversalDictComponent } from '../universal-dict/universal-dict.component';

@Component({
  selector: 'app-universal-table',
  templateUrl: './universal-table.component.html',
  styleUrls: ['./universal-table.component.css'],
  providers:[DialogService, MessageService]
})
export class UniversalTableComponent implements OnChanges {
 dataLoading:boolean;
 dataSource:any[];
 cols:any[] | undefined;
 ref:DynamicDialogRef;

 @Input() sourceType:string;

  constructor(
    public dialogService:DialogService,
    private userService:UserService,
    private adminService:AdminService,
    private messageService:MessageService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.populateDataSource();
  }

  populateDataSource(){
    if(this.sourceType === null)
    return;
    switch (this.sourceType) {
      case "UsersLogHistory":
        this.GetUsersLogHistory();
        break;
      case "LogHistoryByUserId":
        this.GetLogHistoryByUserId(); 
          break;
      case "Users":
        this.GetUserList(); 
          break;
      case "Clients":
        this.GetClientList(); 
          break;
      default:
        break;
    }
  }

  private GetLogHistoryByUserId() {
    this.dataLoading = true;
    let userId = Number.parseInt(localStorage.getItem("userId"));
    this.userService.GetLogHistoryByUserId(userId).subscribe({
      next: (res: LogHistory[]) => this.dataSource = res,
      complete: () => {
        this.cols = LogHistoryCols;
        this.dataLoading = false;
      }
    }
    );
  }

  private GetUsersLogHistory() {
    this.dataLoading = true;
      this.adminService.GetUsersLogHistory().subscribe({
      next: (res: LogHistory[]) => this.dataSource = res,
      complete: () => {
        this.cols = LogHistoryCols;
        this.dataLoading = false;
      }
    }
    );
  }

  private GetUserList() {
    this.dataLoading = true;
    this.adminService.GetUserList().subscribe({
    next: (res: User[]) => this.dataSource = res,
    complete: () => {
      this.cols = UserCols;
      this.dataLoading = false;
    }
  }
  );
}

private GetClientList() {
  this.dataLoading = true;
  this.adminService.GetClientList().subscribe({
  next: (res: Client[]) => this.dataSource = res,
  complete: () => {
    this.cols = ClientCols;
    this.dataLoading = false;
  }
}
);
}

addClient(user:User){

  this.ref = this.dialogService.open(UniversalDictComponent, {
    data:"clients",
    header:"Wybór klienta",
    width:'40%'
  })

  this.ref.onClose.subscribe((clientObj:Client)=>{
    if(clientObj){
      this.adminService.addClientToUser(clientObj.id, user.id).subscribe({
        complete:()=> {
          this.GetUserList();
          this.messageService.add({
            severity:"info",
            summary:"Klient został przypisany do użytkownika!"
          })
        }
      });
    }
  })
}
  
}
