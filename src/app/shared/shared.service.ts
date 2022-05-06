import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  public handleError(error:HttpErrorResponse): Observable<never>{
    console.error(
      "Name: "+error.name+"\n"+
      "Message: "+error.message+" \n"+
      "Return code: "+error.status+" \n"
    );   
    return throwError("Błąd: "+ error.statusText);
   }
}
