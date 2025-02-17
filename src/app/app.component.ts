import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import {MatTooltipModule} from '@angular/material/tooltip';

import {MatBadgeModule} from '@angular/material/badge';
import { ProductsService } from './products.service';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatTooltipModule, MatBadgeModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  productsSearch: FormGroup

  title = 'catalogo-2';

  constructor(private router:Router, private productsService: ProductsService){
    this.productsSearch = new FormGroup({
      search: new FormControl('', [Validators.minLength(3)]),
      
    })
  }

  addProduct(){
    this.router.navigate(['/products/add'])
  }
  resetProducts(){
    localStorage.removeItem('products')
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    })

  }
  totalCar(){
    const total = this.productsService.productsCar.length
    return total
  }

  productsCar(){
    const productsCar = this.productsService.productsCar
    let productsCarText = ''
    if(productsCar.length > 0){
      productsCar.forEach((product) => {
        productsCarText += product.title.trim().split(' ')[0] + ' -> ' + product.price + '$ ' + ', '
      } )
    }
    // productsCarText.replace(/\n/g, '<br>')
    return productsCarText
  }

  onSubmit(){
    if(this.productsSearch.valid){
      // this.productsService.saveProduct(this.productForm.value)
      if(this.productsSearch.value.search.length > 0)
        this.router.navigate(['/products/search', this.productsSearch.value.search])
      else
        this.router.navigate(['/'])
    }
  }
}
