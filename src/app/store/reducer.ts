import { Action, createReducer, on } from '@ngrx/store';

import {
  AddToCart,
  AddToWishlist,
  LoadItems,
  RemoveFromCart,
  RemoveFromWishlist
} from './actions';

const initialState = {
  items: [],
  cart: [],
  wishlist: []
};

const shopReducer = createReducer(
  initialState,
  on(LoadItems, (state, action) => ({
    ...state,
    items: [...action.payload]
  })),
  on(AddToCart, (state, action) => ({
    ...state,
    cart: [
      ...state.cart.filter((item) => item?.id !== action.payload?.id),
      action.payload
    ]
  })),
  on(RemoveFromCart, (state, action) => ({
    ...state,
    cart: [...state.cart.filter((item) => item?.id !== action.payload?.id)]
  })),
  on(AddToWishlist, (state, action) => ({
    ...state,
    wishlist: [...state.wishlist, action.payload]
  })),
  on(RemoveFromWishlist, (state, action) => ({
    ...state,
    wishlist: [
      ...state.wishlist.filter((item) => item?.id !== action.payload?.id)
    ]
  }))
);

export function reducer(state, action: Action) {
  return shopReducer(state, action);
}
