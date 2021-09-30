import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() wishlist: boolean;
  @Input() layout: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  onChangeList(status: boolean) {
    this.layout = status ? true : false;
  }
}
