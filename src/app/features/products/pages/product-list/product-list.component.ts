import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../../core/models/product.model';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
    this.products$ = this.productService.products$;
  }

  ngOnInit(): void {
    this.productService.loadProducts();
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => console.log('Produit supprimé'),
      error: (err) => console.error(err)
    });
  }

  editProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }
}
