import { Component } from '@angular/core';
import { Login } from 'src/app/models/login';
import { LoginResultMd } from 'src/app/models/loginResultMd';
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
         next: (res:LoginResultMd) =>(this.service.SaveJwtToken(res)
         ),
         error: (err:string) => (
          this.errorMessage = err
         )
       }
     );
   }

  

}
