import { Component, inject, input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  private readonly _productService: ProductService = inject(ProductService);

  id = input.required<string>();

  resource = this._productService.getProductById(this.id);
}
