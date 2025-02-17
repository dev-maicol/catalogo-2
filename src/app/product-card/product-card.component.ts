import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Product } from '../model/product.model';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';

import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule, MatTooltipModule, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input() product: Product | undefined
  @Output() productSelected: EventEmitter<Product> = new EventEmitter<Product>

  @Output() productDeleted: EventEmitter<Product> = new EventEmitter<Product>

  @Output() productAddCar: EventEmitter<Product> = new EventEmitter<Product>
  
  selectProduct(){
    this.productSelected.emit(this.product)
  }

  removeProduct(){
    this.productDeleted.emit(this.product)
  }

  addCar(){
    this.productAddCar.emit(this.product)
  }

}
