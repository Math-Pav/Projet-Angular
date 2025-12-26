import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.routes').then(r => r.USERS_ROUTES)
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products-routing.module').then(m => m.PRODUCTS_ROUTES)
  },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: '**', redirectTo: 'users' } 
];
