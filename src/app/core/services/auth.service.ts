import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environments } from '../environments/envirenments';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //httpclient--->app.config
  // constructor(private _HttpClient:HttpClient) { }
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);
  userData: any = null;
  //منساش ال نوع ال راجع من function دي
  setRegisterForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environments.baseUrl}/api/v1/auth/signup`,
      data
    );
  }
  setloginForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environments.baseUrl}/api/v1/auth/signin`,
      data
    );
  }
  //decode token to share data
  saveUserData(): void {
    if (localStorage.getItem('uToken') !== null) {
      //let x:any=localStorage.getItem('uToken')
      this.userData = jwtDecode(localStorage.getItem('uToken')!); //return object فيه داتا
      console.log('userData', this.userData);
    }
  }

  //logout
  logOut(): void {
    localStorage.removeItem('uToken');
    this.userData = null;
    //navigate login--->router
    //if(api in documention)=>call api  remove
    this._Router.navigate(['/login']);
  }

  setEmailVerify(data:object):Observable<any>{
return this._HttpClient.post(`${environments.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }

  setCodeVerify(data:object):Observable<any>{
    return this._HttpClient.post(`${environments.baseUrl}/api/v1/auth/verifyResetCode`,data)
      }

      setResetPass(data:object):Observable<any>{
        return this._HttpClient.put(`${environments.baseUrl}/api/v1/auth/resetPassword`,data)
          }
}
