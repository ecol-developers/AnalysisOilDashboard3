import {  Component,  DoCheck, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AdminMenu, Menu, UserMenu } from 'src/app/metadata/menu';
import { RouteInfo } from 'src/app/metadata/RouteInfo';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit, DoCheck {
  public menuItems: RouteInfo[];
  public userMenuItems: RouteInfo[];
  public user: User;
  ln: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private translateService: TranslateService
    ) { }

  ngDoCheck(): void {
      this.generateMenu();
  }


  ngOnInit(): void {
    this.generateMenu();
  }

  generateMenu() {
    this.user = this.userService.GetLocalStorageUserData();
    this.menuItems = Menu;
    if ( localStorage.getItem('admin') === 'true') {
      this.menuItems = this.menuItems.concat(AdminMenu);
    }
    this.menuItems.forEach(el => {
      el.title = this.translateService.instant(el.key);
      if (el.children) {
        el.children.forEach(ch => {
          ch.title = this.translateService.instant(ch.key);
        });
      }

    });

    this.userMenuItems = UserMenu;
    this.userMenuItems.forEach(el => {
      el.title = this.translateService.instant(el.key);
      if (el.children) {
        el.children.forEach(ch => {
          ch.title = this.translateService.instant(ch.key);
        });
      }

    });
  }


  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  public logout() {
    this.authService.Logout();
  }



}
