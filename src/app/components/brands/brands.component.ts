import { Component, inject } from '@angular/core';
import { BrandService } from '../../core/services/brand.service';
import { Subscription } from 'rxjs';
import { iBrand } from '../../core/interfaces/ibrand';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  private readonly _BrandService =inject(BrandService)
  allBrands:iBrand[]=[];
  getAllBrand !:Subscription;

  getBrands(){
   this.getAllBrand= this._BrandService.getBrand().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.allBrands=res.data
      },
      error:(err)=>{
console.log(err)
      }
    }
  )
  }

  ngOnInit(): void {
    //logic
     this.getBrands()
   }
   ngOnDestroy(): void {
     //unsubscrip
     this.getAllBrand?.unsubscribe()

   }
}
