import { mergeMap, map, catchError } from 'rxjs/operators';
import {ActionTypes} from './actions';
import { ProductService } from '../services/product.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';

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
            payload: products,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
