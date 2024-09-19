import { Injectable } from '@angular/core';
import { environments } from '../environments/envirenments';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishCountSource = new BehaviorSubject<number>(0);
  wishCount$ = this.wishCountSource.asObservable();

  constructor(private _HttpClient: HttpClient) { }
  myHeaders:any = {token:localStorage.getItem('uToken')}
  addProdToWishList(id:string):Observable<any>{
    return this._HttpClient.post(`${environments.baseUrl}/api/v1/wishlist`,
      {
        //body
          "productId": id
      },{
        headers:this.myHeaders
      }
    )
      }
       getProdWishList():Observable<any>{
        return this._HttpClient.get(`${environments.baseUrl}/api/v1/wishlist`,{headers:this.myHeaders})
       }

       deleteSpecifWishList(id:string):Observable<any>{
        return this._HttpClient.delete(`${environments.baseUrl}/api/v1/wishlist/${id}`,{headers:this.myHeaders})
       }

       updateWishCount(newCount: number) {
         this.wishCountSource.next(newCount);
       }
}
