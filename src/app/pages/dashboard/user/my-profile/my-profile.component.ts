import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  user:User;

  constructor(
    private service:UserService,
    private translateService:TranslateService
    ) { }

  ngOnInit(): void {
      this.user = this.service.GetLocalStorageUserData();
  }

}
