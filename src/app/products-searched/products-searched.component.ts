import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { CommonModule } from '@angular/common';

import { ProductCardComponent } from '../product-card/product-card.component';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-products-searched',
  imports: [CommonModule, ProductCardComponent, MatIconModule, MatTooltipModule],
  templateUrl: './products-searched.component.html',
  styleUrl: './products-searched.component.css'
})
export class ProductsSearchedComponent {

  listProducts: Product[] = []


  constructor(private productsService: ProductsService, private router: Router, private activeroute: ActivatedRoute) {
    const search = this.activeroute.snapshot.paramMap.get('search')
    if (search) {
      this.productsService.searchProducts(search).subscribe(products => {
        this.listProducts = products
      })
      // console.log(this.listProducts)

    }
  }

  goToDetail(product: Product){
    // console.log(product)
    this.router.navigate(['/products', product.id])
  }

  removeProduct(product: Product){
    const storage = localStorage.getItem('products')
    if(storage){
      const products = JSON.parse(storage)
      const index = products.findIndex((p: Product) => p.id === product.id)
      if(index !== -1){
        products.splice(index, 1)
        localStorage.setItem('products', JSON.stringify(products))
        const storageTemp = localStorage.getItem('products')
        // asignar storageTemp a this.listProducts
        this.listProducts = JSON.parse(storageTemp || '[]')

        // this.listProducts = JSON.parse(storageTemp)
        // this.productsService.productsLocal = products
        // this.router.navigate(['/'])
      }
    }
  }
  addCar(product: Product){
    this.productsService.addCar(product)    
  }

  backToPage() {
    this.router.navigate(['/'])
  }
}
