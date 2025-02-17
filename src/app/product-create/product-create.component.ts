import { Component, inject } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

import {MatSnackBar} from '@angular/material/snack-bar';




@Component({
  selector: 'app-product-create',
  imports: [MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {
  productForm: FormGroup
  // id: number
  // title: string
  // price: number
  // description: string
  // category: string
  // image: string
  // rating: {
  //   rate: number
  //   count: number
  // }

  constructor(private router: Router, private productService: ProductsService){
    const id = this.nextID()
    this.productForm = new FormGroup({
      id: new FormControl(id, [Validators.required]),
      title: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      category: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      rating: new FormGroup({
        rate: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
        count: new FormControl('', [Validators.required, Validators.min(0)])
      })
    })
    // Deshabilitar el campo ID
    // this.productForm.get('id')?.disable();
  }

  nextID(): Number{
    const storedProducts = localStorage.getItem('products')
    if(storedProducts){
      const products = JSON.parse(storedProducts)
      return products[products.length - 1].id + 1
    }
    return 1
  }

  onSubmit(){
    if(this.productForm.valid){
      this.productService.saveProduct(this.productForm.value)
      this.router.navigate(['/products'])
      // window.alert('Producto creado correctamente')
      this.openSnackBar('Product created', 'Close')
    }
  }

  backToPage(){
    this.router.navigate(['/'])
  }

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  
}
