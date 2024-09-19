import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brand.service';
import { ActivatedRoute } from '@angular/router';
import { Icategory } from '../../core/interfaces/icategories';
import { iBrand } from '../../core/interfaces/ibrand';

@Component({
  selector: 'app-details-brand',
  standalone: true,
  imports: [],
  templateUrl: './details-brand.component.html',
  styleUrl: './details-brand.component.scss'
})
export class DetailsBrandComponent implements OnInit {
  private readonly _ActivatedRoute =inject(ActivatedRoute)
  private readonly _BrandService =inject(BrandService)
  detalisBrand:iBrand |null=null
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
      let idBrand = p.get('id')
      this._BrandService.getSpecificBrand(idBrand).subscribe({
        next:(res)=>{
          console.log(res.data)
          this.detalisBrand=res.data
        },error:(err)=>{
          console.log(err)
        }
      })
    }
  })
}
}
