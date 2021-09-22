import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get('https://fakestoreapi.com/products');
  }
}
