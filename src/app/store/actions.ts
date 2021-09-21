import { Action } from '@ngrx/store';
import { Product } from '../core/models/product.model';

export enum ActionTypes {
  Add = '[Product] Add to cart',
  Remove = '[Product] Remove from cart',
  AddWishlist = '[Product] Add to wishlist',
  LoadItemsWishlist = '[Product] Load items wishlist',
  LoadItems = '[Product] Load items from server',
  LoadSuccess = '[Product] Load success'
}

export class AddToCart implements Action {
  readonly type = ActionTypes.Add;
  constructor(public payload:Product) {}
}

export class RemoveFromCart implements Action {
  readonly type = ActionTypes.Remove;
  constructor(public payload:Product) {}
}

export class AddToWishlist implements Action {
  readonly type = ActionTypes.AddWishlist;
  constructor(public payload: Product) {}
}
export class GetItemsWishlist implements Action {
  readonly type = ActionTypes.LoadItemsWishlist
}

export class GetItems implements Action {
  readonly type = ActionTypes.LoadItems;
}

export class LoadItems implements Action {
  readonly type = ActionTypes.LoadSuccess;
  constructor(public payload: Product[]) {}
}

export type Actions = AddToCart | RemoveFromCart | AddToWishlist | GetItems | LoadItems;
