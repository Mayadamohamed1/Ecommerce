import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const  _NgxSpinnerService= inject(NgxSpinnerService)
  _NgxSpinnerService.show('loading-4')
  //logic req show
  // لو متنوع هعمل if if(req.url.includes('cart'))
  return next(req).pipe(finalize(()=>{
    //logic res  end
    _NgxSpinnerService.hide('loading-4')
  }));//res hide
};
