import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { MytranslateService } from '../../core/services/mytranslate.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
private readonly _CartService = inject(CartService)
private readonly _ToastrService = inject(ToastrService)
readonly _MytranslateService =inject(MytranslateService)
readonly _TranslateService =inject(TranslateService)
cartDetalis:Icart={} as Icart
ngOnInit(): void {
this._CartService.getProdCart().subscribe({
  next:(res)=>{
    console.log(res.data)//obj {totalPrice, products:[{}]}
    this.cartDetalis=res.data
  },
  error:(err)=>{
    console.log(err)

  }
})
}
removeItem(id:string):void{
this._CartService.deleteSpecifProdCart(id).subscribe({
next:(res)=>{
console.log(res)
this.cartDetalis=res.data
this._CartService.cartNumber.next(res.numOfCartItems)
this._ToastrService.success(res.status)
},
error:(err)=>{
  console.log(err)
}
})
}
updataCount(id:string ,count:number):void{
this._CartService.updataProductQuantity(id,count).subscribe({
  next:(res)=>{
    console.log(res)
    this.cartDetalis=res.data
    this._ToastrService.success(res.status)
  },
  error:(err)=>{
    console.log(err)
  }
})
}
clearItem(){
  this._CartService.clearCart().subscribe({
    next:(res)=>{
      console.log(res)
     if(res.message == 'success'){
      this.cartDetalis={} as Icart
      this._CartService.cartNumber.next(0)
      this._ToastrService.success(res.message)
     }
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
}
