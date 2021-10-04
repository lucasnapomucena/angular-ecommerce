import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Product } from '../../core/models/product.model';
import { RemoveFromCart } from '../../store/actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  dataSource: Product[] = [];
  displayedColumns: string[] = ['id', 'image', 'title', 'price', 'action'];
  total: number = 0;
  storeSubscription: Subscription;

  constructor(private store: Store<any>, private router: Router) {
    this.storeSubscription = store.pipe(select('shop')).subscribe((state) => {
      if (state.cart.length > 0) {
        this.dataSource = state.cart.map((cart) => ({ ...cart, action: true }));
        this.total = state.cart.reduce((acc, val) => acc + val.price, 0);
      } else {
        this.dataSource = state.cart;
      }
    });
  }

  goToHome() {
    this.router.navigate(['']);
  }
  removeFromCart(payload: Product) {
    this.store.dispatch(RemoveFromCart({ payload }));
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
