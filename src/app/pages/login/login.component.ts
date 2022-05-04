import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 loginObj:Login = {};
 

  constructor( private service:AuthService) {

   }

   login(){
    this.service.Login(this.loginObj);
   }

}
