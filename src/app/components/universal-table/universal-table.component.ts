import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ClientCols } from 'src/app/metadata/cols/clientCols';
import { LogHistoryCols } from 'src/app/metadata/cols/logHistoryCols';
import { UserCols } from 'src/app/metadata/cols/userCols';
import { Client } from 'src/app/models/client';
import { LogHistory } from 'src/app/models/logHistory';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-universal-table',
  templateUrl: './universal-table.component.html',
  styleUrls: ['./universal-table.component.css']
})
export class UniversalTableComponent implements OnChanges {
 dataLoading:boolean;
 dataSource:any[];
 cols:any[] | undefined;

 @Input() sourceType:string;


  constructor(
    private userService:UserService,
    private adminService:AdminService
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.populateDataSource();
  }

  async populateDataSource(){
    if(this.sourceType === null)
    return;

    this.dataLoading = true;
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
        this.GetUserList(); 
          break;
      default:
        break;
    }
  }

  private GetLogHistoryByUserId() {
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
  this.adminService.GetClientList().subscribe({
  next: (res: Client[]) => this.dataSource = res,
  complete: () => {
    this.cols = ClientCols;
    this.dataLoading = false;
  }
}
);
}

}
