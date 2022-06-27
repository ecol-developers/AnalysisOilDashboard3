import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixedpluginComponent } from './fixedplugin.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function httpTranslateLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}


@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader:{
          provide:TranslateLoader,
          useFactory:httpTranslateLoaderFactory,
          deps:[HttpClient]
      }
  })
  ],
  declarations: [FixedpluginComponent],
  exports: [FixedpluginComponent]
})
export class FixedpluginModule { 

}
