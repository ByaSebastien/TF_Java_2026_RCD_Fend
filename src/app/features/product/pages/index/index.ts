import { Component, computed, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './index.html',
  styleUrl: './index.scss',
})
export class Index {
  private readonly _productService: ProductService = inject(ProductService);

  resource;

  // products = computed(() => {
  //   return this.resource.value();
  // });

  page = signal(0);
  size = signal(1);

  constructor() {
    this.resource = this._productService.getProducts(this.page, this.size);
  }

  get hasPrevious() {
    if (this.resource.isLoading()) {
      return false;
    }

    return this.resource.value()!.pageNumber > 0;
  }

  get hasNext() {
    if (this.resource.isLoading()) {
      return false;
    }

    return this.resource.value()!.pageNumber < this.resource.value()!.totalPages - 1;
  }

  next() {
    if (this.resource.value() && this.page() >= this.resource.value()!.totalPages - 1) {
      return;
    }
    this.page.set(this.page() + 1);
  }

  previous() {
    if (this.page() <= 0) {
      return;
    }
    this.page.set(this.page() - 1);
  }
}
