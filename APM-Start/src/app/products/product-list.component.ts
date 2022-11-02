import { Component, OnInit, OnDestroy } from '@angular/core';

import { catchError, EMPTY, filter, map, Observable } from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent{
  pageTitle = 'Product List';
  errorMessage = '';
  categories: ProductCategory[] = [];
  selecteedCategoryId = 1;
  categories$ = this.productService.categories$;
  
  products$ = this.productService.productsWithCategory$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  filteredProducts$ = this.productService.filteredProducts$;

  productsFiltered$ = this.productService.productsWithCategory$.pipe(
    map( products =>
      products.filter( product => 
        this.selecteedCategoryId ? product.categoryId === this.selecteedCategoryId : true)),
        // HAS selectedCategoryId 
        //                       ? if yes, filter by categoryId 
        //                                                                         : if no, return all products
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    }));

  constructor(private productService: ProductService) { }



  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.selecteedCategoryId = +categoryId; // + casts string to number  
  }
}
