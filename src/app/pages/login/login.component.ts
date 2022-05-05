import { Component, OnInit } from '@angular/core';
import { onErrorResumeNext } from 'rxjs';
import { Login } from 'src/app/models/login';
import { loginJwt } from 'src/app/models/loginJwt';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 loginObj:Login = {};
 errorMessage:string="";
 

  constructor( private service:AuthService) {

   }

   login(){ 
     this.service.Login(this.loginObj).subscribe(
       {
         next: (res:loginJwt) =>(this.service.SaveJwtToken(res.jwt)
         ),
         error: (err:string) => (
          this.errorMessage = err
         )
       }
     );
   }

  

}
