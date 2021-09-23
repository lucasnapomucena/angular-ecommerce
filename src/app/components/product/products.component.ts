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

  addToCart(payload: Product) {
    this.store.dispatch(AddToCart({ payload }));
    this.inCart = true;
  }

  removeFromCart(payload: Product) {
    this.store.dispatch(RemoveFromCart({ payload }));
    this.inCart = false;
  }

  addToWishlist(payload: Product) {
    this.store.dispatch(AddToWishlist({ payload }));
    this.wishlist = !this.wishlist;
  }

  removeToWishlist(payload: Product) {
    this.store.dispatch(RemoveFromWishlist({ payload }));
    this.wishlist = false;
  }

  ngOnInit(): void {
    this.inCart = false;
  }
}
