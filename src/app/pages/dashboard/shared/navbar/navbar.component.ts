import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Client } from 'src/app/models/client';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

const misc: any = {
  navbar_menu_visible: 0,
  active_collapse: true,
  disabled_collapse_init: 0,
};


declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private sidebarVisible: boolean;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  clientName:string;
  public clients:Client[];
  public selectedClient:number;
  public change_customer:string;
  public showClients:boolean;


  constructor( 
    private authService:AuthService,
    private transalteService:TranslateService,
    private userService:UserService
    ) { }

  ngOnInit(): void {
      this.clientName = localStorage.getItem("clientName");
      this.change_customer = this.transalteService.instant("change_customer");
      this.showClients = (localStorage.getItem('admin') === 'true'? true:false);
      this.userService.GetClients().subscribe({
        next:(res:Client[])=>this.clients = res
      })
  
      this.selectedClient = Number.parseInt(localStorage.getItem("clientId"));
  }


  minimizeSidebar(){
    const body = document.getElementsByTagName('body')[0];

    if (misc.sidebar_mini_active === true) {
        body.classList.remove('sidebar-mini');
        misc.sidebar_mini_active = false;

    } else {
        setTimeout(function() {
            body.classList.add('sidebar-mini');

            misc.sidebar_mini_active = true;
        }, 300);
    }

    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(function() {
        window.dispatchEvent(new Event('resize'));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(function() {
        clearInterval(simulateWindowResize);
    }, 1000);
  }


  sidebarOpen() {
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];
      const toggleButton = this.toggleButton;
      const body = document.getElementsByTagName('body')[0];
      setTimeout(function(){
          toggleButton.classList.add('toggled');
      }, 500);
      body.classList.add('nav-open');
      setTimeout(function() {
          $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');


      if (body.querySelectorAll('.main-panel')) {
          document.getElementsByClassName('main-panel')[0].appendChild($layer);
      }else if (body.classList.contains('off-canvas-sidebar')) {
          document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
      }

      setTimeout(function() {
          $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function() { //asign a function
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        this.sidebarVisible = false;

        $layer.classList.remove('visible');
        setTimeout(function() {
            $layer.remove();
            $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      body.classList.add('nav-open');
      this.mobile_menu_visible = 1;
      this.sidebarVisible = true;
  };
  sidebarClose() {
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];
      const body = document.getElementsByTagName('body')[0];
      this.toggleButton.classList.remove('toggled');
      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');

      this.sidebarVisible = false;
      body.classList.remove('nav-open');
      // $('html').removeClass('nav-open');
      body.classList.remove('nav-open');
      if ($layer) {
          $layer.remove();
      }

      setTimeout(function() {
          $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
  };

  sidebarToggle() {
    if (this.sidebarVisible === false) {
        this.sidebarOpen();
    } else {
        this.sidebarClose();
    }
}

public logout(){
    this.authService.Logout();
  }

  onChange(id:number, name:string){
       this.userService.SetLocalStorageClientData(id, name).then(()=>{
         window.location.reload();
       });
  }

}
