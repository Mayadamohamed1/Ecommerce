import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { product } from '../../core/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly _ActivatedRoute =inject(ActivatedRoute)
  private readonly _ProductsService =inject(ProductsService)
  private readonly _CartService =inject(CartService)
  private readonly _ToastrService =inject(ToastrService)
  detailsProudct:product | null=null;
  customOptionsDet: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplayTimeout:2000,
    autoplay:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
  addCart(id:string):void{
    this._CartService.addProdToCart(id).subscribe({
      next:(res)=>{
    console.log(res)
    this._ToastrService.success(res.message , 'FreshCart')
      },
      error:(err)=>{
    console.log(err)
      }
    })
       }
  ngOnInit(): void {
this._ActivatedRoute.paramMap.subscribe({
  next:(p)=>{
   let idProduct=p.get('id')//id =>app.routers
   //logic api
   this._ProductsService.getSpecificProduct(idProduct).subscribe({
    next:(res)=>{
console.log(res.data)
this.detailsProudct=res.data
    },
    error:(err)=>{
      console.log(err)
    }
   })
  }
})
  }

}
