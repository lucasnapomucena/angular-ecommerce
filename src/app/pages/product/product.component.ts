import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {Product } from './../../core/models/product.model'
import { AddToCart, RemoveFromCart, AddToWishlist } from '../../store/actions';

@Component({
  selector: 'app-page-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class PageProductComponent implements OnInit, OnDestroy {

  id: number = null;
  buttonAddToCart: boolean = false;
  product: any = {};
  paramsSubscription : Subscription;
  productSubscription: Subscription;

  constructor(private route: ActivatedRoute,  private httpClient: HttpClient, private store: Store<{ items: []; cart: [] }>) {
  }

  ngOnInit() {
    if(this.route.params == null) {
      return;
    }
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];

         this.productSubscription = this.getProductDetail(this.id).subscribe(product => {
            this.product = product;
          })
        }
      );
   }

   ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.productSubscription.unsubscribe();
   }
   getProductDetail(params: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>('https://fakestoreapi.com/products/'+ params)
  }

  addToCart(item: Product) {
    this.buttonAddToCart = true;
    this.store.dispatch(new AddToCart(item));

  }

}
