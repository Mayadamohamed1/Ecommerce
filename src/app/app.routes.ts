import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent:()=>import('./layouts/auth-layout/auth-layout.component').then((m)=>m.AuthLayoutComponent),
    canActivate: [logedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(m => m.RegisterComponent),
      },
      {
        path: 'forgot',
        loadComponent: () =>
          import('./components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/products/products.component').then(m => m.ProductsComponent),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then(m => m.CartComponent),
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./components/brands/brands.component').then(m => m.BrandsComponent),
      },
      {
        path: 'detailsBrands/:id',
        loadComponent: () =>
          import('./components/details-brand/details-brand.component').then(m => m.DetailsBrandComponent),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then(m => m.CategoriesComponent),
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./components/details/details.component').then(m => m.DetailsComponent),
      },
      {
        path: 'detailsCategories/:id',
        loadComponent: () =>
          import('./components/details-cate/details-cate.component').then(m => m.DetailsCateComponent),
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./components/all-order/all-order.component').then(m => m.AllOrderComponent),
      },
      {
        path: 'orders/:id',
        loadComponent: () =>
          import('./components/orders/orders.component').then(m => m.OrdersComponent),
      },
      {
        path: 'wishList',
        loadComponent: () =>
          import('./components/wish-list/wish-list.component').then(m => m.WishListComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent:()=>import('./components/not-found/not-found.component').then((m)=>m.NotFoundComponent),
  },
];
