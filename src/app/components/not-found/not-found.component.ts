import { Component } from '@angular/core';
import { NavMainComponent } from "../nav-main/nav-main.component";
import { FooterComponent } from "../footer/footer.component";
import { MainLayoutComponent } from "../../layouts/main-layout/main-layout.component";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [NavMainComponent, FooterComponent, MainLayoutComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
