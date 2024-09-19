import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { product } from '../../core/interfaces/product';
import { Subscription } from 'rxjs';
import { FormsModule, NgModel } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { SalePipe } from '../../core/pipes/sale.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,SalePipe,TermTextPipe,SearchPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit ,OnDestroy {
  private readonly _ProductsService =inject(ProductsService)
  private readonly _CartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)
  allProducts:product[]=[];
  text:string= " ";
  getAllProductsub !:Subscription;

  getProducts=()=>{
    this.getAllProductsub=this._ProductsService.getProduct().subscribe({
       next:(res)=>{this.allProducts=res.data},
       error:(error)=>{console.log(error)},
     })
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
          //logic
           this.getProducts();
         }
         ngOnDestroy(): void {
           //unsubscrip
           this.getAllProductsub?.unsubscribe()

         }
}
