import { createAction, props } from '@ngrx/store';

import { Product } from '../core/models/product.model';

export const AddToCart = createAction(
  '[Product] Add to cart',
  props<{ payload: Product }>()
);
export const RemoveFromCart = createAction(
  '[Product] Remove from cart',
  props<{ payload: Product }>()
);
export const AddToWishlist = createAction(
  '[Product] Add to wishlist',
  props<{ payload: Product }>()
);
export const RemoveFromWishlist = createAction(
  '[Product] Remove from wishlist',
  props<{ payload: Product }>()
);
export const GetItems = createAction('[Product] Load items from server');
export const GetItemsWishlist = createAction('[Product] Get items wishlist');
export const LoadItems = createAction(
  '[Product] Load success',
  props<{ payload: Product[] }>()
);
