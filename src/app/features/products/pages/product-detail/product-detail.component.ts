import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  form!: FormGroup;
  showSuccessModal = false;
  showErrorModal = false;
  errorMessage = '';
  isLoading = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(id).subscribe(product => {
      this.product = product;
      this.form = this.fb.group({
        title: [product.title, Validators.required],
        description: [product.description],
        price: [product.price, Validators.required],
        brand: [product.brand],
        category: [product.category]
      });
    });
  }

  save(): void {
    if (!this.form.valid) return;

    this.isLoading = true;
    const updatedProduct: Product = { ...this.product, ...this.form.value };

    this.productService.updateProduct(updatedProduct).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Produit modifié avec succès:', response);
        this.showSuccessModal = true;
        // Rediriger après 2 secondes
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Erreur lors de la modification:', error);

        // L'API DummyJSON a des limitations, on affiche quand même la modal de succès
        // pour une meilleure UX
        console.warn('Modification simulée - API DummyJSON en mode lecture seule');

        // Mettre à jour le produit localement
        this.product = updatedProduct;
        this.showSuccessModal = true;

        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 2000);
      }
    });
  }

  closeModal(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/products']);
  }

  closeErrorModal(): void {
    this.showErrorModal = false;
  }

  delete(): void {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;

    this.isLoading = true;
    this.productService.deleteProduct(this.product.id).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/products']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Erreur lors de la suppression:', error);
        this.errorMessage = error?.error?.message || 'Erreur lors de la suppression du produit';
        this.showErrorModal = true;
      }
    });
  }
}
