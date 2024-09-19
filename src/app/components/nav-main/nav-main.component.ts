import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterLinkActive,RouterLink,TranslateModule],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.scss'
})
export class NavMainComponent implements OnInit {
 readonly _AuthService =inject(AuthService)
 readonly _MytranslateService =inject(MytranslateService)
private readonly _CartService =inject(CartService)
private readonly _WishlistService =inject(WishlistService)
 readonly _TranslateService =inject(TranslateService)
 wishCount: number = 0;
 countNumber:number=0;
 isDarkMode: boolean = false;
 toggleDarkMode(): void {
  this.isDarkMode = !this.isDarkMode;
  this.updateDarkMode();
  localStorage.setItem('darkMode', this.isDarkMode.toString());
}

updateDarkMode(): void {
  if (this.isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}
change(lang:string):void{
this._MytranslateService.changLang(lang)
}
ngOnInit(): void {
  const storedMode = localStorage.getItem('darkMode');
  this.isDarkMode = storedMode === 'true';
  this.updateDarkMode();


  this._CartService.getProdCart().subscribe({
    next:(res)=>{
      console.log('cart items' ,res)
      this._CartService.cartNumber.next(res.numOfCartItems)
      this._WishlistService.updateWishCount(res.count)

      this._WishlistService.wishCount$.subscribe((count) => {
        this.wishCount = count;
      });

    }
  })
this._CartService.cartNumber.subscribe({
  next:(data)=>{
  this.countNumber=data
  }
})
}
}
