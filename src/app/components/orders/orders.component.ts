import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
private readonly _ActivatedRoute= inject(ActivatedRoute)
private readonly _OrderService= inject(OrderService)
isLoading:boolean=false;
orders: FormGroup=new FormGroup({
  details:new FormControl(null,[Validators.required]),
  phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  city:new FormControl(null,[Validators.required])
})
cartId:string | null= ""
ngOnInit(): void {
this._ActivatedRoute.paramMap.subscribe({
  next:(params)=>{
   this.cartId= params.get('id')
   console.log(this.cartId)
  }
})
}
orderSubmit():void{
  console.log(this.orders.value) //{} ,--->id
  this._OrderService.checkOut(this.cartId , this.orders.value).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.status === 'success'){
        res.session.url; //url strip "https://checkout.stripe.com/c/pay/cs_test_a1jQeymu13sBXg5qoN2TSv0mnw1Ag41RtAz2dk93U7fXvK8lGR8LPFpLOO#fidkdWxOYHwnPyd1blpxYHZxWjA0SHViYl1ANVYyU2pOX2hVVW9ASmZBUElpa2FLVnBUQGo2UFduUEhIXHx9aEhjanBGZ1NxZ3RKNVVtXWxcSTJ8Qzx2aWZkUEBpMXJCXVRHTkIxZzBSZmhENTUxYHVKMUpQVycpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl"
        window.open(res.session.url , '_self')
      }
    },
    error:(err)=>{
      console.log(err)
    }
  })

}
}
