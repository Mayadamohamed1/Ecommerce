import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environments } from '../environments/envirenments';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private readonly _HttpClient :HttpClient) { };
  cartNumber:BehaviorSubject<number>=new BehaviorSubject(0)
  myHeaders:any = {token:localStorage.getItem('uToken')}

  addProdToCart(id:string):Observable<any>{
return this._HttpClient.post(`${environments.baseUrl}/api/v1/cart`,
  {
    //body
      "productId": id
  },{
    headers:this.myHeaders
  }
)
  }
   getProdCart():Observable<any>{
    return this._HttpClient.get(`${environments.baseUrl}/api/v1/cart`,{headers:this.myHeaders})
   }

   deleteSpecifProdCart(id:string):Observable<any>{
    return this._HttpClient.delete(`${environments.baseUrl}/api/v1/cart/${id}`,{headers:this.myHeaders})
   }
   updataProductQuantity(id:string,newCount:number):Observable<any>{
    return this._HttpClient.put(`${environments.baseUrl}/api/v1/cart/${id}`,{
      "count": newCount
    },{
      headers:this.myHeaders
    }
  )
   }

   clearCart():Observable<any>{
  return this._HttpClient.delete(`${environments.baseUrl}/api/v1/cart`,{
      headers:this.myHeaders
    })
   }
}
