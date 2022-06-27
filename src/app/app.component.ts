import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent{
  constructor(
    private translateService:TranslateService
  ) { 
    translateService.addLangs(['pl','en','de']);
    let lan = localStorage.getItem("language")

    if(lan)
      translateService.use(lan);
    else 
      translateService.setDefaultLang('pl');
  }
}