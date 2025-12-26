import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product, ProductsResponse } from '../../../core/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'https://dummyjson.com/products';

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) { }

  /** Charger tous les produits */
  loadProducts(): void {
    this.http.get<ProductsResponse>(this.baseUrl).subscribe(res => {
      this.productsSubject.next(res.products);
    });
  }

  /** Récupérer un produit */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  /** Ajouter */
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/add`, product).pipe(
      tap(newProduct => {
        const products = this.productsSubject.value;
        this.productsSubject.next([newProduct, ...products]);
      })
    );
  }

  /** Modifier */
  updateProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/${product.id}`, product).pipe(
      tap(updated => {
        const products = this.productsSubject.value.map(p =>
          p.id === updated.id ? updated : p
        );
        this.productsSubject.next(products);
      })
    );
  }

  /** Supprimer */
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        const products = this.productsSubject.value.filter(p => p.id !== id);
        this.productsSubject.next(products);
      })
    );
  }
}
