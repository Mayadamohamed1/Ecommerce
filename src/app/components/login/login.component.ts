import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _AuthService=inject(AuthService)
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _Router=inject(Router)// navigate login
  msgError:string=''
  isLoading:boolean=false
  msgSuccess:boolean=false
// loginGroup:FormGroup=new FormGroup({
//   email:new FormControl(null,[Validators.required,Validators.email]),
//   password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
// },this.confirmPassword)
loginGroup:FormGroup=this._FormBuilder.group({
  email:[null,[Validators.required,Validators.email]],
  password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
})

regiterSubmit():void{
//منعته ك logic
if(this.loginGroup.valid){
  this.isLoading=true
this._AuthService.setloginForm(this.loginGroup.value).subscribe({
  next:(res)=>{ //tmam navigate login
console.log(res)
if(res.message == 'success'){
  this.msgSuccess=true
  setTimeout(() => {
    //1-save token
    localStorage.setItem('uToken', res.token)
    //2-decode token
    this._AuthService.saveUserData()
    this._Router.navigate(['/home'])
  }, 2000);
}
this.isLoading=false
  },
  error:(err:HttpErrorResponse)=>{
    this.msgError=err.error.message
    console.log(err)
    this.isLoading=false
  }
})
  //console.log(this.loginGroup.value)
}else{
  this.loginGroup.setErrors({mismatch:true})
  this.loginGroup.markAllAsTouched()
}
}
}
