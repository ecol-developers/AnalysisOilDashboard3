import { Component, OnInit } from '@angular/core';
import { AdminMenu, Menu, UserMenu } from 'src/app/metadata/menu';
import { RouteInfo } from 'src/app/metadata/RouteInfo';
import { AuthService } from 'src/app/services/auth.service';

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public menuItems:RouteInfo[];
  public userMenuItems:RouteInfo[];
  userName:string;
  userId:string;
  userRole:string;
  clientId:string;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.menuItems = Menu;
    this.userName = localStorage.getItem("userName");
    this.userId = localStorage.getItem("userId");
    this.userRole = localStorage.getItem("userRole");
    this.clientId = localStorage.getItem("clientId");

    if( this.userRole === "Admin"){
      this.menuItems = this.menuItems.concat(AdminMenu);
    }

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
