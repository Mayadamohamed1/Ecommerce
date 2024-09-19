import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../environments/envirenments';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private readonly _HttpClient= inject(HttpClient)
  getBrand=():Observable<any>=>{
   return this._HttpClient.get(`${environments.baseUrl}/api/v1/brands`)
  }

  getSpecificBrand=(id:string | null):Observable<any>=>{
   return this._HttpClient.get(`${environments.baseUrl}/api/v1/brands/${id}`)
  }
}
