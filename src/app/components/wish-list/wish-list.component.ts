import { Component, inject } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { iWish } from '../../core/interfaces/iwishlist';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [RouterLink, CurrencyPipe,TermTextPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent {
  private readonly _WishlistService = inject(WishlistService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  wishDetalis:iWish[]=[]
  ngOnInit(): void {
  this._WishlistService.getProdWishList().subscribe({
    next:(res)=>{
      console.log(res.data)
      this.wishDetalis=res.data
      this._WishlistService.updateWishCount(res.count);

    },
    error:(err)=>{
      console.log(err)

    }
  })
  }
  removeItem(id: string): void {
    this._WishlistService.deleteSpecifWishList(id).subscribe({
      next: (res) => {
        console.log("Response received:", res);

        
        this.wishDetalis = this.wishDetalis.filter(item => res.data.includes(item._id));

        console.log("Updated wish list after filtering:", this.wishDetalis);
        this._ToastrService.success(res.message);
        this._WishlistService.updateWishCount(res.count)
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error("Failed to remove item", "Error");
      }
    });
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
}
