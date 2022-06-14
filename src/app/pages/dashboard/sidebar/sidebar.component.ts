import { AfterContentInit, AfterViewChecked, AfterViewInit, ApplicationRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
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
export class SidebarComponent implements OnInit{
  public menuItems:RouteInfo[];
  public userMenuItems:RouteInfo[];
  public user:User;

  constructor(
    private authService:AuthService,
    private userService:UserService
    ) { }



  ngOnInit(): void {
    this.menuItems = Menu;
    this.user = this.userService.GetLocalStorageUserData();
    console.log("__login ngOnInit:",this.user.login,";")

    //  if( this.userRole === "Admin"){
        this.menuItems = this.menuItems.concat(AdminMenu);
    //  }

    this.userMenuItems = UserMenu;
  }


  isMobileMenu(){
    if($(window).width()>991){
      return false;
    }
    return true;
  }

  public logout(){
    this.authService.Logout();
  }

}
