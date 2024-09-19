import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../environments/envirenments';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _HttpClient= inject(HttpClient)
  getProduct=():Observable<any>=>{
   return this._HttpClient.get(`${environments.baseUrl}/api/v1/products`)
  }

  getSpecificProduct=(id:string | null):Observable<any>=>{
   return this._HttpClient.get(`${environments.baseUrl}/api/v1/products/${id}`)
  }
}
