import { Injectable, signal, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CustomPage } from '../../../shared/models/custom-page';
import { ProductIndexDto } from '../models/product-index.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  public getProducts(
    page: Signal<number> = signal(0),
    size: Signal<number> = signal(10),
  ) {
    return httpResource<CustomPage<ProductIndexDto>>(() => `${environment.apiUrl}/product?page=${page()}&size=${size()}`);
  }
}
