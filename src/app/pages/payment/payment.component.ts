import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { Product } from '../../core/models/product.model';
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
  shippingStatus: boolean = false;
  profileStatus: boolean = true;

  checkoutForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]),
    document: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(\d{3}\.){2}\d{3}\-\d{2}$/)
    ]),
    phone: new FormControl('', Validators.required)
  });

  constructor(
    private store: Store<any>,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
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

  onSubmit(): void {
    if (!this.checkoutForm.valid) {
      return;
    }
    this.profileStatus = false;
    this.shippingStatus = true;
  }
}
