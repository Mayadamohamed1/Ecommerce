import { Component, inject, OnDestroy } from '@angular/core';
import { product } from '../../core/interfaces/product';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SalePipe } from '../../core/pipes/sale.pipe';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgClass } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { MytranslateService } from '../../core/services/mytranslate.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,SalePipe,TermTextPipe,SearchPipe,FormsModule ,NgClass,TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy{
  private readonly _ProductsService =inject(ProductsService)
  private readonly _CategoriesService =inject(CategoriesService)
  private readonly _CartService=inject(CartService)
  private readonly _WishlistService=inject(WishlistService)
  private readonly _ToastrService=inject(ToastrService)
  private readonly _NgxSpinnerService=inject(NgxSpinnerService)
  readonly _MytranslateService =inject(MytranslateService)
  readonly _TranslateService =inject(TranslateService)


  allProducts:product[]=[];
  allCategorise:Icategory[]=[];
  isFavotite:boolean=false
  wishList: Set<string> = new Set();
  text:string= " ";
getAllProductsub !:Subscription;
customOptionsCate: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  rtl:true,
  autoplay:true,
  autoplayTimeout:2000,
  autoplayHoverPause:true,
  dots: false,
  navSpeed: 700,
  navText: ['prev', 'next'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: false
}
customOptionsMain: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  rtl:true,
  pullDrag: false,
  autoplay:true,
  autoplayTimeout:2000,
  autoplayHoverPause:true,
  dots: false,
  navSpeed: 700,
  navText: ['prev', 'next'],
items:1,
  nav: true
}
  getProducts=()=>{
    this._NgxSpinnerService.show('loading-4')
  this.getAllProductsub=this._ProductsService.getProduct().subscribe({
     next:(res)=>{this.allProducts=res.data
      this._NgxSpinnerService.hide('loading-4')
     },

     error:(error)=>{console.log(error)},
   })

  }
  getcategorise(){
    this._CategoriesService.getAllCategoies().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.allCategorise=res.data
      },
      error:(err)=>{
console.log(err)
      }
    }
  )
  }
   //add to cart
   addCart(id:string):void{
this._CartService.addProdToCart(id).subscribe({
  next:(res)=>{
console.log(res)
this._ToastrService.success(res.message , 'FreshCart')
this._CartService.cartNumber.next(res.numOfCartItems)
this._WishlistService.updateWishCount(res.count)
console.log(this._CartService.cartNumber)
  },
  error:(err)=>{
console.log(err)
  }
})
   }
   addWish(id: string): void {
    this._WishlistService.addProdToWishList(id).subscribe({
      next: (res) => {
        console.log(res);


        this.wishList.add(id);
        this._ToastrService.success(res.message, 'FreshCart');
        this._WishlistService.updateWishCount(res.count)
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error('Failed to add product to wishlist', 'Error');
      },
    });
  }


  isInWishList(productId: string): boolean {
    return this.wishList.has(productId);
  }
  ngOnInit(): void {

   //logic
   this._WishlistService.getProdWishList().subscribe({
    next: (res) => {
      this.wishList = new Set(res.data.map((item: any) => item._id)); // حفظ الـ IDs في Set
      this._WishlistService.updateWishCount(res.count); // تحديث عداد الـ Wishlist
    },
    error: (err) => console.log('Error fetching wishlist:', err)
  });
    this.getProducts();
    this.getcategorise()

  }
  ngOnDestroy(): void {
    //unsubscrip
    this.getAllProductsub?.unsubscribe()

  }


}
