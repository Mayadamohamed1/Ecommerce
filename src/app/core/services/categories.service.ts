import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../environments/envirenments';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient:HttpClient) { }

  getAllCategoies():Observable<any>{
    return this._HttpClient.get(`${environments.baseUrl}/api/v1/categories`)
  }
  getSpecifCategory(id:string | null):Observable<any>{
    return this._HttpClient.get(`${environments.baseUrl}/api/v1/categories/${id}`)
  }
}
