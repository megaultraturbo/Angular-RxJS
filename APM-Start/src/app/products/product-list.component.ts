import { Component, OnInit, OnDestroy } from '@angular/core';

import { catchError, EMPTY, Observable } from 'rxjs';
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
  
  products$ = this.productService.products$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  filteredProducts$ = this.productService.filteredProducts$;

  constructor(private productService: ProductService) { }



  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
