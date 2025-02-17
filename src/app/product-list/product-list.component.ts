import { Component, ViewChild, inject } from '@angular/core';

import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../model/product.model';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, Observable, of } from 'rxjs';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, CommonModule, MatPaginatorModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  listProducts: Product[] = []

  dataSource = new MatTableDataSource<Product>([])
  @ViewChild(MatPaginator) paginator!: MatPaginator
  
  errorMessage: string = '';

  constructor(private productsService: ProductsService, private router: Router, private activeroute: ActivatedRoute){
    // const search = this.activeroute.snapshot.paramMap.get('search')
    // if(search){
    //   this.productsService.searchProducts(search).subscribe(products => {
    //     this.listProducts = products
    //   })
    //   console.log(this.listProducts);
      
    // }
  }

  ngOnInit(){
    const storedProducts = localStorage.getItem('products')

    if (storedProducts) {
      // Si hay productos en localStorage, los cargamos directamente
      this.listProducts = JSON.parse(storedProducts)
      this.productsService.productsLocal = this.listProducts
      this.dataSource.data = this.listProducts
      // this.dataSource.paginator = this.paginator
    } else {
      // Si no hay productos en localStorage, los traemos de la API
      this.productsService.getProductsAPI().pipe(
        catchError((error) => {
          console.error('Error al obtener productos:', error);
          this.errorMessage = 'No se pudo obtener los productos. Verifica tu conexión a Internet.';
          return of(); // Retorna un array vacío en caso de error
        })
      ).subscribe((products) => {
        localStorage.setItem('products', JSON.stringify(products))
        this.listProducts = products; // Asignamos los productos directamente
        this.productsService.productsLocal = products
        this.dataSource.data = this.listProducts
        // this.dataSource.paginator = this.paginator
      });
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
        this.dataSource.data = this.listProducts
        this.openSnackBar('Product deleted', 'Close')

        // this.listProducts = JSON.parse(storageTemp)
        // this.productsService.productsLocal = products
        // this.router.navigate(['/'])
      }
    }
  }

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  addCar(product: Product){
    this.productsService.addCar(product)    
  }

  // ✅ Se asigna el paginador después de la inicialización del componente
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
}
