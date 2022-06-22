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
    translateService.addLangs(['pl','en']);
    translateService.setDefaultLang('pl');
    translateService.use('pl');
  }
}