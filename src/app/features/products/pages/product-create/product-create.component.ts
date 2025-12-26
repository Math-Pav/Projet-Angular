import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ProductCreateComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      brand: [''],
      category: ['']
    });
  }

  save(): void {
    if (!this.form.valid) return;
    const newProduct: Product = this.form.value;
    this.productService.addProduct(newProduct).subscribe(() => this.router.navigate(['/products']));
  }
}
