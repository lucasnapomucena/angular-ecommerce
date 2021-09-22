import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { ProductService } from '../services/product.service';
import { ActionTypes } from './actions';

@Injectable()
export class ShopEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.LoadItems),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ({
            type: ActionTypes.LoadSuccess,
            payload: products
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
