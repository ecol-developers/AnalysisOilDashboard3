import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Login } from '../models/login';
import { SharedService } from '../shared/shared.service';
import { endpointPath } from '../shared/globals';
import { LoginResultMd } from '../models/loginResultMd';
import { LoginMd } from '../models/loginMd';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  GetUserLogin(): string {
    return localStorage.getItem('userLogin');
  }


  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private router: Router
    ) { }

  Login(loginObj: Login): Observable<LoginResultMd>  {

      const loginMdObj = this.getLoginMdObj(loginObj);
      return this.http.post<LoginResultMd>(endpointPath + '/User/LoginUR', loginMdObj)
                  .pipe(catchError(this.sharedService.handleError));
   }

   refreshToken(refreshToken: string): Observable<LoginResultMd> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'text/json'})
    };

    return this.http.post<LoginResultMd>(endpointPath + '/User/RefreshToken', '"' + refreshToken + '"', httpOptions);

  }

  getLoginMdObj(obj: Login): LoginMd {
    const loginObj: LoginMd = {
      hashedPassword: obj.password,
      login: obj.login
    };
    return loginObj;
  }

  Logout() {
      const ln = localStorage.getItem('language');
     // localStorage.removeItem('token');
     // localStorage.removeItem('refreshToken');
      localStorage.clear();
      localStorage.setItem('language', ln);
      this.router.navigate(['/']);

  }


  public isLoggedIn() {
      const isExpiration = this.isExpired();
      return isExpiration;
  }

  public isLoggedOut() {
      return !this.isLoggedIn();
  }

  async SaveJwtToken(res: LoginResultMd) {
      localStorage.setItem('token', res.accessToken.value);
      localStorage.setItem('refreshToken', res.refreshToken.value);

      const decodate = JSON.parse(window.atob(res.accessToken.value.split('.')[1]));
      localStorage.setItem('tokenExp', decodate['exp']);
      localStorage.setItem('userId', decodate['user']);
      const rights: string[] =  decodate['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      if (rights)
      {
        const admin  = rights.filter(x => x.includes('AO-Admin'));
        if (admin) {
          localStorage.setItem('admin', 'true');
        }
      }
  }

  public isExpired(): boolean {
    if (localStorage.getItem('refreshToken')) {
      const exp = parseInt(localStorage.getItem('tokenExp')) - 820;
      const actualDate = (new Date().getTime() + 1) / 1000;
      console.log('exp: ' + exp + ' actualDate:' + actualDate + ' różnica: ' + (exp - actualDate).toString());
      if (exp >= actualDate) {
          return true;
      } else {
          return false;
      }
    }

    return false;
  }



}
