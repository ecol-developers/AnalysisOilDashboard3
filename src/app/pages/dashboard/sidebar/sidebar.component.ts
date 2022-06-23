import { Component,  OnInit } from '@angular/core';
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
export class SidebarComponent implements OnInit{
  public menuItems:RouteInfo[];
  public userMenuItems:RouteInfo[];
  public user:User;

  constructor(
    private authService:AuthService,
    private userService:UserService,
    private translateService:TranslateService
    ) { }



  ngOnInit(): void {
    // this.translateService.setDefaultLang('en');
    // this.translateService.use('en');
    // let test = this.translateService.instant("title_page");
    // console.log("nazwa strony: "+test+ "jezyk "+ this.translateService.getDefaultLang());
    this.menuItems = Menu;
    // this.menuItems.forEach(el => {
    //   el.title = this.translateService.instant(el.key);
    // });

    //console.log(this.menuItems);
    this.user = this.userService.GetLocalStorageUserData();
    
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
