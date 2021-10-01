import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from './../../core/models/product.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() products: Product[] = [];
  @Output() productsFilter = new EventEmitter<Product[]>();

  constructor() {}

  ngOnInit() {
    console.log(this.products);
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  onInputChange(event) {
    const filterProduct = this.products.filter(
      (item) => item.price <= event.value
    );
    this.productsFilter.emit(filterProduct);
  }
}
