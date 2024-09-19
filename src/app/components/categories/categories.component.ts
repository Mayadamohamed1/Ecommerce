import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icategory } from '../../core/interfaces/icategories';
import { CategoriesService } from '../../core/services/categories.service';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit ,OnDestroy {
  private readonly _CategoriesService =inject(CategoriesService)
  allCategorise:Icategory[]=[];
  getAllCate !:Subscription;

  getcategorise(){
   this.getAllCate= this._CategoriesService.getAllCategoies().subscribe({
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

  ngOnInit(): void {
    //logic
     this.getcategorise()
   }
   ngOnDestroy(): void {
     //unsubscrip
     this.getAllCate?.unsubscribe()

   }
}
