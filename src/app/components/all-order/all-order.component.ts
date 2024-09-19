import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';
import { on } from 'events';
import { jwtDecode } from 'jwt-decode';
import { Iorder } from '../../core/interfaces/iorder';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-all-order',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './all-order.component.html',
  styleUrl: './all-order.component.scss'
})
export class AllOrderComponent implements OnInit {
  idUser:any=null
  dataOrder!:Iorder[]
private _OrderService = inject(OrderService)
private _AuthService = inject(AuthService)
ngOnInit(): void {
 this.idUser=jwtDecode(localStorage.getItem('uToken') !)
 console.log(this.idUser.id)
this._OrderService.getUserOrder(this.idUser.id).subscribe({
  next:(res)=>{
    console.log(res)
    this.dataOrder=res;
  },
  error:(err)=>{
    console.log(err)
  }
})

}
}
