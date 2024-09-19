import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../environments/envirenments';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _HttpClient:HttpClient) { }
  myHeader:any={Token:localStorage.getItem('uToken')}
  checkOut(idCart:string |null,shipDetails:object):Observable<any>{
    return this._HttpClient.post(`${environments.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=${environments.url}`,{
      "shippingAddress":shipDetails
    },
    {
      headers:this.myHeader
    }
  )
  }
  getUserOrder(iduser:string):Observable<any>{
  return  this._HttpClient.get(`${environments.baseUrl}/api/v1/orders/user/${iduser}`)
  }
}
