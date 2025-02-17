import { Injectable } from '@angular/core';
import { Product } from './model/product.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiURL = 'https://fakestoreapi.com/products'

  
  constructor(private http: HttpClient) { }

  productsLocal: Product[] = []

  productsCar: Product[] = []
  
  getProductsAPI(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiURL)
  }

  getProductById(id: number): Observable<Product | undefined>{
    return of(this.productsLocal.find(product => product.id === id))
  }

  saveProduct(product: Product): Observable<Product>{
    const storedProducts = localStorage.getItem('products')
    // agregar product a storedProducts
    if(storedProducts){
      const products = JSON.parse(storedProducts)
      products.push(product)
      localStorage.setItem('products', JSON.stringify(products))
    }
    // this.productsLocal.push(product)
    // localStorage.setItem('products', JSON.stringify(this.productsLocal))
    return of(product)
  }

  deleteProduct(id: Number): Observable<boolean>{
    const storedProducts = localStorage.getItem('products')
    if(storedProducts){
      const products = JSON.parse(storedProducts)
      const index = products.findIndex((product: Product) => product.id === id)
      if(index !== -1){
        products.splice(index, 1)
        localStorage.setItem('products', JSON.stringify(products))
        return of(true)
      }
    }
    return of(false)
  }

  addCar(product: Product): Observable<Product[]>{
    this.productsCar.push(product)
    return of(this.productsCar)
  }

  searchProducts(search: string): Observable<Product[] | []>{
    const storedProducts = localStorage.getItem('products')
    if(storedProducts){
      const products = JSON.parse(storedProducts)
      return  of(products.filter((product: Product) => product.title.toLowerCase().includes(search.toLowerCase())))
    }
    return of(this.productsLocal)
  }
  
}
