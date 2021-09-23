import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Product } from '../core/models/product.model';

import { ProductService } from '../services/product.service';
import {
  AddToCart,
  AddToWishlist,
  GetItems,
  GetItemsWishlist,
  LoadItems,
  RemoveFromCart,
  RemoveFromWishlist
} from './actions';

@Injectable()
export class ShopEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetItems),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products: Product[]) => {
            return LoadItems({ payload: products });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
