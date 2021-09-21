import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../core/models/product.model';
import { AddToCart, RemoveFromCart, AddToWishlist } from '../../store/actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(private store: Store<{ items: []; cart: [] }>) {}
  toggle: boolean = false;
  inCart: boolean = false;

  addToCart(item: Product) {
    this.store.dispatch(new AddToCart(item));
    this.inCart = true;
  }

  removeFromCart(item: Product) {
    this.store.dispatch(new RemoveFromCart(item));
    this.inCart = false;
  }

  addToWishlist(item:Product) {
    this.store.dispatch(new AddToWishlist(item));
    this.toggle = !this.toggle;
  }

  @Input() product: Product;

  ngOnInit(): void {
    this.inCart= false;
  }
}
