import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  private readonly _AuthService= inject(AuthService)
  private readonly _Router= inject(Router)
  isLoading:boolean=false
  step:number=1
  verifyEmail:FormGroup=new FormGroup({
    email : new FormControl(null,[Validators.required,Validators.email])
  })

  verifyCode:FormGroup=new FormGroup({
    resetCode : new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)])
  })

  resetPassword:FormGroup=new FormGroup({
    email : new FormControl(null,[Validators.required,Validators.email]),
   newPassword : new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)])
  })


  step1():void{
    //submit--->get value--email form1 ---->set in form3 inside email
    let EmailValue =this.verifyEmail.get('email')?.value
    this.resetPassword.get('email')?.patchValue(EmailValue)
    this.isLoading=true
this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
  next:(res)=>{
    console.log(res)
    if(res.statusMsg === 'success')
     {
      this.step=2;
     }
     this.isLoading=false
  },
  error:(err)=>{
console.log(err)
  }
})
  }

  step2():void{
    this.isLoading=true
    this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status === 'Success'){this.step=3;}
        this.isLoading=false

      },
      error:(err)=>{
    console.log(err)
      }
    })
      }

      step3():void{
        this.isLoading=true
        this._AuthService.setResetPass(this.resetPassword.value).subscribe({
          next:(res)=>{
            console.log(res)
localStorage.setItem('uToken',res.token)
this.isLoading=false
this._AuthService.saveUserData()
this._Router.navigate(['/home'])
          },
          error:(err)=>{
        console.log(err)
          }
        })
          }
}
