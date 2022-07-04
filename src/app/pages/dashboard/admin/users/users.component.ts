import { Component, DoCheck, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { UniversalDictComponent } from 'src/app/components/universal-dict/universal-dict.component';
import { UserCols } from 'src/app/metadata/cols/userCols';
import { Client } from 'src/app/models/client';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [DialogService, MessageService]
})
export class UsersComponent implements OnInit, DoCheck {
  public dataSource:Observable<any>;
  public cols:any;
  ref: DynamicDialogRef;

  constructor(
    private adminService:AdminService,
    private translateService:TranslateService,
    public dialogService: DialogService,
    private messageService: MessageService,
  ) { }

  ngDoCheck(): void {
   this.translateCols();
  }

  ngOnInit(): void {
    this.populateDataSource();
  }

  populateDataSource(){
    this.dataSource = this.adminService.GetUserList();
    this.translateCols();
  }

  translateCols(){
    UserCols.forEach(el => {
      el.header = this.translateService.instant(el.key);
    });
    this.cols = UserCols;
  }

  addClient(user: User) {

    this.ref = this.dialogService.open(UniversalDictComponent, {
      data: 'clients',
      header: 'Wybór klienta',
      width: '40%'
    });
  
    this.ref.onClose.subscribe((clientObj: Client) => {
      if (clientObj) {
        this.adminService.addClientToUser(clientObj.id, user.id).subscribe({
          complete: () => {
            this.populateDataSource();
            this.messageService.add({
              severity: 'info',
              summary: 'Klient został przypisany do użytkownika!'
            });
          }
        });
      }
    });
  }

  

}
