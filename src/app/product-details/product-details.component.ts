import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Product } from '../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';

import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [MatCardModule, MatButtonModule, MatTooltipModule, MatIconModule, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product: Product | any

  rateProduct: number | undefined = 0

  constructor(private router: Router, private activeroute: ActivatedRoute, private productService: ProductsService) {
    const id = Number(this.activeroute.snapshot.paramMap.get('id'))
    this.productService.getProductById(id)
      .subscribe(
        product => {
          this.product = product
          if (product)
            this.rateProduct = Math.floor(product?.rating.rate) + 1
        })
  }

  backToPage() {
    this.router.navigate(['/'])
  }

  
}
