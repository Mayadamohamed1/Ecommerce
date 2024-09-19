import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgClass,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{
  private readonly _AuthService=inject(AuthService)
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _Router=inject(Router)// navigate login
  msgError:string=''
  isLoading:boolean=false
  msgSuccess:boolean=false
// registerGroup:FormGroup=new FormGroup({
//   name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
//   email:new FormControl(null,[Validators.required,Validators.email]),
//   password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
//   rePassword:new FormControl(null),
//   phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
// },this.confirmPassword)
registerSub !:Subscription
registerGroup:FormGroup=this._FormBuilder.group({
  name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
  email:[null,[Validators.required,Validators.email]],
  password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
  rePassword:[null],
  phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]]
},{validators:this.confirmPassword})

regiterSubmit():void{
//منعته ك logic
if(this.registerGroup.valid){
  this.isLoading=true
this.registerSub =this._AuthService.setRegisterForm(this.registerGroup.value).subscribe({
  next:(res)=>{ //tmam navigate login
console.log(res)
if(res.message == 'success'){
  this.msgSuccess=true
  setTimeout(() => {
    this._Router.navigate(['/login'])
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
  //console.log(this.registerGroup.value)
}else{
  this.registerGroup.setErrors({mismatch:true})
  this.registerGroup.markAllAsTouched()
}
}
ngOnDestroy(): void {
  this.registerSub?.unsubscribe()
}
confirmPassword(g:AbstractControl){
  if(g.get('password')?.value === g.get('rePassword')?.value){
return null
  } else{
    return {mismatch:true}
  }
}
}
