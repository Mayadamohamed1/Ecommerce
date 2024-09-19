import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { error } from 'console';
import { Icategory } from '../../core/interfaces/icategories';

@Component({
  selector: 'app-details-cate',
  standalone: true,
  imports: [],
  templateUrl: './details-cate.component.html',
  styleUrl: './details-cate.component.scss'
})
export class DetailsCateComponent implements OnInit {
  private readonly _ActivatedRoute =inject(ActivatedRoute)
  private readonly _CategoriesService =inject(CategoriesService)
  detalisCate:Icategory |null=null
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
      let idCate = p.get('id')
      this._CategoriesService.getSpecifCategory(idCate).subscribe({
        next:(res)=>{
          console.log(res.data)
          this.detalisCate=res.data
        },error:(err)=>{
          console.log(err)
        }
      })
    }
  })
}
}
