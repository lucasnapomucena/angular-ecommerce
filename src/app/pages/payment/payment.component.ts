import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Product } from '../../core/models/product.model';
import { GetItems } from '../../store/actions';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  displayedColumns: string[] = ['image', 'title', 'price'];
  storeSubscription: Subscription;

  constructor(private store: Store<any>, private router: Router) {
    this.storeSubscription = store.pipe(select('shop')).subscribe((state) => {
      if (state.cart.length <= 0) {
        this.router.navigate(['cart']);
        return;
      }
      this.products = state.cart;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
