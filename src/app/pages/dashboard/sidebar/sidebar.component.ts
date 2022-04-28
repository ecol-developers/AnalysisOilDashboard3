import { Component, OnInit } from '@angular/core';
import { MENU } from 'src/app/metadata/menu';
import { RouteInfo } from 'src/app/metadata/RouteInfo';

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public menuItems:RouteInfo[];

  constructor() { }

  isMobileMenu(){
    if($(window).width()>991){
      return false;
    }

    return true;
  }

  ngOnInit(): void {
    this.menuItems = MENU;
  }

}
