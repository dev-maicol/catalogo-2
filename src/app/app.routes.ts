import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsSearchedComponent } from './products-searched/products-searched.component';

export const routes: Routes = [
  {
    path: '', component: ProductListComponent
  },
  {
    path: 'products', redirectTo: ''
  },
  {
    path: 'products/add', component: ProductCreateComponent
  },
  {
    path: 'products/search/:search', component: ProductsSearchedComponent
  },
  {
    path: 'products/:id', component: ProductDetailsComponent
  },
  
];
