import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sale',
  standalone: true
})
export class SalePipe implements PipeTransform {
private readonly _DomSanitizer =inject(DomSanitizer)
  transform(value: string): SafeHtml {
    return this._DomSanitizer.bypassSecurityTrustHtml(`<span class="text-danger">onSale</span> ${value}`)
  }

}
