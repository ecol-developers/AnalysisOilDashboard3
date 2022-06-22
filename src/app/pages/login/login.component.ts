import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Login } from 'src/app/models/login';
import { LoginResultMd } from 'src/app/models/loginResultMd';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 loginObj:Login = {};
 errorMessage:string;
 

  constructor( 
    private auth:AuthService,
    private service:LoginService,
    private translateService:TranslateService) {
   }

   login(){ 
     this.auth.Login(this.loginObj).subscribe(
       {
         next: (res:LoginResultMd) =>(
           this.service.login(res)
         ),
         error: (err:string) => (
          this.errorMessage = err
         )
       }
     );
   }

   setLanguage(language:string){
    this.translateService.use(language);
   }
}
