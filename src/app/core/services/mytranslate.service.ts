import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MytranslateService {
private readonly _TranslateService = inject(TranslateService)
private readonly _PLATFORM_ID = inject(PLATFORM_ID)

  constructor() {
    //logic
    //1-get lang localStorage
    if(isPlatformBrowser(this._PLATFORM_ID)){
      let savedLang= localStorage.getItem('lang');//return اللغه الل اختارها-->select('ar','en')
      //2-setDefault Lang
      this._TranslateService.setDefaultLang('en')
      //3- use lang --> local
      if(savedLang !== null){
        this._TranslateService.use(savedLang !)
      }
      //direction ==>en->ltr ==>ar->rtl
      this.changeDirection()

   }
    }

changeDirection():void{
  let savedLang= localStorage.getItem('lang');
  if(savedLang === 'en'){
    //dir ltr
    document.documentElement.dir='ltr'
  }else if(savedLang === 'ar'){
    //dir rtl
    document.documentElement.dir='rtl'

  }
}
changLang(lang:string):void{
  if(isPlatformBrowser(this._PLATFORM_ID)){
    localStorage.setItem('lang' , lang) //save lang inside localStorage(en ,ar)
    this._TranslateService.use(lang) //use lang
    this.changeDirection()
  }

}
}
