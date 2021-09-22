import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Product } from '../../core/models/product.model';
import {
  AddToCart,
  AddToWishlist,
  RemoveFromCart,
  RemoveFromWishlist
} from '../../store/actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  constructor(private store: Store<{ items: []; cart: [] }>) {}

  inCart: boolean = false;
  @Input() product: Product;
  @Input() wishlist: boolean = false;

  addToCart(item: Product) {
    this.store.dispatch(new AddToCart(item));
    this.inCart = true;
  }

  removeFromCart(item: Product) {
    this.store.dispatch(new RemoveFromCart(item));
    this.inCart = false;
  }

  addToWishlist(item: Product) {
    this.store.dispatch(new AddToWishlist(item));
    this.wishlist = !this.wishlist;
  }

  removeToWishlist(item: Product) {
    this.store.dispatch(new RemoveFromWishlist(item));
    this.wishlist = false;
  }

  ngOnInit(): void {
    this.inCart = false;
  }
}
